
export type UserRole = "student" | "instructor" | "super_admin" | "admin" | "business_admin" | "employee" | "demo";

export interface User {
  id: string;
  email: string;
  name?: string;
  full_name?: string; // Support both name formats
  avatar?: string;
  avatar_url?: string; // Support both avatar formats
  roles: UserRole[]; // Changed from single role to array of roles
  bio?: string;
  phone?: string;
  is_demo?: boolean;
  company_id?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  authStateReady: boolean;
  login: (email: string, password: string, callback?: () => void) => Promise<User>;
  loginWithDemo: (account: any, callback?: () => void) => Promise<User>;
  register: (email: string, password: string, name: string, callback?: () => void) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  getUserPrimaryRole: () => UserRole;
}
