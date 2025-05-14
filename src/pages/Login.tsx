
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";

// Components
import LoginForm from "@/components/auth/LoginForm";
import DemoAccounts from "@/components/auth/DemoAccounts";

const Login = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Gestion de la redirection après connexion
  useEffect(() => {
    if (isLoading) return;

    // Déterminer la destination en fonction du rôle de l'utilisateur
    if (currentUser && isAuthenticated) {
      let destination = "/dashboard";
      if (currentUser.role === 'instructor') {
        destination = "/instructor";
        console.log("👨‍🏫 Redirection vers le tableau de bord instructeur");
      } else if (currentUser.role === 'super_admin') {
        destination = "/admin";
        console.log("👨‍💼 Redirection vers le tableau de bord administrateur");
      } else if (currentUser.role === 'business_admin') {
        destination = "/entreprise"; // Mis à jour pour utiliser le chemin français
        console.log("🏢 Redirection vers le tableau de bord entreprise");
      } else {
        console.log("🎓 Redirection vers le tableau de bord étudiant");
      }

      // Rediriger l'utilisateur
      navigate(destination, { replace: true });
    }
  }, [currentUser, isAuthenticated, navigate, location, isLoading]);

  // Si l'utilisateur est déjà authentifié, le rediriger immédiatement
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      let destination = "/dashboard";
      if (currentUser.role === 'instructor') {
        destination = "/instructor";
      } else if (currentUser.role === 'super_admin') {
        destination = "/admin";
      } else if (currentUser.role === 'business_admin') {
        destination = "/entreprise"; // Mis à jour pour utiliser le chemin français
      }
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, currentUser]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">
          Connexion à Schoolier
        </h2>
        <LoginForm />
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
            Comptes de démonstration
          </h3>
          <DemoAccounts />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
