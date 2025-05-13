
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, User } from "./types";
import { mapSupabaseUser, clearUserCache } from "./authUtils";
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check for existing session on mount - optimisé
  useEffect(() => {
    console.log("🚀 Initialisation de l'AuthProvider");
    
    let authTimeout: number | undefined;
    
    // Set up auth state listener first to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Changement d'état d'authentification:", event);
      
      // Gérer le changement d'état d'authentification
      if (session) {
        try {
          // Utiliser setTimeout pour éviter les deadlocks potentiels
          setTimeout(async () => {
            console.log("✅ Session trouvée, récupération des données utilisateur");
            try {
              const mappedUser = await mapSupabaseUser(session.user);
              if (mappedUser) {
                console.log("👤 Données utilisateur récupérées, rôle:", mappedUser.role);
                setCurrentUser(mappedUser);
              }
            } catch (error) {
              console.error("❌ Erreur lors de la récupération des données utilisateur:", error);
              setCurrentUser(null);
            } finally {
              setLoading(false);
            }
          }, 0);
        } catch (error) {
          console.error("❌ Erreur lors de la récupération des données utilisateur:", error);
          setCurrentUser(null);
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log("🚪 Déconnexion détectée");
        setCurrentUser(null);
        clearUserCache();
        setLoading(false);
      }
    });

    // Utiliser un timeout pour éviter que la vérification bloque trop longtemps
    authTimeout = window.setTimeout(() => {
      if (loading && !initialCheckDone) {
        console.log("⏱️ Timeout de vérification atteint, passage en mode non authentifié");
        setLoading(false);
        setInitialCheckDone(true);
      }
    }, 2000); // 2 secondes maximum pour la vérification initiale

    // Then check for existing session
    const checkUser = async () => {
      try {
        console.log("🔍 Vérification de l'existence d'une session");
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("✅ Session existante trouvée");
          const mappedUser = await mapSupabaseUser(session.user);
          if (mappedUser) {
            setCurrentUser(mappedUser);
            console.log("👤 Utilisateur connecté avec le rôle:", mappedUser.role);
          }
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
      if (authTimeout) clearTimeout(authTimeout);
    };
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    console.log("🔑 Début du processus de connexion");
    setIsLoggingIn(true);
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
      setIsLoggingIn(false);
      setLoading(false);
    }
  };

  // Implement the missing loginWithDemo method
  const loginWithDemo = async (email: string, password: string) => {
    console.log("🔑 Début du processus de connexion avec compte de démonstration");
    setIsLoggingIn(true);
    setLoading(true);
    try {
      // We use the regular login method but mark it as a demo account
      const user = await authService.login(email, password, false);
      console.log("✅ Connexion démo réussie, utilisateur:", user);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("❌ Erreur lors de la connexion démo:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
      setLoading(false);
    }
  };

  const logout = async (callback?: () => void): Promise<void> => {
    try {
      if (isLoggingOut) return; // Éviter les doubles appels
      
      setIsLoggingOut(true);
      setLoading(true);
      console.log("🚪 Début du processus de déconnexion dans AuthProvider");
      
      // Vider l'état local et les caches avant la déconnexion Supabase
      setCurrentUser(null);
      clearUserCache();
      console.log("🧹 Nettoyage du cache utilisateur effectué");
      
      // Déconnexion Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erreur lors de la déconnexion:", error);
        throw error;
      }
      
      // Vérifier que la session est bien détruite
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.warn("⚠️ La session persiste après déconnexion, tentative de nettoyage forcé");
        localStorage.removeItem('supabase.auth.token');
      } else {
        console.log("✅ Session correctement détruite");
      }
      
      // Délai pour assurer la synchronisation complète
      setTimeout(() => {
        setLoading(false);
        setIsLoggingOut(false);
        console.log("✅ Déconnexion réussie et nettoyage terminé");
        
        // Exécuter le callback de redirection si fourni
        if (callback) {
          console.log("🔀 Exécution du callback de redirection");
          callback();
        }
      }, 300); // Délai de 300ms pour assurer la synchronisation
      
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion dans AuthProvider:", error);
      setLoading(false);
      setIsLoggingOut(false);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    isLoggingOut,
    isLoggingIn,
    login,
    loginWithDemo,
    register: authService.register,
    logout,
    resetPassword: authService.resetPassword,
    isAuthenticated: currentUser !== null && initialCheckDone,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
