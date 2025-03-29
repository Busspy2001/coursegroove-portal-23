
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "admin") {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord d'administration</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Bienvenue dans l'espace administrateur</h2>
          <p className="text-muted-foreground mb-8">
            Le tableau de bord d'administration sera bientôt disponible avec toutes les fonctionnalités pour gérer la plateforme.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au tableau de bord
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
