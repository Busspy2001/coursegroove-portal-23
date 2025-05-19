
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// This component replaces Dashboard.tsx as a central redirection point
// It analyzes the user's role and redirects them to the appropriate dashboard
const AuthRedirect = () => {
  const { currentUser, isAuthenticated, isLoading, authStateReady, hasRole, getUserPrimaryRole } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  // Check authentication and redirect based on role
  useEffect(() => {
    // Only proceed when auth state is fully loaded and ready
    if (!authStateReady || isLoading) {
      return;
    }

    if (!isAuthenticated || !currentUser) {
      console.log("🚫 AuthRedirect: Utilisateur non authentifié, redirection vers la page de connexion");
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être connecté pour accéder à votre tableau de bord.",
        variant: "destructive",
      });
      setRedirecting(true);
      navigate("/login", { replace: true });
      return;
    }

    // Afficher le rôle détecté pour le débogage
    console.log(`👤 Utilisateur authentifié: ${currentUser.email} (Rôle principal: ${getUserPrimaryRole()})`);
    
    // Use a timeout to ensure state is settled before redirecting
    const redirectTimeout = setTimeout(() => {
      // Redirect based on role
      if (hasRole('instructor')) {
        console.log("🚀 Redirection vers /instructor");
        setRedirecting(true);
        navigate("/instructor", { replace: true });
      } 
      else if (hasRole('super_admin') || hasRole('admin')) {
        console.log("🚀 Redirection vers /admin");
        setRedirecting(true);
        navigate("/admin", { replace: true });
      } 
      else if (hasRole('business_admin')) {
        console.log("🚀 Redirection vers /entreprise");
        setRedirecting(true);
        navigate("/entreprise", { replace: true });
      } 
      else if (hasRole('employee')) {
        console.log("🚀 Redirection vers /employee");
        setRedirecting(true);
        navigate("/employee", { replace: true });
      } 
      else if (hasRole('student')) {
        console.log("🚀 Redirection vers /student");
        setRedirecting(true);
        navigate("/student", { replace: true });
      }
      else {
        if (currentUser.is_demo) {
          // For demo users, determine appropriate dashboard based on email
          const email = currentUser.email?.toLowerCase() || '';
          if (email.includes('business') || email.includes('entreprise')) {
            console.log("🚀 Redirection vers /entreprise pour le compte démo d'entreprise");
            setRedirecting(true);
            navigate("/entreprise", { replace: true });
          } else if (email.includes('employee')) {
            console.log("🚀 Redirection vers /employee pour le compte démo d'employé");
            setRedirecting(true);
            navigate("/employee", { replace: true });
          } else if (email.includes('prof') || email.includes('instructor')) {
            console.log("🚀 Redirection vers /instructor pour le compte démo d'instructeur");
            setRedirecting(true);
            navigate("/instructor", { replace: true });
          } else if (email.includes('admin')) {
            console.log("🚀 Redirection vers /admin pour le compte démo d'admin");
            setRedirecting(true);
            navigate("/admin", { replace: true });
          } else {
            console.log("🚀 Redirection vers /student pour le compte démo étudiant");
            setRedirecting(true);
            navigate("/student", { replace: true });
          }
        } else {
          console.log("🚀 Redirection vers /student par défaut (aucun rôle spécifique trouvé)");
          setRedirecting(true);
          navigate("/student", { replace: true });
        }
      }
    }, 300);
    
    return () => clearTimeout(redirectTimeout);
  }, [currentUser, isAuthenticated, isLoading, authStateReady, navigate, hasRole, getUserPrimaryRole]);

  // Show loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
        <p className="text-lg font-medium">
          Redirection vers votre tableau de bord...
        </p>
      </div>
    </div>
  );
};

export default AuthRedirect;
