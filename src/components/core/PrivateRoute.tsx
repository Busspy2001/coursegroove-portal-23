
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { isLogoutActive } from "@/integrations/supabase/client";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">
          Vérification de l'authentification...
        </div>
      </div>
    );
  }

  // Vérifier si l'utilisateur est déconnecté
  if (isLogoutActive) {
    console.log("🚫 PrivateRoute: Accès à une route protégée avec déconnexion active");
    return <Navigate to="/login?logout=true" replace />;
  }

  // Vérifier si l'utilisateur est authentifié
  if (!isAuthenticated || !currentUser) {
    console.log("🚫 PrivateRoute: Utilisateur non authentifié, redirection vers /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (requiredRoles.length > 0 && currentUser.role && !requiredRoles.includes(currentUser.role)) {
    console.log("🚫 PrivateRoute: Utilisateur n'a pas les rôles requis, redirection vers /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // Si tout est en ordre, afficher le contenu protégé
  return <>{children}</>;
};

export default PrivateRoute;
