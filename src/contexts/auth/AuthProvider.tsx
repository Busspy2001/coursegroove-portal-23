
import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './context';
import { User, UserRole } from './types';
import { supabase } from '@/integrations/supabase/client';
import { authService } from '@/services/auth-service';
import { toast } from '@/hooks/use-toast';

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
      
      const user = await authService.login(email, password);
      
      console.log("✅ Login successful:", email);
      
      // Execute callback if provided
      if (callback) callback();
      
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
      
      // For demo accounts, just use normal login
      const user = await authService.login(account.email, account.password || 'password123');
      
      console.log("✅ Demo login successful:", account.email);
      
      // Execute callback if provided
      if (callback) callback();
      
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
      
      const user = await authService.register(email, password, name);
      
      console.log("✅ Registration successful:", email);
      
      // Execute callback if provided
      if (callback) callback();
      
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
      
      await authService.logout();
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      // Execute callback if provided
      if (callback) callback();
      
      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive"
      });
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
      
      toast({
        title: "Email de réinitialisation envoyé",
        description: "Consultez votre boîte mail pour réinitialiser votre mot de passe"
      });
    } catch (error: any) {
      console.error("❌ Password reset exception:", error);
      toast({
        title: "Erreur de réinitialisation",
        description: error.message || "Une erreur s'est produite lors de l'envoi de l'email",
        variant: "destructive"
      });
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
