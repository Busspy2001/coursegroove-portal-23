
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { User, AuthContextType } from './types';
import * as authService from './authService';

// Context
const AuthContext = createContext<AuthContextType>({
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
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const user = await authService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, callback?: () => void) => {
    try {
      setIsLoggingIn(true);
      const user = await authService.loginUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Success toast
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.name || user.email}!`,
      });
      
      if (callback) callback();
      return;
    } catch (error: any) {
      console.error("Login error:", error);
      // Error toast
      toast({
        title: "Erreur de connexion",
        description: error.message || "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Login with demo account
  const loginWithDemo = async (account: any, callback?: () => void) => {
    try {
      setIsLoggingIn(true);
      const { email, password } = account;
      const user = await authService.loginUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Connexion démo réussie",
        description: `Vous êtes connecté en tant que ${user.name || user.email} (${user.role}).`,
      });
      
      if (callback) callback();
      return;
    } catch (error: any) {
      console.error("Demo login error:", error);
      toast({
        title: "Erreur de connexion démo",
        description: error.message || "Un problème est survenu avec ce compte de démonstration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, callback?: () => void) => {
    try {
      const user = await authService.registerUser(name, email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur Schoolier!",
      });
      
      if (callback) callback();
      return;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer votre compte. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout function
  const logout = async (callback?: () => void) => {
    try {
      setIsLoggingOut(true);
      await authService.logoutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      if (callback) callback();
      return;
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await authService.resetUserPassword(email);
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cette adresse, vous recevrez un email de réinitialisation.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Erreur de réinitialisation",
        description: error.message || "Impossible d'envoyer l'email de réinitialisation.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Context value to be provided
  const contextValue: AuthContextType = {
    currentUser,
    isAuthenticated,
    isLoading,
    isLoggingOut,
    isLoggingIn,
    login,
    loginWithDemo,
    register,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
