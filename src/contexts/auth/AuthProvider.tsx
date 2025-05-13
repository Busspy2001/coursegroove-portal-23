import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, userCache } from "@/integrations/supabase/client";
import { AuthContextType, User, UserRole } from "./types";
import { mapSupabaseUser, clearUserCache } from "./authUtils";
import { authService } from "./authService";
import { toast } from "@/hooks/use-toast";

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

  // Optimized loginWithDemo method for faster redirection
  const loginWithDemo = async (email: string, password: string) => {
    console.log("🔑 Début du processus de connexion avec compte de démonstration");
    setIsLoggingIn(true);
    setLoading(true);
    
    // Determine demo role from email for faster processing
    let inferredRole;
    if (email.includes("prof")) inferredRole = "instructor";
    else if (email.includes("admin")) inferredRole = "admin";
    else if (email.includes("business")) inferredRole = "business_admin";
    else inferredRole = "student";
    
    console.log(`👤 Rôle pré-déterminé pour connexion rapide: ${inferredRole}`);
    
    // Direct Supabase login for better performance
    const { data, error } = await supabase.auth.signInWithPassword({
      email, 
      password
    });
    
    if (error) {
      console.error("❌ Erreur lors de la connexion démo:", error);
      throw error;
    }
    
    if (!data.user) {
      throw new Error("Utilisateur non trouvé");
    }
    
    // Fast path: construct user without DB queries
    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name || email.split('@')[0],
      role: inferredRole as UserRole,
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${email.split('@')[0]}&backgroundColor=0D9488`
    };
    
    // Cache for future access
    userCache.set(data.user.id, user);
    setCurrentUser(user);
    
    console.log("✅ Connexion démo réussie, utilisateur:", user.name, "role:", user.role);
    return user;
  };

  const logout = async (callback?: () => void): Promise<void> => {
    try {
      if (isLoggingOut) return; // Éviter les doubles appels
      
      setIsLoggingOut(true);
      setLoading(true);
      console.log("🚪 Début du processus de déconnexion dans AuthProvider");
      
      // Notification de déconnexion en cours
      toast({
        title: "Déconnexion en cours",
        description: "Veuillez patienter pendant la déconnexion...",
      });
      
      // Vider l'état local et les caches avant la déconnexion Supabase
      setCurrentUser(null);
      clearUserCache();
      console.log("🧹 Nettoyage du cache utilisateur effectué");
      
      // Déconnexion Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Erreur lors de la déconnexion:", error);
        toast({
          title: "Erreur de déconnexion",
          description: error.message || "Un problème est survenu lors de la déconnexion.",
          variant: "destructive",
        });
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
      
      // Notification de déconnexion réussie
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      
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

  const value: AuthContextType = {
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
