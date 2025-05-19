
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

// Fetch user roles with the new system
export const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
  try {
    // First try to use our new security definer function that prevents RLS recursion
    const { data: roles, error } = await supabase
      .rpc('get_user_roles', { _user_id: userId });
      
    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }
    
    if (roles && roles.length > 0) {
      return roles as UserRole[];
    }
    
    // Fallback to the old method (profiles_unified) if no roles found
    // This is transitional code during migration
    const { data: profile, error: profileError } = await supabase
      .from('profiles_unified')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error("Error in fallback role fetch:", profileError);
      return ['student']; // Default to student as fallback
    }
    
    if (profile && profile.role) {
      return [profile.role as UserRole];
    }
    
    return ['student']; // Default to student if all else fails
  } catch (error) {
    console.error("Error in fetchUserRoles:", error);
    return ['student']; // Default to student as fallback
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
    
    // Get the user's roles using our new system
    const roles = await fetchUserRoles(supabaseUser.id);
    
    // If there's an error with profiles_unified (likely RLS policy issue)
    if (error) {
      console.error("Error fetching user profile:", error);
      
      // Fallback: Use metadata from the auth user
      const name = supabaseUser.user_metadata?.name || 
                   supabaseUser.user_metadata?.full_name || 
                   'User';
      
      // Default roles already set from fetchUserRoles
      // Construct user from auth data as fallback
      const user: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: name,
        full_name: name,
        avatar: supabaseUser.user_metadata?.avatar_url,
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        roles: roles,
        is_demo: supabaseUser.user_metadata?.is_demo || false
      };
      
      // Cache the user
      cacheUser(user);
      console.log("✅ Profil utilisateur créé à partir des métadonnées");
      return user;
    }
    
    // If profile was successfully retrieved
    if (profile) {
      const user: User = {
        id: profile.id,
        email: profile.email || supabaseUser.email || '',
        name: profile.full_name || supabaseUser.user_metadata?.name || 'User',
        full_name: profile.full_name,
        avatar: profile.avatar_url,
        avatar_url: profile.avatar_url,
        roles: roles,
        bio: profile.bio,
        phone: profile.phone || undefined,
        is_demo: profile.is_demo || false,
        company_id: profile.company_id
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
