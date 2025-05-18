
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { isLogoutActive } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Components
import StudentDashboard from "./StudentDashboard";
import { Layout } from "@/components/layout/Layout";

const Dashboard = () => {
  const { currentUser, isAuthenticated, isLoading, authStateReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);

  // Check authentication and redirect based on role
  useEffect(() => {
    // Only proceed when auth state is fully loaded and ready
    if (!authStateReady || isLoading) {
      return;
    }

    // Si une déconnexion est active, rediriger vers la page de connexion
    if (isLogoutActive || location.search.includes('logout=true')) {
      console.log("🚫 Dashboard: Accès au tableau de bord avec déconnexion active, redirection vers la page de connexion");
      setRedirecting(true);
      navigate("/login?logout=true", { replace: true });
      return;
    }

    if (!isAuthenticated || !currentUser) {
      console.log("🚫 Dashboard: Utilisateur non authentifié, redirection vers la page de connexion");
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être connecté pour accéder à votre tableau de bord.",
        variant: "destructive",
      });
      setRedirecting(true);
      navigate("/login", { state: { returnUrl: location.pathname }, replace: true });
      return;
    }

    // Afficher le rôle détecté pour le débogage
    console.log(`👤 Utilisateur authentifié: ${currentUser.email} (Rôle: ${currentUser.role})`);
    
    // Use a timeout to ensure state is settled before potentially redirecting
    const redirectTimeout = setTimeout(() => {
      // Redirect based on role if we're not on a logout page
      if (!location.pathname.includes('logout=true')) {
        switch (currentUser.role) {
          case "instructor":
            console.log("🚀 Redirection vers /instructor pour le rôle instructor");
            setRedirecting(true);
            navigate("/instructor", { replace: true });
            break;
          case "admin":
          case "super_admin":
            console.log("🚀 Redirection vers /admin pour le rôle admin");
            setRedirecting(true);
            navigate("/admin", { replace: true });
            break;
          case "business_admin":
            console.log("🚀 Redirection vers /entreprise pour le rôle business_admin");
            setRedirecting(true);
            navigate("/entreprise", { replace: true });
            break;
          case "employee":
            console.log("🚀 Redirection vers /employee pour le rôle employee");
            setRedirecting(true);
            navigate("/employee", { replace: true });
            break;
          case "student":
            // Déjà sur le bon tableau de bord
            console.log("✅ Déjà sur le dashboard étudiant");
            break;
          default:
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
                console.log("✅ Utilisation du dashboard étudiant pour le compte démo par défaut");
              }
            } else {
              console.warn(`⚠️ Rôle non reconnu: ${currentUser.role}, utilisation du dashboard étudiant par défaut`);
            }
        }
      } else {
        console.log("🛑 Redirection bloquée car déconnexion active");
        setRedirecting(true);
        navigate("/login?logout=true", { replace: true });
      }
    }, 300);
    
    return () => clearTimeout(redirectTimeout);
  }, [currentUser, isAuthenticated, isLoading, authStateReady, navigate, location.pathname]);

  // Show loading state
  if (isLoading || !authStateReady || redirecting || !isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
          <p className="text-lg font-medium">
            {redirecting ? "Redirection en cours..." : "Chargement..."}
          </p>
        </div>
      </div>
    );
  }

  // Only show StudentDashboard if we're still here and the user is a student or default to student dashboard
  // For other roles, redirection should have happened in the useEffect
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StudentDashboard />
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
