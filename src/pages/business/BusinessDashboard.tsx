
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";

const BusinessDashboard = () => {
  const { currentUser, hasRole } = useAuth();
  
  console.log("BusinessDashboard: Loading with user", currentUser);
  
  // Vérifier si l'utilisateur est un administrateur d'entreprise
  if (!currentUser || !hasRole("business_admin")) {
    toast({
      title: "Accès refusé",
      description: "Vous devez être connecté en tant qu'administrateur d'entreprise pour accéder à ce tableau de bord.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  
  // Le composant BusinessLayout est maintenant configuré pour utiliser Outlet via routes
  // Donc nous n'avons pas besoin de passer des enfants
  return <Navigate to="/entreprise" replace />;
};

export default BusinessDashboard;
