
import { UserRole } from "./types";

// Map role strings to UserRole type
export const parseRole = (role: string): UserRole => {
  switch (role) {
    case "student": return "student";
    case "instructor": return "instructor";
    case "super_admin": return "super_admin";
    case "business_admin": return "business_admin";
    default: return "student"; // Default fallback
  }
};

// Check if a user has admin privileges
export const hasAdminPrivileges = (userRole: UserRole): boolean => {
  return userRole === "super_admin";
};

// Check if a user has business admin privileges
export const hasBusinessPrivileges = (userRole: UserRole): boolean => {
  return userRole === "business_admin";
};

// Check if a user has instructor privileges
export const hasInstructorPrivileges = (userRole: UserRole): boolean => {
  return userRole === "instructor" || userRole === "super_admin";
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
