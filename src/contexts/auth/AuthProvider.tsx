import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { User, AuthContextType } from './types';
import * as authService from './authService';
import { clearUserCache } from './authUtils';
import { supabase } from '@/integrations/supabase/client';

// Timeout constants for logout process
const LOGOUT_TIMEOUT = 5000; // 5 seconds timeout for logout
const CACHE_CLEAR_DELAY = 100; // Small delay before cache clearing

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
          console.log("🔓 Utilisateur authentifié:", user.email, "Rôle:", user.role);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔄 Changement d'état d'authentification:", event);
        
        // Using setTimeout to prevent infinite recursion with RLS policies
        setTimeout(async () => {
          if (session) {
            const user = await authService.getCurrentUser();
            if (user) {
              setCurrentUser(user);
              setIsAuthenticated(true);
              console.log("👤 Utilisateur mis à jour:", user.email, "Rôle:", user.role);
            }
          } else {
            setCurrentUser(null);
            setIsAuthenticated(false);
            clearUserCache();
          }
          
          setIsLoading(false);
        }, 0);
      }
    );

    checkAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
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

  // Improved logout function with timeout and better error handling
  const logout = async (callback?: () => void) => {
    if (isLoggingOut) {
      console.log("⚠️ Déconnexion déjà en cours, ignoré");
      return;
    }
    
    try {
      console.log("🔄 Début du processus de déconnexion");
      setIsLoggingOut(true);
      
      // First, clear any local user state before calling Supabase logout
      // This ensures UI is immediately responsive
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      // Create a promise that will resolve when logout completes or timeout
      const logoutWithTimeout = async () => {
        let timeoutId: NodeJS.Timeout;
        
        // Create a promise that will resolve with the logout result or reject on timeout
        const logoutPromise = Promise.race([
          authService.logoutUser().then(() => {
            console.log("✅ Déconnexion Supabase réussie");
            return true;
          }),
          new Promise<boolean>((_, reject) => {
            timeoutId = setTimeout(() => {
              console.warn("⚠️ Délai de déconnexion dépassé, forçage de la déconnexion");
              reject(new Error("Logout timeout"));
            }, LOGOUT_TIMEOUT);
          })
        ]);
        
        try {
          await logoutPromise;
        } catch (error) {
          console.error("⚠️ Erreur lors de la déconnexion, forçage de la fin de session:", error);
        } finally {
          clearTimeout(timeoutId);
          
          // Clear cache after a small delay to ensure it doesn't interfere with logout
          setTimeout(() => {
            console.log("🗑️ Nettoyage du cache utilisateur post-déconnexion");
            clearUserCache();
          }, CACHE_CLEAR_DELAY);
          
          return true; // Always return success for UI purposes
        }
      };
      
      // Execute the logout with timeout
      await logoutWithTimeout();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      
      // Execute callback with slight delay to ensure auth state is updated
      if (callback) {
        setTimeout(() => {
          callback();
        }, 100);
      }
    } catch (error: any) {
      console.error("❌ Erreur critique de déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoggingOut(false);
      console.log("🔄 Processus de déconnexion terminé");
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
