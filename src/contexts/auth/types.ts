
export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: UserRole;
  avatar?: string;
  emailVerified?: boolean;
  bio?: string;
  phone?: string;
}

export type UserRole = 'super_admin' | 'business_admin' | 'student' | 'instructor' | 'demo' | 'admin';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggingOut?: boolean;
  isLoggingIn?: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User | null>;
  loginWithDemo: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
