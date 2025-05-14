
export type UserRole = 'student' | 'instructor' | 'super_admin' | 'business_admin';

export interface User {
  id: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  phone?: string;
  created_at?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  isLoggingIn?: boolean;
  login: (email: string, password: string, callback?: () => void) => Promise<void>;
  loginWithDemo?: (account: any, callback?: () => void) => Promise<void>;
  register: (email: string, password: string, name: string, callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
}
