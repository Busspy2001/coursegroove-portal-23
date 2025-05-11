
import { supabase, userCache } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User, UserRole } from "./types";
import { ProfilesUnified } from "@/types/database";

// Map Supabase user to our User interface - optimisé pour la performance
export const mapSupabaseUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null;
  
  // Vérifier d'abord le cache
  if (userCache.has(supabaseUser.id)) {
    return userCache.get(supabaseUser.id);
  }
  
  try {
    // Timeout pour éviter de bloquer trop longtemps
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 3000); // 3 secondes de timeout
    });
    
    // Promesse pour récupérer le profil
    const profilePromise = new Promise<User>(async (resolve) => {
      try {
        // Get user profile from the profiles_unified table
        const { data: profile, error } = await (supabase
          .from('profiles_unified' as unknown as never)
          .select('*')
          .eq('id', supabaseUser.id)
          .single() as unknown as { data: ProfilesUnified | null, error: any });
        
        // Generate avatar URL if not present in the profile
        const avatarUrl = supabaseUser.user_metadata?.avatar_url || 
          profile?.avatar_url || 
          `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || supabaseUser.user_metadata?.name || 'User')}&background=0D9488&color=fff`;
        
        // Créer l'utilisateur à partir des données disponibles
        const user = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: profile?.full_name || supabaseUser.user_metadata?.name || 'User',
          role: (profile?.role as UserRole) || 'student',
          avatar: avatarUrl,
          bio: profile?.bio || ''
        };
        
        // Mettre en cache pour les prochaines requêtes
        userCache.set(supabaseUser.id, user);
        
        resolve(user);
      } catch (err) {
        // En cas d'erreur, créer un utilisateur avec les données minimales
        const fallbackUser = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || 'User',
          role: 'student' as UserRole,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.user_metadata?.name || 'User')}&background=0D9488&color=fff`,
          bio: ''
        };
        
        // Mettre en cache même l'utilisateur par défaut
        userCache.set(supabaseUser.id, fallbackUser);
        
        resolve(fallbackUser);
      }
    });
    
    // Course après timeout ou données récupérées
    return await Promise.race([profilePromise, timeoutPromise]) as User | null;
  } catch (error) {
    console.error("Error in mapSupabaseUser:", error);
    
    // Return a default user object if all else fails
    const defaultUser = {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || 'User',
      role: 'student' as UserRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.user_metadata?.name || 'User')}&background=0D9488&color=fff`,
      bio: ''
    };
    
    userCache.set(supabaseUser.id, defaultUser);
    return defaultUser;
  }
};

// Fonction pour vider le cache - utile après déconnexion
export const clearUserCache = () => {
  userCache.clear();
};
