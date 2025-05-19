
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { isLogoutActive } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { currentUser, isAuthenticated, isLoading, authStateReady, hasRole } = useAuth();
  const location = useLocation();

  // Montrer un écran de chargement tant que l'état d'authentification n'est pas prêt
  if (isLoading || !authStateReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
          <div className="text-lg font-medium">Vérification de l'authentification...</div>
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
  if (requiredRoles.length > 0 && !requiredRoles.some(role => hasRole(role))) {
    console.log("🚫 PrivateRoute: Utilisateur n'a pas les rôles requis, redirection vers /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // Si tout est en ordre, afficher le contenu protégé
  return <>{children}</>;
};

export default PrivateRoute;
