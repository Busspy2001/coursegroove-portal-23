
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from './types';
import { getUserFromCache, cacheUser, fetchUserRoles } from './authUtils';
import { isDemoAccount, getDemoAccountInfo } from '@/components/auth/demo/demoAccountService';

// Function to retrieve the current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // First try to get from cache for performance
    // Note: We can't get userId from cache without a session, so this will likely return null
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
        // Get roles even for demo accounts
        const roles = await fetchUserRoles(userId);
        
        const demoUser: User = {
          id: userId,
          email: email,
          name: demoInfo.name,
          roles: roles.length ? roles : [demoInfo.role], // Use fetched roles or fallback to demo role
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
    
    // Fetch user roles from our new system
    const roles = await fetchUserRoles(userId);
    
    if (!profile) {
      console.log("❌ Aucun profil trouvé pour l'utilisateur:", userId);
      
      // Even if no profile, we can still return a user with roles
      const user: User = {
        id: userId,
        email: session.user.email || "",
        name: session.user.user_metadata?.name || "User",
        roles: roles,
        is_demo: session.user.user_metadata?.is_demo || false
      };
      
      cacheUser(user);
      return user;
    }
    
    const user: User = {
      id: userId,
      email: session.user.email || "",
      name: profile.full_name || "",
      roles: roles,
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
