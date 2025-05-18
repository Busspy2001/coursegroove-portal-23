
import { createContext } from 'react';
import { AuthContextType } from './types';

// Default context values
const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingOut: false,
  isLoggingIn: false,
  login: async () => {},
  loginWithDemo: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
};

// Create context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
