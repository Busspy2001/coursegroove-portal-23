
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { determineUserDashboard } from "@/contexts/auth/redirectionUtils";

const AuthRedirect: React.FC = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated || !currentUser) {
      console.log("User not authenticated, redirecting to /login");
      navigate("/login", { replace: true });
      return;
    }
    
    // Use centralized redirection logic
    const targetDashboard = determineUserDashboard(currentUser);
    
    console.log(`🎯 AuthRedirect - Redirecting to: ${targetDashboard}`);
    
    // Navigate to the determined dashboard
    navigate(targetDashboard, { replace: true });
    
    // Show appropriate welcome message
    const roleInfo = currentUser.is_demo ? "Compte Démo" : "Bienvenue";
    let welcomeMessage = "Vous êtes connecté à votre tableau de bord.";
    
    if (targetDashboard === "/instructor") {
      welcomeMessage = "Bienvenue sur votre tableau de bord instructeur.";
    } else if (targetDashboard === "/entreprise") {
      welcomeMessage = "Bienvenue sur votre tableau de bord entreprise.";
    } else if (targetDashboard === "/admin") {
      welcomeMessage = "Bienvenue sur votre tableau de bord administrateur.";
    } else if (targetDashboard === "/employee") {
      welcomeMessage = "Bienvenue sur votre tableau de bord employé.";
    } else {
      welcomeMessage = "Bienvenue sur votre tableau de bord étudiant.";
    }
    
    toast({
      title: roleInfo,
      description: welcomeMessage
    });
    
  }, [currentUser, isAuthenticated, isLoading, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin" />
        <p className="text-xl font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;
