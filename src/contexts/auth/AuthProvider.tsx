import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, User } from "./types";
import { mapSupabaseUser } from "./authUtils";
import { authService } from "./authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    console.log("🚀 Initialisation de l'AuthProvider");
    
    // Set up auth state listener first to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Changement d'état d'authentification:", event, session?.user?.id);
      
      if (session) {
        try {
          console.log("✅ Session trouvée, récupération des données utilisateur");
          const mappedUser = await mapSupabaseUser(session.user);
          console.log("👤 Données utilisateur récupérées:", mappedUser);
          setCurrentUser(mappedUser);
        } catch (error) {
          console.error("❌ Erreur lors de la récupération des données utilisateur:", error);
          setCurrentUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log("🚪 Déconnexion détectée");
        setCurrentUser(null);
      }
    });

    // Then check for existing session
    const checkUser = async () => {
      setLoading(true);
      try {
        console.log("🔍 Vérification de l'existence d'une session");
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("✅ Session existante trouvée:", session.user.id);
          const mappedUser = await mapSupabaseUser(session.user);
          setCurrentUser(mappedUser);
          console.log("👤 Utilisateur connecté:", mappedUser);
        } else {
          console.log("ℹ️ Aucune session existante trouvée");
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification de la session:", error);
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
        console.log("✅ Vérification initiale de l'authentification terminée");
      }
    };

    checkUser();
    
    return () => {
      console.log("🔄 Désinscription des événements d'authentification");
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    console.log("🔑 Début du processus de connexion");
    setLoading(true);
    try {
      const user = await authService.login(email, password, rememberMe);
      console.log("✅ Connexion réussie, utilisateur:", user);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("❌ Erreur lors de la connexion:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, isDemoAccount: boolean = false) => {
    setLoading(true);
    try {
      const user = await authService.register(name, email, password, isDemoAccount);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register: authService.register,
    logout: async () => {
      try {
        setLoading(true);
        await authService.logout();
        setCurrentUser(null);
      } catch (error) {
        console.error("❌ Erreur lors de la déconnexion:", error);
      } finally {
        setLoading(false);
      }
    },
    resetPassword: authService.resetPassword,
    isAuthenticated: currentUser !== null && initialCheckDone,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
