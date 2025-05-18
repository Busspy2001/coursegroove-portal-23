
import React, { useState, useEffect, ReactNode } from 'react';
import { User } from './types';
import * as authService from './authService';
import { clearUserCache } from './authUtils';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './context';
import { executeLogout } from './logout';
import { handleLogin, handleLoginWithDemo, handleRegister, handleResetPassword } from './auth-functions';

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
    return handleLogin(email, password, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
  };

  // Login with demo account
  const loginWithDemo = async (account: any, callback?: () => void) => {
    return handleLoginWithDemo(account, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
  };

  // Register function
  const register = async (email: string, password: string, name: string, callback?: () => void) => {
    return handleRegister(email, password, name, setCurrentUser, setIsAuthenticated, callback);
  };

  // Logout function
  const logout = async (callback?: () => void) => {
    if (isLoggingOut) {
      console.log("⚠️ Déconnexion déjà en cours, ignoré");
      return;
    }
    
    setIsLoggingOut(true);
    return executeLogout(setCurrentUser, setIsAuthenticated, setIsLoggingOut, callback);
  };

  // Reset password
  const resetPassword = async (email: string) => {
    return handleResetPassword(email);
  };

  // Context value to be provided
  const contextValue = {
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

// Re-export the useAuth hook
export { useAuth } from './hooks';
