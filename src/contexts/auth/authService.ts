
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
 * Register a new user with name, email and password
 */
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    // Register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error("Failed to create user");
    }
    
    // Map the user to our application's User type
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
 * Logout the current user with enhanced cleanup and token removal
 */
export const logoutUser = async (): Promise<void> => {
  const MAX_RETRIES = 2;
  let attempt = 0;
  
  // Force clean local storage auth session data
  const cleanLocalStorage = () => {
    try {
      console.log("🧹 Nettoyage manuel des données d'authentification du localStorage");
      
      // Supprimer spécifiquement les clés liées à l'authentification Supabase
      const keysToRemove = [
        'supabase.auth.token',
        'supabase.auth.refreshToken',
        'sb-iigenwvxvvfoywrhbwms-auth-token',
        'supabase.auth.expires_at',
      ];
      
      keysToRemove.forEach(key => {
        if(localStorage.getItem(key)) {
          localStorage.removeItem(key);
          console.log(`✅ Suppression de ${key} du localStorage`);
        }
      });
      
      // Technique alternative: rechercher et supprimer toutes les clés contenant 'supabase', 'auth', 'token'
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('supabase') || key.includes('auth') || key.includes('token'))) {
          console.log(`🔑 Suppression de la clé supplémentaire: ${key}`);
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.error("❌ Erreur lors du nettoyage manuel du localStorage:", e);
    }
  };
  
  const executeLogout = async (): Promise<void> => {
    try {
      console.log(`📤 Tentative de déconnexion Supabase (${attempt + 1}/${MAX_RETRIES + 1})`);
      
      // Déconnexion avec option scope: 'global' pour déconnecter sur tous les appareils
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.error(`❌ Erreur lors de la déconnexion (tentative ${attempt + 1}):`, error);
        throw error;
      }
      
      // Nettoyage manuel du localStorage après la déconnexion Supabase
      cleanLocalStorage();
      
      console.log("✅ Déconnexion Supabase réussie et nettoyage effectué");
    } catch (error: any) {
      console.error(`❌ Échec de déconnexion (tentative ${attempt + 1}):`, error);
      
      // Nettoyage manuel même en cas d'erreur
      cleanLocalStorage();
      
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
