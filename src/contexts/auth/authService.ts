import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mapSupabaseUser, clearUserCache } from "./authUtils";
import { User } from "./types";

export const authService = {
  login: async (email: string, password: string, rememberMe: boolean = false): Promise<User> => {
    try {
      console.log("🔑 Tentative de connexion pour:", email);
      
      // Optimize for demo accounts
      const isDemoAccount = email.includes('@schoolier.com');
      
      // Timeout for avoiding blocking
      const loginPromise = supabase.auth.signInWithPassword({ email, password });
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("La connexion prend trop de temps. Veuillez réessayer.")), 10000);
      });
      
      // Race between login and timeout
      const { data, error } = await Promise.race([loginPromise, timeoutPromise]) as any;
      
      if (error) {
        console.error("❌ Erreur d'authentification:", error);
        throw error;
      }
      
      console.log("✅ Authentification réussie, récupération des données utilisateur");
      
      // For demo accounts, optimize user mapping
      let mappedUser: User;
      
      if (isDemoAccount) {
        // Fast path for demo accounts - infer role directly from email
        const inferredRole = email.includes("instructor") ? "instructor" : 
                            email.includes("admin") ? "admin" : 
                            email.includes("business") ? "business_admin" : "student";
                            
        // Create user object directly with minimal overhead
        mappedUser = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || email.split('@')[0],
          role: inferredRole as any,
          avatar: `https://api.dicebear.com/6.x/identicon/svg?seed=${email.split('@')[0]}`
        };
        
        // Store in cache for future lookups
        userCache.set(data.user.id, mappedUser);
        console.log("⚡ Chemin rapide pour compte démo utilisé, rôle:", inferredRole);
      } else {
        // Standard path for regular accounts
        mappedUser = await mapSupabaseUser(data.user);
        
        if (!mappedUser) {
          console.error("❌ Impossible de récupérer les données utilisateur");
          throw new Error("User data couldn't be retrieved");
        }
      }
      
      console.log("👤 Données utilisateur récupérées avec le rôle:", mappedUser.role);
      
      // Skip toast for demo accounts to speed up process
      if (!isDemoAccount) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${mappedUser.name || 'utilisateur'}!`,
        });
      }
      
      return mappedUser;
    } catch (error: any) {
      console.error("❌ Erreur de connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, isDemoAccount: boolean = false): Promise<User> => {
    try {
      console.log("🔑 Tentative d'inscription pour:", email, "isDemoAccount:", isDemoAccount);
      
      // Check if user already exists - Fix for the TypeScript error by removing the filter property
      // The Supabase Admin API doesn't support filtering by email in the params
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers()
        .catch(() => ({ data: { users: [] }, error: null }));
      
      // Manually filter for the user with matching email
      const userExists = users && users.length > 0 && 
                         users.some(user => user.email === email);
      
      if (userExists) {
        console.log("👤 L'utilisateur existe déjà, pas besoin de le créer à nouveau");
        
        // For demo accounts that already exist, try to get their information
        try {
          const { data: { user } } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (user) {
            const mappedUser = await mapSupabaseUser(user);
            if (mappedUser) return mappedUser;
          }
        } catch (signInError) {
          console.error("Error signing in existing user:", signInError);
        }
        
        // If we can't get existing user info, create a fake user object
        return {
          id: "existing-user-id",
          email: email,
          name: name,
          role: isDemoAccount && email.includes("instructor") ? "instructor" : 
                isDemoAccount && email.includes("admin") ? "admin" : "student",
        } as User;
      }
      
      // For demo accounts, we use signUp with email confirmation disabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          // No email redirection for demo accounts
          ...(isDemoAccount ? {} : { emailRedirectTo: `${window.location.origin}/login` })
        }
      });
      
      if (error) {
        console.error("Registration error:", error);
        throw error;
      }
      
      if (!data.user) {
        throw new Error("Registration failed");
      }
      
      try {
        // Determine role based on email for demo accounts
        const roleMapping: Record<string, string> = {
          'student@schoolier.com': 'student',
          'instructor@schoolier.com': 'instructor',
          'admin@schoolier.com': 'admin'
        };
        
        const role = isDemoAccount ? (roleMapping[email] || 'student') : 'student';
        
        console.log(`👤 Création du profil avec le rôle: ${role}`);
        
        // Create a profile in the profiles_unified table
        const { error: profileError } = await (supabase
          .from('profiles_unified' as unknown as never)
          .insert({
            id: data.user.id,
            full_name: name,
            email: email,
            role: role,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`,
            is_demo: isDemoAccount,
            created_at: new Date().toISOString()
          } as unknown as never));
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Don't throw - we'll proceed anyway as the auth user was created
        } else {
          console.log("✅ Profil créé avec succès");
        }
      } catch (profileInsertError) {
        console.error("Error during profile insertion:", profileInsertError);
        // Continue as the auth user was created successfully
      }
      
      const mappedUser = await mapSupabaseUser(data.user);
      
      if (!mappedUser) {
        throw new Error("User data couldn't be retrieved after registration");
      }
      
      // Auto-confirm demo accounts to bypass email verification
      if (isDemoAccount) {
        console.log("Auto-confirming demo account");
        // For demo accounts, automatically sign in after creation
        if (!data.session) {
          // Direct admin confirmation of user (would normally require admin access)
          // Since we can't access admin functions, we'll try signing in directly
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (signInError) {
            console.error("Auto-signin for demo account failed:", signInError);
          }
        }
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès! Veuillez vérifier votre email pour confirmer votre compte.",
        });
      }
      
      return mappedUser;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer un compte. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cette adresse, un email de réinitialisation sera envoyé.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      console.log("🚪 Tentative de déconnexion via authService");
      
      // Utilisation directe et cohérente de la méthode standard
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erreur lors de la déconnexion:", error);
        throw error;
      }
      
      console.log("✅ Déconnexion réussie via authService");
      
      clearUserCache();
      
      // Notification de déconnexion réussie - déplacée ici car nous devons s'assurer
      // que la déconnexion a réussi avant d'afficher ce message
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      console.error("❌ Erreur de déconnexion dans authService:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
