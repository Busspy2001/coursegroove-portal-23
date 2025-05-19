
import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './context';
import { User, UserRole } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentUser, logoutUser } from './authService';
import { clearUserCache } from './authUtils';

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
    // Setting up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("🔒 User signed out");
        setCurrentUser(null);
        setIsAuthenticated(false);
        clearUserCache();
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user?.id) {
          console.log("🔑 User authenticated, fetching profile");
          setIsLoading(true);
          
          try {
            // Use setTimeout to prevent potential recursion issues
            setTimeout(async () => {
              const user = await getCurrentUser();
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
        const user = await getCurrentUser();
        
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("❌ Login error:", error.message);
        throw error;
      }
      
      if (!data.user) {
        console.error("❌ Login failed: No user returned");
        throw new Error("Login failed");
      }
      
      console.log("✅ Login successful:", email);
      
      // The user will be set by the auth state change listener
      if (callback) callback();
      
      // We need to fetch the user here because the auth state listener might not have fired yet
      const user = await getCurrentUser();
      if (!user) {
        throw new Error("Failed to get user profile after login");
      }
      return user;
    } catch (error) {
      console.error("❌ Login exception:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Login with demo account
  const loginWithDemo = async (account: any, callback?: () => void): Promise<User> => {
    try {
      setIsLoggingIn(true);
      console.log("🎭 Demo login attempt:", account.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password || 'password123'
      });
      
      if (error) {
        console.error("❌ Demo login error:", error.message);
        throw error;
      }
      
      if (!data.user) {
        console.error("❌ Demo login failed: No user returned");
        throw new Error("Demo login failed");
      }
      
      console.log("✅ Demo login successful:", account.email);
      
      // The user will be set by the auth state change listener
      if (callback) callback();
      
      // We need to fetch the user here because the auth state listener might not have fired yet
      const user = await getCurrentUser();
      if (!user) {
        throw new Error("Failed to get user profile after demo login");
      }
      return user;
    } catch (error) {
      console.error("❌ Demo login exception:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Register new user
  const register = async (email: string, password: string, name: string, callback?: () => void): Promise<User> => {
    try {
      setIsLoggingIn(true);
      console.log("🔄 Registration attempt:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            full_name: name
          }
        }
      });
      
      if (error) {
        console.error("❌ Registration error:", error.message);
        throw error;
      }
      
      if (!data.user) {
        console.error("❌ Registration failed: No user returned");
        throw new Error("Registration failed");
      }
      
      console.log("✅ Registration successful:", email);
      
      // The user will be set by the auth state change listener
      if (callback) callback();
      
      // We need to fetch the user here because the auth state listener might not have fired yet
      const user = await getCurrentUser();
      if (!user) {
        throw new Error("Failed to get user profile after registration");
      }
      return user;
    } catch (error) {
      console.error("❌ Registration exception:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout
  const logout = async (callback?: () => void): Promise<void> => {
    try {
      setIsLoggingOut(true);
      console.log("🔄 Logout attempt");
      
      await logoutUser();
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      clearUserCache();
      
      console.log("✅ Logout successful");
      
      if (callback) callback();
    } catch (error) {
      console.error("❌ Logout error:", error);
      throw error;
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      console.log("🔄 Password reset attempt:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      
      if (error) {
        console.error("❌ Password reset error:", error.message);
        throw error;
      }
      
      console.log("✅ Password reset email sent to:", email);
    } catch (error) {
      console.error("❌ Password reset exception:", error);
      throw error;
    }
  };
  
  // Check if user has a specific role - new function for multi-role support
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!currentUser || !currentUser.roles) return false;
    return currentUser.roles.includes(role);
  }, [currentUser]);
  
  // Get the primary role for display purposes
  const getUserPrimaryRole = useCallback((): UserRole => {
    if (!currentUser || !currentUser.roles || currentUser.roles.length === 0) {
      return 'student';
    }
    
    // Priority order for primary role
    const rolePriority: UserRole[] = ['super_admin', 'admin', 'business_admin', 'instructor', 'employee', 'student'];
    
    for (const role of rolePriority) {
      if (currentUser.roles.includes(role)) {
        return role;
      }
    }
    
    return currentUser.roles[0];
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
