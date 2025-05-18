
import React, { useState, useEffect, ReactNode } from 'react';
import { User } from './types';
import * as authService from './authService';
import { clearUserCache } from './authUtils';
import { supabase, setLogoutActive, isLogoutActive } from '@/integrations/supabase/client';
import { AuthContext } from './context';
import { executeLogout } from './logout';
import { handleLogin, handleLoginWithDemo, handleRegister, handleResetPassword } from './auth-functions';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authStateReady, setAuthStateReady] = useState<boolean>(false);
  const location = useLocation();
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

  // Check for logout parameter in URL
  useEffect(() => {
    // Si l'URL contient ?logout=true, marquer l'état de déconnexion
    if (location.search.includes('logout=true')) {
      console.log("📍 Paramètre de déconnexion détecté dans l'URL, blocage de la reconnexion automatique");
      setLogoutActive(true);
      // Vérifier si l'utilisateur est encore authentifié et forcer la déconnexion si nécessaire
      if (isAuthenticated && currentUser) {
        console.log("🔐 Utilisateur toujours authentifié après redirection, forçage de la déconnexion");
        logout();
      }
    } else if (isLogoutActive) {
      // Réinitialiser le statut de déconnexion si on navigue sur une autre page (sauf login)
      if (!location.pathname.includes('/login')) {
        console.log("📍 Navigation vers une page non-login, réinitialisation du statut de déconnexion");
        setLogoutActive(false);
      }
    }
  }, [location, isAuthenticated, currentUser]);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      // Avoid checking auth multiple times
      if (initialCheckDone) return;
      
      try {
        setIsLoading(true);
        
        // Skip auth check if logout is active
        if (isLogoutActive) {
          console.log("🛑 État de déconnexion actif, vérification d'authentification ignorée");
          if (isMounted) {
            setCurrentUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            setAuthStateReady(true);
            setInitialCheckDone(true);
          }
          return;
        }
        
        const user = await authService.getCurrentUser();
        if (user && isMounted) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          console.log("🔓 Utilisateur authentifié:", user.email, "Rôle:", user.role);
          
          // Verify if user is demo 
          if (user.is_demo) {
            console.log("👨‍💼 Compte de démonstration détecté");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (isMounted) {
          toast({
            title: "Erreur d'authentification",
            description: "Un problème est survenu lors de la vérification de votre session.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setAuthStateReady(true);
          setInitialCheckDone(true);
        }
      }
    };

    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        
        console.log("🔄 Changement d'état d'authentification:", event);
        
        // Si un logout est actif, ignorer les événements de session
        if (isLogoutActive && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          console.log("🛑 Blocage de la reconnexion automatique car déconnexion active");
          
          // Force logout if a session is detected while logout is active
          if (session) {
            console.log("⚠️ Session détectée pendant la déconnexion active, forçage de la déconnexion");
            setTimeout(() => {
              if (isMounted) {
                supabase.auth.signOut({ scope: 'global' }).then(() => {
                  clearUserCache();
                });
              }
            }, 100);
          }
          
          setCurrentUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          setAuthStateReady(true);
          return;
        }
        
        // Using setTimeout to prevent infinite recursion with RLS policies
        setTimeout(async () => {
          if (!isMounted) return;
          
          if (session && event !== 'SIGNED_OUT') {
            try {
              const user = await authService.getCurrentUser();
              if (user && isMounted) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                console.log("👤 Utilisateur mis à jour:", user.email, "Rôle:", user.role);
              }
            } catch (error) {
              console.error("Error getting user after auth state change:", error);
            }
          } else {
            setCurrentUser(null);
            setIsAuthenticated(false);
            clearUserCache();
          }
          
          setIsLoading(false);
          setAuthStateReady(true);
        }, 100);
      }
    );

    checkAuth();

    // Cleanup subscription and prevent state updates after unmount
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string, callback?: () => void) => {
    // Reset logout status when logging in
    setLogoutActive(false);
    try {
      setIsLoggingIn(true);
      const user = await handleLogin(email, password, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
      console.log(`✅ Login successful for ${user.email} (${user.role})`);
      
      // Return user for additional processing if needed
      return user;
    } catch (error) {
      setIsLoggingIn(false);
      console.error("❌ Login failed:", error);
      throw error;
    }
  };

  // Login with demo account
  const loginWithDemo = async (account: any, callback?: () => void) => {
    // Reset logout status when logging in
    setLogoutActive(false);
    try {
      setIsLoggingIn(true);
      const user = await handleLoginWithDemo(account, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
      console.log(`✅ Demo login successful for ${user.email} (${user.role})`);

      // Return the user for additional processing if needed
      return user;
    } catch (error) {
      setIsLoggingIn(false);
      console.error("❌ Demo login failed:", error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, callback?: () => void) => {
    // Reset logout status when registering
    setLogoutActive(false);
    return handleRegister(email, password, name, setCurrentUser, setIsAuthenticated, callback);
  };

  // Logout function
  const logout = async (callback?: () => void) => {
    if (isLoggingOut) {
      console.log("⚠️ Déconnexion déjà en cours, ignoré");
      return;
    }
    
    // Activer le drapeau de déconnexion
    setLogoutActive(true);
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
    authStateReady,
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
