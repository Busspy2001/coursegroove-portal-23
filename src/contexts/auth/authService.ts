
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./types";
import { Database } from "@/integrations/supabase/types";
import { mapSupabaseUser } from "./authUtils";

// Type for the profiles_unified table
type ProfileUnified = Database['public']['Tables']['profiles_unified']['Row'];

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    // Utiliser mapSupabaseUser pour obtenir l'utilisateur correctement formaté
    return await mapSupabaseUser(session.user);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Login a user with email and password
 */
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error("User not found");
    }
    
    // Utiliser mapSupabaseUser pour obtenir l'utilisateur correctement formaté
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      throw new Error("Failed to map user profile");
    }
    
    return user;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Register a new user
 */
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          full_name: name,
          is_demo: false
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error("User registration failed");
    }
    
    // Utiliser mapSupabaseUser pour obtenir l'utilisateur correctement formaté
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      throw new Error("Failed to map user profile");
    }
    
    return user;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Logout the current user with retry mechanism
 */
export const logoutUser = async (): Promise<void> => {
  const MAX_RETRIES = 2;
  let attempt = 0;
  
  const executeLogout = async (): Promise<void> => {
    try {
      console.log(`📤 Tentative de déconnexion Supabase (${attempt + 1}/${MAX_RETRIES + 1})`);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error(`❌ Erreur lors de la déconnexion (tentative ${attempt + 1}):`, error);
        throw error;
      }
      
      console.log("✅ Déconnexion Supabase réussie");
    } catch (error: any) {
      console.error(`❌ Échec de déconnexion (tentative ${attempt + 1}):`, error);
      
      if (attempt < MAX_RETRIES) {
        attempt++;
        console.log(`🔄 Nouvelle tentative de déconnexion dans 500ms...`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
        return executeLogout();
      }
      
      throw error;
    }
  };
  
  return executeLogout();
};

/**
 * Send a reset password email
 */
export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  }
};
