import React, { useEffect, useState } from "react";
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
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [accessChecked, setAccessChecked] = useState(false);
  
  // Add timeout to prevent endless loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!accessChecked && verificationAttempts > 3) {
        console.log("🚨 BusinessAuthGuard: Timeout reached, forcing verification completion");
        setAccessChecked(true);
        
        if (!isAuthenticated || !currentUser) {
          console.log("🚫 BusinessAuthGuard: Access denied due to timeout - not authenticated");
          toast({
            title: "Session expirée",
            description: "Veuillez vous reconnecter pour accéder au tableau de bord entreprise.",
            variant: "destructive",
          });
          navigate("/login", { state: { returnUrl: "/entreprise" } });
        } else {
          console.log("✅ BusinessAuthGuard: Forcing access grant after timeout");
        }
      }
    }, 3000); // 3 seconds timeout
    
    return () => clearTimeout(timeoutId);
  }, [verificationAttempts, accessChecked, isAuthenticated, currentUser, navigate]);

  useEffect(() => {
    // Skip checks when still loading - but don't wait forever
    if (isLoading && verificationAttempts < 5) {
      console.log(`🔄 BusinessAuthGuard: Chargement en cours... (tentative ${verificationAttempts + 1})`);
      setVerificationAttempts(prev => prev + 1);
      return;
    }
    
    // More aggressive approach - if auth state is not ready after several attempts, force continue
    if (!authStateReady && verificationAttempts < 3) {
      console.log(`🔄 BusinessAuthGuard: État d'authentification non prêt (tentative ${verificationAttempts + 1})`);
      setVerificationAttempts(prev => prev + 1);
      
      // Add a delay to give auth state time to initialize
      const timer = setTimeout(() => {
        checkAccess();
      }, 800);
      
      return () => clearTimeout(timer);
    }

    // Check access regardless of auth state if we've made several attempts
    const checkAccess = () => {
      setAccessChecked(true);
      
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

    // If we haven't checked access yet, do it now
    if (!accessChecked) {
      checkAccess();
    }
  }, [isAuthenticated, currentUser, navigate, authStateReady, isLoading, hasRole, verificationAttempts, accessChecked]);

  // If we've checked access and we're still here, render children
  if (accessChecked) {
    return <>{children}</>;
  }

  // Otherwise show loading state
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-schoolier-teal" />
        <div className="text-lg font-semibold">Vérification de vos accès...</div>
        <div className="text-sm text-muted-foreground">
          {verificationAttempts > 2 ? "Cela prend plus de temps que prévu..." : "Merci de patienter un instant..."}
        </div>
      </div>
    </div>
  );
};
