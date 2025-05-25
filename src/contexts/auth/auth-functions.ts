
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from './authUtils';

// Authentication function for handling login
export const handleLogin = async (
  email: string,
  password: string,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  setIsLoggingIn: Function,
  callback?: () => void
) => {
  try {
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Login failed:", error.message);
      toast({
        title: "Échec de connexion",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data.user) {
      const errorMsg = "Aucune donnée d'utilisateur reçue après connexion";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Get user profile using the correct function
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil utilisateur après connexion";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Update auth state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Show success message
    toast({
      title: "Connexion réussie",
      description: `Bienvenue, ${user.name || user.email}!`,
    });

    // Execute callback if provided
    if (callback) callback();
    
    return user;
  } catch (error) {
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};

// Demo account login handler
export const handleLoginWithDemo = async (
  account: any,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  setIsLoggingIn: Function,
  callback?: () => void
) => {
  try {
    console.log("🎭 Tentative de connexion avec le compte démo:", account.email);
    
    // Sign in with demo account credentials 
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: account.email, 
      password: account.password 
    });
    
    if (error) {
      console.error("❌ Demo login failed:", error.message);
      toast({
        title: "Échec de connexion démo",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    if (!data.user) {
      const errorMsg = "Aucune donnée d'utilisateur reçue pour le compte démo";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion démo",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }
    
    // Force indicate this is a demo account in metadata if possible
    try {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { is_demo: true }
      });
      
      if (metadataError) {
        console.warn("⚠️ Could not update user metadata for demo flag:", metadataError);
      }
    } catch (err) {
      console.warn("⚠️ Error updating user metadata:", err);
    }
    
    // Get full user profile with metadata and role info using the correct function
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil du compte démo";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion démo",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }
    
    // Ensure demo flag is set - this is important for redirection
    user.is_demo = true;
    
    // Special handling for business accounts by email
    if (account.email.includes('business') || account.email.includes('entreprise')) {
      // Ensure business_admin role is included for business demo accounts
      if (!user.roles || !user.roles.includes('business_admin')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('business_admin')) {
          user.roles.push('business_admin');
        }
      }
    }
    
    // Update auth state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    toast({
      title: "Connexion démo réussie",
      description: `Bienvenue sur le compte de démonstration: ${account.name || account.email}!`,
    });
    
    // Execute callback if provided
    if (callback) {
      setTimeout(() => {
        callback();
      }, 100);
    }
    
    console.log("✅ Demo login successful for:", account.email, user);
    return user;
  } catch (error) {
    throw error;
  } finally {
    // Ensure loading state is reset
    setIsLoggingIn(false);
  }
};

// Registration handler
export const handleRegister = async (
  email: string,
  password: string,
  name: string,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  callback?: () => void
) => {
  try {
    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          full_name: name,
        }
      }
    });

    if (error) {
      console.error("❌ Registration failed:", error.message);
      toast({
        title: "Échec de l'inscription",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data.user) {
      const errorMsg = "No user data returned after registration";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur d'inscription",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Get user profile using the correct function
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil après inscription";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur d'inscription",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Update auth state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Show success message
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès! Bienvenue " + (user.name || ""),
    });

    // Execute callback if provided
    if (callback) callback();
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Password reset handler
export const handleResetPassword = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      console.error("❌ Password reset failed:", error.message);
      toast({
        title: "Échec de réinitialisation",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    toast({
      title: "Email envoyé",
      description: "Si un compte existe avec cet email, vous recevrez des instructions de réinitialisation.",
    });
  } catch (error) {
    throw error;
  }
};
