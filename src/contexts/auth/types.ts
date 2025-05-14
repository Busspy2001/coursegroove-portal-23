
export type UserRole = "student" | "instructor" | "super_admin" | "admin" | "business_admin" | "employee" | "demo";

export interface User {
  id: string;
  email: string;
  name?: string;
  full_name?: string; // Support both name formats
  avatar?: string;
  avatar_url?: string; // Support both avatar formats
  role: UserRole;
  bio?: string;
  phone?: string;
  is_demo?: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  login: (email: string, password: string, callback?: () => void) => Promise<void>;
  loginWithDemo: (account: any, callback?: () => void) => Promise<void>;
  register: (email: string, password: string, name: string, callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
