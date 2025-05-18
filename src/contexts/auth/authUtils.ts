import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./types";
import { userCache } from "@/integrations/supabase/client";

// User cache management functions
export const getUserFromCache = (userId?: string): User | null => {
  try {
    // If no userId is provided, try to get the current session user id
    if (!userId) {
      // Note: The session method is deprecated in newer Supabase versions
      // We need to use getSession() instead which returns a promise
      const session = supabase.auth.getSession();
      // Since we can't await here synchronously, we'll have to return null if no userId provided
      return null;
    }

    // If we have a userId, check if user is in cache
    if (userId && userCache.has(userId)) {
      return userCache.get(userId);
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user from cache:", error);
    return null;
  }
};

// Store user in cache
export const cacheUser = (user: User): void => {
  try {
    if (!user || !user.id) {
      console.error("Invalid user object for caching");
      return;
    }
    
    userCache.set(user.id, user);
    console.log(`✅ User cached: ${user.email}`);
  } catch (error) {
    console.error("Error caching user:", error);
  }
};

// Mapping Supabase user to our app's user model
export const mapSupabaseUser = async (supabaseUser: any): Promise<User | null> => {
  try {
    if (!supabaseUser) return null;
    
    // Check if user is in cache
    if (userCache.has(supabaseUser.id)) {
      console.log("🗃️ Utilisateur récupéré du cache");
      return userCache.get(supabaseUser.id);
    }
    
    console.log("👤 Récupération du profil utilisateur");
    
    // First attempt to get the user's profile from profiles_unified
    let { data: profile, error } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();
    
    // If there's an error with profiles_unified (likely RLS policy issue)
    if (error) {
      console.error("Error fetching user profile:", error);
      
      // Fallback: Use metadata from the auth user
      const name = supabaseUser.user_metadata?.name || 
                   supabaseUser.user_metadata?.full_name || 
                   'User';
      
      // Create a fallback role based on user metadata or default to student
      let role: UserRole = 'student';
      
      if (supabaseUser.email === 'admin@schoolier.com') {
        role = 'super_admin';
      } else if (supabaseUser.email === 'prof@schoolier.com') {
        role = 'instructor';
      } else if (supabaseUser.email === 'business@schoolier.com' || supabaseUser.email === 'entreprise@schoolier.com') {
        role = 'business_admin';
      } else if (supabaseUser.email?.includes('employee')) {
        role = 'employee';
      } else if (supabaseUser.email?.includes('admin')) {
        role = 'admin';
      }
      
      // Construct user from auth data as fallback
      const user: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: name,
        full_name: name,
        avatar: supabaseUser.user_metadata?.avatar_url,
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        role: role,
        is_demo: supabaseUser.user_metadata?.is_demo || false
      };
      
      // Cache the user
      cacheUser(user);
      console.log("✅ Profil utilisateur créé à partir des métadonnées");
      return user;
    }
    
    // If profile was successfully retrieved
    if (profile) {
      // Convertir le rôle de la base de données en type UserRole pour l'application
      // Cela permet d'éviter les problèmes de type entre Supabase et notre app
      let appRole: UserRole;
      
      switch(profile.role) {
        case 'super_admin':
          appRole = 'super_admin';
          break;
        case 'business_admin':
          appRole = 'business_admin';
          break;
        case 'instructor':
          appRole = 'instructor';
          break;
        case 'employee':
          appRole = 'employee';
          break;
        case 'demo':
          appRole = 'demo';
          break;
        case 'admin':
          appRole = 'admin';
          break;
        default:
          appRole = 'student';
      }
      
      const user: User = {
        id: profile.id,
        email: profile.email || supabaseUser.email || '',
        name: profile.full_name || supabaseUser.user_metadata?.name || 'User',
        full_name: profile.full_name,
        avatar: profile.avatar_url,
        avatar_url: profile.avatar_url,
        role: appRole,
        bio: profile.bio,
        phone: profile.phone || undefined,
        is_demo: profile.is_demo || false
      };
      
      // Cache the user
      cacheUser(user);
      console.log("✅ Profil utilisateur récupéré de la base de données");
      return user;
    }
    
    return null;
  } catch (error) {
    console.error("Error mapping Supabase user:", error);
    return null;
  }
};

// Improved cache clearing (used during logout)
export const clearUserCache = () => {
  try {
    const cacheSize = userCache.size;
    console.log(`🗑️ Nettoyage du cache utilisateur (${cacheSize} entrées)`);
    userCache.clear();
    console.log("✅ Cache utilisateur nettoyé avec succès");
    return true;
  } catch (error) {
    console.error("❌ Erreur lors du nettoyage du cache:", error);
    return false;
  }
};
