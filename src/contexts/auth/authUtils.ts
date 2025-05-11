
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User, UserRole } from "./types";
import { ProfilesUnified } from "@/types/database";

// Map Supabase user to our User interface
export const mapSupabaseUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null;
  
  try {
    // Get user profile from the profiles_unified table
    // Using double type assertion to bypass TypeScript errors since we can't modify the types.ts file
    const { data: profile, error } = await (supabase
      .from('profiles_unified' as unknown as never)
      .select('*')
      .eq('id', supabaseUser.id)
      .single() as unknown as { data: ProfilesUnified | null, error: any });
    
    if (error) {
      console.error("Error fetching user profile:", error);
      
      // If profile doesn't exist, try to create it
      if (error.message.includes("No rows found")) {
        try {
          // Extract name from user metadata
          const name = supabaseUser.user_metadata?.name || 'User';
          const email = supabaseUser.email || '';
          
          // Create a default profile
          await (supabase
            .from('profiles_unified' as unknown as never)
            .insert({
              id: supabaseUser.id,
              full_name: name,
              email: email,
              role: 'student',
              created_at: new Date().toISOString()
            } as unknown as never));
          
          console.log("Created missing profile for user:", supabaseUser.id);
          
          // Try fetching the profile again
          const { data: newProfile, error: newError } = await (supabase
            .from('profiles_unified' as unknown as never)
            .select('*')
            .eq('id', supabaseUser.id)
            .single() as unknown as { data: ProfilesUnified | null, error: any });
            
          if (newError) {
            throw newError;
          }
          
          // Use the newly created profile
          return {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: newProfile?.full_name || name,
            role: (newProfile?.role as UserRole) || 'student',
            avatar: supabaseUser.user_metadata?.avatar_url || newProfile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`,
            bio: newProfile?.bio || ''
          };
        } catch (createError) {
          console.error("Failed to create missing profile:", createError);
        }
      }
      
      // Return a default user object if we couldn't get or create a profile
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.name || 'User',
        role: 'student', // Default role
        avatar: supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.user_metadata?.name || 'User')}&background=0D9488&color=fff`,
        bio: ''
      };
    }
    
    // Generate avatar URL if not present in the profile
    const avatarUrl = supabaseUser.user_metadata?.avatar_url || 
      profile?.avatar_url || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || 'User')}&background=0D9488&color=fff`;
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.full_name || supabaseUser.user_metadata?.name || 'User',
      role: (profile?.role as UserRole) || 'student',
      avatar: avatarUrl,
      bio: profile?.bio || ''
    };
  } catch (error) {
    console.error("Error in mapSupabaseUser:", error);
    
    // Return a default user object if all else fails
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || 'User',
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.user_metadata?.name || 'User')}&background=0D9488&color=fff`,
      bio: ''
    };
  }
};
