
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mapSupabaseUser, clearUserCache } from "./authUtils";
import { User, UserRole } from "./types";

// Getting the current logged in user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.error("Error getting current user:", error);
      return null;
    }
    
    return mapSupabaseUser(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};

// Login a user with email and password
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    console.log("🔑 Tentative de connexion pour:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      console.error("❌ Erreur d'authentification:", error);
      throw error;
    }
    
    console.log("✅ Authentification réussie, récupération des données utilisateur");
    
    const mappedUser = await mapSupabaseUser(data.user);
    
    if (!mappedUser) {
      console.error("❌ Impossible de récupérer les données utilisateur");
      throw new Error("User data couldn't be retrieved");
    }
    
    console.log("👤 Données utilisateur récupérées avec le rôle:", mappedUser.role);
    
    return mappedUser;
  } catch (error: any) {
    console.error("❌ Erreur de connexion:", error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    console.log("🔑 Tentative d'inscription pour:", email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
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
      // Create a profile in the profiles_unified table
      const { error: profileError } = await supabase
        .from('profiles_unified')
        .insert({
          id: data.user.id,
          full_name: name,
          email: email,
          role: 'student',
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`
        });
        
      if (profileError) {
        console.error("Profile creation error:", profileError);
      } else {
        console.log("✅ Profil créé avec succès");
      }
    } catch (profileInsertError) {
      console.error("Error during profile insertion:", profileInsertError);
    }
    
    const mappedUser = await mapSupabaseUser(data.user);
    
    if (!mappedUser) {
      throw new Error("User data couldn't be retrieved after registration");
    }
    
    return mappedUser;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Logout the current user
export const logoutUser = async (): Promise<void> => {
  try {
    console.log("🚪 Tentative de déconnexion");
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("❌ Erreur lors de la déconnexion:", error);
      throw error;
    }
    
    console.log("✅ Déconnexion réussie");
    
    clearUserCache();
  } catch (error: any) {
    console.error("❌ Erreur de déconnexion:", error);
    throw error;
  }
};

// Reset user password
export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  }
};
