
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BusinessAuthGuardProps {
  children: React.ReactNode;
}

export const BusinessAuthGuard: React.FC<BusinessAuthGuardProps> = ({ children }) => {
  const { currentUser, isAuthenticated, isLoading, authStateReady, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = () => {
      // Wait for auth state to be ready
      if (isLoading || !authStateReady) {
        return;
      }

      // Check if user is authenticated
      if (!isAuthenticated || !currentUser) {
        console.log("🚫 BusinessAuthGuard: User not authenticated, redirecting to login");
        navigate("/login", { state: { returnUrl: "/entreprise" } });
        return;
      }

      // Check if user is a business admin or employee (with demo accounts being allowed)
      const isAllowed = currentUser.is_demo || 
                       hasRole('business_admin') || 
                       hasRole('employee');

      if (!isAllowed) {
        console.log(`⚠️ BusinessAuthGuard: User roles not allowed`);
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les autorisations nécessaires pour accéder au tableau de bord entreprise.",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }

      console.log("✅ BusinessAuthGuard: Access granted for", currentUser.email);
    };

    checkAccess();
  }, [isAuthenticated, currentUser, navigate, authStateReady, isLoading, hasRole]);

  if (isLoading || !authStateReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-schoolier-teal" />
          <div className="text-lg font-semibold">Vérification de vos accès...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
