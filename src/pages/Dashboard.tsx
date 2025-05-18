
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { isLogoutActive } from "@/integrations/supabase/client";

// Components
import StudentDashboard from "./StudentDashboard";
import { Layout } from "@/components/layout/Layout";

const Dashboard = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication and redirect based on role
  useEffect(() => {
    if (isLoading) {
      // Still loading, wait for completion
      return;
    }

    // Si une déconnexion est active, rediriger vers la page de connexion
    if (isLogoutActive) {
      console.log("🚫 Dashboard: Accès au tableau de bord avec déconnexion active, redirection vers la page de connexion");
      navigate("/login?logout=true", { replace: true });
      return;
    }

    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être connecté pour accéder à votre tableau de bord.",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    // Afficher le rôle détecté pour le débogage
    console.log(`👤 Utilisateur authentifié: ${currentUser.email} (Rôle: ${currentUser.role})`);
    
    // Redirect based on role
    if (!location.pathname.includes('logout=true')) {
      switch (currentUser.role) {
        case "instructor":
          console.log("🚀 Redirection vers /instructor pour le rôle instructor");
          navigate("/instructor", { replace: true });
          break;
        case "admin":
        case "super_admin":
          console.log("🚀 Redirection vers /admin pour le rôle admin");
          navigate("/admin", { replace: true });
          break;
        case "business_admin":
          console.log("🚀 Redirection vers /entreprise pour le rôle business_admin");
          navigate("/entreprise", { replace: true });
          break;
        case "employee":
          console.log("🚀 Redirection vers /employee pour le rôle employee");
          navigate("/employee", { replace: true });
          break;
        case "student":
          // Déjà sur le bon tableau de bord
          console.log("✅ Déjà sur le dashboard étudiant");
          break;
        default:
          console.warn(`⚠️ Rôle non reconnu: ${currentUser.role}, utilisation du dashboard étudiant par défaut`);
      }
    } else {
      console.log("🛑 Redirection bloquée car déconnexion active");
      navigate("/login?logout=true", { replace: true });
    }
  }, [currentUser, isAuthenticated, isLoading, navigate, location.pathname]);

  // Show loading state
  if (isLoading || !isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">
          Chargement...
        </div>
      </div>
    );
  }

  // Only show StudentDashboard if we're still here and the user is a student
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
