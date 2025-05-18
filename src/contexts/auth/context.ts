
import { User } from './types';

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  authStateReady: boolean;
  login: (email: string, password: string, callback?: () => void) => Promise<User>;
  loginWithDemo: (account: any, callback?: () => void) => Promise<User>;
  register: (email: string, password: string, name: string, callback?: () => void) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
