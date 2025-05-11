
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mapSupabaseUser } from "./authUtils";
import { User } from "./types";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const mappedUser = await mapSupabaseUser(data.user);
      
      if (!mappedUser) {
        throw new Error("User data couldn't be retrieved");
      }
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${mappedUser.name || 'utilisateur'}!`,
      });
      
      return mappedUser;
    } catch (error: any) {
      console.error("Login error:", error);
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
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("Registration failed");
      }
      
      try {
        // Create a profile in the profiles_unified table
        const { error: profileError } = await (supabase
          .from('profiles_unified' as unknown as never)
          .insert({
            id: data.user.id,
            full_name: name,
            email: email,
            role: isDemoAccount ? 'demo' : 'student',
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`,
            is_demo: isDemoAccount,
            created_at: new Date().toISOString()
          } as unknown as never));
        
        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Don't throw - we'll proceed anyway as the auth user was created
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
      await supabase.auth.signOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
