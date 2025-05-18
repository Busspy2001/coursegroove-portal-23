
import { createContext, useContext } from "react";
import { User } from "./types";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  authStateReady: boolean;
  login: (email: string, password: string, callback?: () => void) => Promise<User>;
  loginWithDemo: (account: any, callback?: () => void) => Promise<User>;
  register: (email: string, password: string, name: string, callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create auth context with default values
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingOut: false,
  isLoggingIn: false,
  authStateReady: false,
  login: async () => {
    throw new Error("login function not implemented");
  },
  loginWithDemo: async () => {
    throw new Error("loginWithDemo function not implemented");
  },
  register: async () => {
    throw new Error("register function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
  resetPassword: async () => {
    throw new Error("resetPassword function not implemented");
  }
});
