
import { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "student" | "instructor" | "admin" | "business_admin";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  loginWithDemo: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>; // Add callback parameter
  resetPassword: (email: string) => Promise<void>;
}
