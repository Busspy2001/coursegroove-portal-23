
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
    // Skip checks when still loading
    if (isLoading || !authStateReady) {
      console.log("🔄 BusinessAuthGuard: Chargement en cours...");
      return;
    }

    const checkAccess = () => {
      // Check if user is authenticated
      if (!isAuthenticated || !currentUser) {
        console.log("🚫 BusinessAuthGuard: User not authenticated, redirecting to login");
        toast({
          title: "Accès refusé",
          description: "Vous devez être connecté pour accéder à cette page.",
          variant: "destructive",
        });
        navigate("/login", { state: { returnUrl: "/entreprise" } });
        return false;
      }

      // Check user's email for demo accounts (more reliable for demo accounts)
      const email = currentUser.email?.toLowerCase() || '';
      const isDemoBusinessAccount = 
        currentUser.is_demo && (email.includes('business') || email.includes('entreprise'));

      // Check if user is a business admin, employee or has demo access
      const isAllowed = 
        isDemoBusinessAccount || 
        hasRole('business_admin') || 
        hasRole('employee');

      if (!isAllowed) {
        console.log(`⚠️ BusinessAuthGuard: User roles not allowed`);
        toast({
          title: "Accès non autorisé",
          description: "Vous n'avez pas les autorisations nécessaires pour accéder au tableau de bord entreprise.",
          variant: "destructive",
        });
        // Redirect to role-specific page instead of dashboard
        if (hasRole('instructor')) {
          navigate("/instructor");
        } else if (hasRole('admin') || hasRole('super_admin')) {
          navigate("/admin");
        } else if (hasRole('student')) {
          navigate("/student");
        } else {
          navigate("/"); // Fallback to home page
        }
        return false;
      }

      console.log("✅ BusinessAuthGuard: Access granted for", currentUser.email);
      return true;
    };

    // Use a small delay to ensure auth state has stabilized
    const timer = setTimeout(() => {
      checkAccess();
    }, 200);

    return () => clearTimeout(timer);
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
