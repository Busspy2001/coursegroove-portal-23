
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./types";
import { Database } from "@/integrations/supabase/types";

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
    
    // Get the user profile from profiles_unified table
    const { data: profile, error } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) throw error;
    
    // Convert database role to our application role type
    const userRole = profile?.role as UserRole;
    
    // Combine auth user and profile data
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: profile?.full_name || '',
      full_name: profile?.full_name || '',
      avatar: profile?.avatar_url || '',
      avatar_url: profile?.avatar_url || '',
      role: userRole || 'student',
      bio: profile?.bio || '',
      is_demo: profile?.is_demo || false
    };
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
    
    // Get the user profile from profiles_unified table
    const { data: profile, error: profileError } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    // If there's no profile yet, create one
    if (!profile) {
      // Convert the role for Supabase database compatibility
      const dbRole = 'student';
      
      const newProfile = {
        id: data.user.id,
        full_name: data.user.user_metadata.name || '',
        email: data.user.email,
        role: dbRole,
        avatar_url: data.user.user_metadata.avatar_url || '',
        is_demo: false
      };
      
      const { error: insertError } = await supabase
        .from('profiles_unified')
        .insert(newProfile);
        
      if (insertError) throw insertError;
      
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: newProfile.full_name,
        full_name: newProfile.full_name,
        avatar: newProfile.avatar_url,
        avatar_url: newProfile.avatar_url,
        role: 'student',
        is_demo: false
      };
    }
    
    // Convert database role to our application role type
    const userRole = profile.role as UserRole;
    
    // Combine auth user and profile data
    return {
      id: data.user.id,
      email: data.user.email || '',
      name: profile.full_name || '',
      full_name: profile.full_name || '',
      avatar: profile.avatar_url || '',
      avatar_url: profile.avatar_url || '',
      role: userRole || 'student',
      bio: profile.bio || '',
      is_demo: profile.is_demo || false
    };
  } catch (error: any) {
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
          name
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error("User registration failed");
    }
    
    // The handle_new_user trigger will create the profile
    // But we'll check and create manually if needed
    const { data: profile, error: profileError } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" - that's expected if the trigger didn't run yet
      throw profileError;
    }
    
    if (!profile) {
      // Create profile manually with the correct role type for database
      const dbRole = 'student';
      
      const newProfile = {
        id: data.user.id,
        full_name: name,
        email: email,
        role: dbRole,
        is_demo: false
      };
      
      const { error: insertError } = await supabase
        .from('profiles_unified')
        .insert(newProfile);
        
      if (insertError) throw insertError;
      
      return {
        id: data.user.id,
        email: data.user.email || '',
        name: name,
        full_name: name,
        role: 'student',
        is_demo: false
      };
    }
    
    // Convert database role to our application role type
    const userRole = profile.role as UserRole;
    
    // Return user data
    return {
      id: data.user.id,
      email: data.user.email || '',
      name: profile.full_name || name,
      full_name: profile.full_name || name,
      avatar: profile.avatar_url || '',
      avatar_url: profile.avatar_url || '',
      role: userRole || 'student',
      is_demo: profile.is_demo || false
    };
  } catch (error: any) {
    throw error;
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Send a reset password email
 */
export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error: any) {
    throw error;
  }
};
