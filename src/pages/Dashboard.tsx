
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

// Components
import StudentDashboard from "./StudentDashboard";
import { Layout } from "@/components/layout/Layout";

const Dashboard = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être connecté pour accéder à votre tableau de bord.",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    // Redirect based on role
    if (currentUser.role === "instructor") {
      navigate("/instructor", { replace: true });
    } else if (currentUser.role === "super_admin" || currentUser.role === "admin") {
      navigate("/admin", { replace: true });
    } else if (currentUser.role === "business_admin") {
      navigate("/entreprise", { replace: true });
    }
  }, [currentUser, isAuthenticated, isLoading, navigate]);

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
