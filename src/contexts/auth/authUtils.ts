
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./types";

// Map role strings to UserRole type
export const parseRole = (role: string): UserRole => {
  switch (role) {
    case "student": return "student";
    case "instructor": return "instructor";
    case "super_admin": return "super_admin";
    case "admin": return "admin";
    case "business_admin": return "business_admin";
    default: return "student"; // Default fallback
  }
};

// Check if a user has admin privileges
export const hasAdminPrivileges = (userRole: UserRole): boolean => {
  return userRole === "super_admin" || userRole === "admin";
};

// Check if a user has business admin privileges
export const hasBusinessPrivileges = (userRole: UserRole): boolean => {
  return userRole === "business_admin";
};

// Check if a user has instructor privileges
export const hasInstructorPrivileges = (userRole: UserRole): boolean => {
  return userRole === "instructor" || userRole === "super_admin" || userRole === "admin";
};

// Generate avatar URL from user's name
export const generateAvatarUrl = (name: string): string => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  
  // Use a placeholder or service like DiceBear Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`;
};

// User cache for optimizing mapping operations
export const userCache = new Map<string, User>();

// Clear user cache
export const clearUserCache = () => {
  userCache.clear();
};

// Map Supabase user to our User type
export const mapSupabaseUser = async (supabaseUser: any): Promise<User | null> => {
  try {
    // Check cache first
    if (userCache.has(supabaseUser.id)) {
      return userCache.get(supabaseUser.id) as User;
    }
    
    // If not in cache, query from database
    const { data: profile, error } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    // If no profile exists yet, create a basic one with default values
    if (!profile) {
      const username = supabaseUser.email.split('@')[0];
      const defaultUser: User = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.name || username,
        role: "student", // Default role
        avatar: generateAvatarUrl(supabaseUser.user_metadata?.name || username)
      };
      
      // Store in cache for future lookups
      userCache.set(supabaseUser.id, defaultUser);
      return defaultUser;
    }
    
    // Map database profile to User type
    const mappedUser: User = {
      id: profile.id,
      email: profile.email || supabaseUser.email,
      name: profile.full_name || supabaseUser.user_metadata?.name,
      role: parseRole(profile.role),
      avatar: profile.avatar_url,
      bio: profile.bio
    };
    
    // Store in cache for future lookups
    userCache.set(supabaseUser.id, mappedUser);
    return mappedUser;
  } catch (error) {
    console.error("Error mapping Supabase user:", error);
    return null;
  }
};
