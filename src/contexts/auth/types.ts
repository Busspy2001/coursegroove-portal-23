
export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  avatar?: string;
  emailVerified?: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggingOut?: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User | null>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
