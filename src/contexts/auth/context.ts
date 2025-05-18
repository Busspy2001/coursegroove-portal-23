
import { createContext } from 'react';
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

// Create the context with a default empty implementation
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingIn: false,
  isLoggingOut: false,
  authStateReady: false,
  login: async () => { throw new Error('AuthContext not initialized'); },
  loginWithDemo: async () => { throw new Error('AuthContext not initialized'); },
  register: async () => { throw new Error('AuthContext not initialized'); },
  logout: async () => { throw new Error('AuthContext not initialized'); },
  resetPassword: async () => { throw new Error('AuthContext not initialized'); }
});
