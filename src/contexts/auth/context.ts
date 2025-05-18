
import { createContext } from 'react';
import { AuthContextType, User } from './types';

// Default context values
const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingOut: false,
  isLoggingIn: false,
  login: async (_email: string, _password: string, _callback?: () => void): Promise<User> => {
    throw new Error('login function not implemented');
  },
  loginWithDemo: async (_account: any, _callback?: () => void): Promise<User> => {
    throw new Error('loginWithDemo function not implemented');
  },
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
};

// Create context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
