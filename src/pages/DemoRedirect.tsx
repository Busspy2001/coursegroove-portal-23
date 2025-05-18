
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ensureDemoAccountsExist } from "@/components/auth/demo/initDemoAccounts";

// This component handles intelligent redirection for demo accounts
const DemoRedirect = () => {
  const { currentUser, isAuthenticated, isLoading, authStateReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  
  useEffect(() => {
    // First, ensure demo accounts are properly set up
    const setupDemoAccounts = async () => {
      try {
        await ensureDemoAccountsExist();
      } catch (error) {
        console.error("Error setting up demo accounts:", error);
      }
    };
    
    setupDemoAccounts();
    
    // Only proceed with redirection when auth state is ready
    if (!authStateReady) {
      console.log("🕒 Attente de la stabilisation de l'état d'authentification...");
      return;
    }
    
    if (isLoading) {
      console.log("🕒 Attente de la vérification d'authentification...");
      return;
    }
    
    if (redirectAttempts > 5) {
      console.log("⚠️ Nombre maximum de tentatives de redirection atteint, redirection vers la page d'accueil");
      toast({
        title: "Problème de redirection",
        description: "Un problème est survenu lors de la redirection. Veuillez réessayer.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
      return;
    }
    
    if (!isAuthenticated || !currentUser) {
      console.log("🚫 Utilisateur non authentifié, redirection vers la page de login");
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour continuer.",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }
    
    // Limiter le risque de boucles infinies
    setRedirectAttempts(prev => prev + 1);
    
    // Log information for debugging
    console.log(`🧭 Redirection intelligente pour: ${currentUser.email} (${currentUser.role})`);
    
    // Use a small timeout to ensure stable state before redirection
    const redirectTimer = setTimeout(() => {
      // Redirect based on role with replace: true to prevent back button issues
      switch(currentUser.role) {
        case "student":
          console.log("🏫 Redirection vers le tableau de bord étudiant");
          navigate("/dashboard", { replace: true });
          break;
        case "instructor":
          console.log("👨‍🏫 Redirection vers le tableau de bord instructeur");
          navigate("/instructor", { replace: true });
          break;
        case "admin":
        case "super_admin":
          console.log("👑 Redirection vers le tableau de bord administrateur");
          navigate("/admin", { replace: true });
          break;
        case "business_admin":
          console.log("🏢 Redirection vers le tableau de bord entreprise");
          navigate("/entreprise", { replace: true });
          break;
        case "employee":
          console.log("👔 Redirection vers le tableau de bord employé");
          navigate("/employee", { replace: true });
          break;
        default:
          // If the user has is_demo flag, try to route them based on email
          if (currentUser.is_demo) {
            const email = currentUser.email?.toLowerCase();
            if (email?.includes('business') || email?.includes('entreprise')) {
              console.log("🏢 Redirection d'un utilisateur demo vers le tableau de bord entreprise");
              navigate("/entreprise", { replace: true });
            } else if (email?.includes('employee')) {
              console.log("👔 Redirection d'un utilisateur demo vers le tableau de bord employé");
              navigate("/employee", { replace: true });
            } else {
              console.log("🏫 Redirection par défaut vers le tableau de bord étudiant");
              navigate("/dashboard", { replace: true });
            }
          } else {
            console.warn(`⚠️ Rôle non reconnu: ${currentUser.role}, redirection vers le tableau de bord par défaut`);
            navigate("/dashboard", { replace: true });
          }
      }
    }, 300); // Small delay to ensure authentication state is ready
    
    return () => clearTimeout(redirectTimer);
  }, [currentUser, isAuthenticated, isLoading, authStateReady, navigate, redirectAttempts]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <Loader2 className="h-12 w-12 animate-spin text-schoolier-teal mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Redirection en cours</h2>
        <p className="text-muted-foreground mb-4">
          Nous vous redirigeons vers votre tableau de bord...
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-schoolier-teal h-2.5 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DemoRedirect;
