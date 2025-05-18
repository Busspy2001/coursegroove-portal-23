
import { supabase } from '@/integrations/supabase/client';
import { User } from './types';
import { getUserFromCache, cacheUser } from './authUtils';
import { isDemoAccount, getDemoAccountInfo } from '@/components/auth/demo/demoAccountService';

// Function to retrieve the current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // First try to get from cache for performance
    const cachedUser = getUserFromCache();
    if (cachedUser) {
      console.log("📂 Utilisateur récupéré du cache");
      return cachedUser;
    }

    // If not in cache, get from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("❌ Aucune session trouvée");
      return null;
    }
    
    const userId = session.user.id;
    
    // Check for demo account special case
    const email = session.user.email;
    if (email && isDemoAccount(email)) {
      console.log("🎭 Compte de démonstration détecté:", email);
      const demoInfo = getDemoAccountInfo(email);
      
      if (demoInfo) {
        const demoUser: User = {
          id: userId,
          email: email,
          name: demoInfo.name,
          role: demoInfo.role,
          is_demo: true,
          avatar: demoInfo.avatar
        };
        
        // Cache the user for better performance
        cacheUser(demoUser);
        return demoUser;
      }
    }
    
    // Get user profile from database
    const { data: profile, error } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.error("❌ Erreur lors de la récupération du profil:", error);
      return null;
    }
    
    if (!profile) {
      console.log("❌ Aucun profil trouvé pour l'utilisateur:", userId);
      return null;
    }
    
    const user: User = {
      id: userId,
      email: session.user.email || "",
      name: profile.full_name || "",
      role: profile.role,
      is_demo: profile.is_demo || false,
      avatar: profile.avatar_url,
      company_id: profile.company_id
    };
    
    // Cache the user for better performance
    cacheUser(user);
    return user;
    
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};

// Logout function
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    console.log("✅ User logged out successfully");
  } catch (error) {
    console.error("❌ Error during logout:", error);
    throw error;
  }
};
