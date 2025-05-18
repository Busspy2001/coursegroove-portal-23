
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// This component handles intelligent redirection for demo accounts
const DemoRedirect = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Allow a small delay for authentication state to stabilize
    const redirectTimer = setTimeout(() => {
      if (isLoading) {
        console.log("🕒 Attente de la vérification d'authentification...");
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
      
      // Log information for debugging
      console.log(`🧭 Redirection intelligente pour: ${currentUser.email} (${currentUser.role})`);
      
      // Redirect based on role
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
          console.warn(`⚠️ Rôle non reconnu: ${currentUser.role}, redirection vers le tableau de bord par défaut`);
          navigate("/dashboard", { replace: true });
      }
    }, 500); // Small delay to ensure authentication state is ready
    
    return () => clearTimeout(redirectTimer);
  }, [currentUser, isAuthenticated, isLoading, navigate]);
  
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
