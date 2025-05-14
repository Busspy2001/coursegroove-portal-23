
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./types";
import { userCache } from "@/integrations/supabase/client";

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
      let role: UserRole;
      
      if (supabaseUser.email === 'admin@schoolier.com') {
        role = 'super_admin';
      } else if (supabaseUser.email === 'prof@schoolier.com') {
        role = 'instructor';
      } else if (supabaseUser.email === 'business@schoolier.com') {
        role = 'business_admin';
      } else {
        role = 'student';
      }
      
      // Construct user from auth data as fallback
      const user: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: name,
        avatar: supabaseUser.user_metadata?.avatar_url,
        role: role
      };
      
      // Cache the user
      userCache.set(supabaseUser.id, user);
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
        role: profile.role as UserRole,
      };
      
      // Cache the user
      userCache.set(supabaseUser.id, user);
      console.log("✅ Profil utilisateur récupéré de la base de données");
      return user;
    }
    
    return null;
  } catch (error) {
    console.error("Error mapping Supabase user:", error);
    return null;
  }
};

// Clear user cache (used during logout)
export const clearUserCache = () => {
  console.log("🗑️ Nettoyage du cache utilisateur");
  userCache.clear();
};
