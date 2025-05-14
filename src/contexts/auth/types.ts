
export type UserRole = 'super_admin' | 'business_admin' | 'student' | 'instructor' | 'demo' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  avatar_url?: string;  // Added for compatibility 
  full_name?: string;   // Added for compatibility
  bio?: string;         // Added for user profile
  phone?: string;       // Added for user profile
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isLoggingOut: boolean;
  loginWithDemo?: (email: string, password: string) => Promise<User>; // Added for demo login
  isLoggingIn?: boolean; // Added for login status tracking
}
