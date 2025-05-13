
import { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "student" | "instructor" | "admin" | "business_admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  phone?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  loginWithDemo: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
