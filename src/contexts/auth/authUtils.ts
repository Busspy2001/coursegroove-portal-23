
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User, UserRole } from "./types";

// Map Supabase user to our User interface
export const mapSupabaseUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null;
  
  // Get user profile from the profiles_unified table
  const { data: profile, error } = await supabase
    .from('profiles_unified')
    .select('*')
    .eq('id', supabaseUser.id)
    .single();
  
  if (error) {
    console.error("Error fetching user profile:", error);
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || 'User',
      role: 'student', // Default role
      avatar: supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${supabaseUser.user_metadata?.name || 'User'}&background=0D9488&color=fff`
    };
  }
  
  // Use type assertion to handle the fields not detected in the TypeScript types
  const profileWithTypes = profile as (typeof profile & { avatar_url?: string; bio?: string });
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: profile?.full_name || supabaseUser.user_metadata?.name || 'User',
    role: (profile?.role as UserRole) || 'student',
    avatar: profileWithTypes?.avatar_url || supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=0D9488&color=fff`,
    bio: profileWithTypes?.bio || ''
  };
};
