
import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './context';
import { User, UserRole } from './types';
import { supabase } from '@/integrations/supabase/client';
import { authService } from '@/services/auth-service';
import { toast } from '@/hooks/use-toast';
import { executeLogout, resetLogoutStatus } from './logout';
import { handleLogin, handleLoginWithDemo, handleRegister, handleResetPassword } from './auth-functions';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [authStateReady, setAuthStateReady] = useState<boolean>(false);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("🔒 User signed out");
        setCurrentUser(null);
        setIsAuthenticated(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user?.id) {
          console.log("🔑 User authenticated, fetching profile");
          setIsLoading(true);
          
          try {
            // Use setTimeout to prevent potential recursion issues
            setTimeout(async () => {
              const user = await authService.getCurrentUser();
              if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                console.log("✅ User authenticated:", user.email);
              } else {
                console.log("❌ Could not fetch user profile");
                setCurrentUser(null);
                setIsAuthenticated(false);
              }
              setIsLoading(false);
            }, 0);
          } catch (error) {
            console.error("❌ Error in auth state change:", error);
            setCurrentUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        }
      }
    });

    // Initial auth check
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        
        if (user) {
          console.log("🔑 User found on initialization:", user.email);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          console.log("🔒 No authenticated user found on initialization");
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Error during auth initialization:", error);
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        setAuthStateReady(true);
        console.log("✅ Auth state initialization complete");
      }
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string, callback?: () => void): Promise<User> => {
    try {
      setIsLoggingIn(true);
      console.log("🔄 Login attempt:", email);
      
      const user = await handleLogin(
        email, 
        password, 
        setCurrentUser, 
        setIsAuthenticated, 
        setIsLoggingIn, 
        callback
      );
      
      console.log("✅ Login successful:", email);
      return user;
    } catch (error) {
      console.error("❌ Login exception:", error);
      setIsLoggingIn(false);
      throw error;
    }
  };

  // Login with demo account
  const loginWithDemo = async (account: any, callback?: () => void): Promise<User> => {
    try {
      setIsLoggingIn(true);
      console.log("🎭 Demo login attempt:", account.email);
      
      // Use the dedicated demo login handler
      const user = await handleLoginWithDemo(
        account, 
        setCurrentUser, 
        setIsAuthenticated, 
        setIsLoggingIn, 
        callback
      );
      
      console.log("✅ Demo login successful:", account.email);
      return user;
    } catch (error) {
      console.error("❌ Demo login exception:", error);
      setIsLoggingIn(false);
      throw error;
    }
  };

  // Register new user
  const register = async (email: string, password: string, name: string, callback?: () => void): Promise<User> => {
    try {
      setIsLoggingIn(true);
      console.log("🔄 Registration attempt:", email);
      
      const user = await handleRegister(
        email,
        password,
        name,
        setCurrentUser,
        setIsAuthenticated,
        callback
      );
      
      console.log("✅ Registration successful:", email);
      return user;
    } catch (error) {
      console.error("❌ Registration exception:", error);
      setIsLoggingIn(false);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout with improved error handling
  const logout = async (callback?: () => void): Promise<void> => {
    console.log("🔄 Logout called from AuthProvider");
    setIsLoggingOut(true);
    
    try {
      // Use the dedicated logout function
      await executeLogout(
        setCurrentUser,
        setIsAuthenticated,
        setIsLoggingOut,
        callback
      );
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await handleResetPassword(email);
    } catch (error) {
      throw error;
    }
  };
  
  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole): boolean => {
    return authService.hasRole(currentUser, role);
  }, [currentUser]);
  
  // Get the primary role for display purposes
  const getUserPrimaryRole = useCallback((): UserRole => {
    return authService.getPrimaryRole(currentUser);
  }, [currentUser]);

  const contextValue = {
    currentUser,
    isAuthenticated,
    isLoading,
    isLoggingIn,
    isLoggingOut,
    authStateReady,
    login,
    loginWithDemo,
    register,
    logout,
    resetPassword,
    hasRole,
    getUserPrimaryRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
