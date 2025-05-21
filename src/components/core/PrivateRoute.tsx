
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { isLogoutActive } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  allowMultiple?: boolean;  // Allow access if the user has any of the required roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRoles = [],
  allowMultiple = true 
}) => {
  const { currentUser, isAuthenticated, isLoading, authStateReady, hasRole } = useAuth();
  const location = useLocation();

  // Show loading screen while auth state is not ready
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

  // Check if the user is logged out
  if (isLogoutActive) {
    console.log("🚫 PrivateRoute: Accès à une route protégée avec déconnexion active");
    return <Navigate to="/login?logout=true" replace />;
  }

  // Check if the user is authenticated
  if (!isAuthenticated || !currentUser) {
    console.log("🚫 PrivateRoute: Utilisateur non authentifié, redirection vers /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Detect demo accounts based on email or specific flag
  const isDemoInstructor = currentUser.is_demo && 
    currentUser.email?.toLowerCase().includes('prof');
  
  const isDemoAdmin = currentUser.is_demo && 
    currentUser.email?.toLowerCase().includes('admin');
  
  // Special handling for demo accounts
  if (requiredRoles.includes('instructor') && isDemoInstructor) {
    return <>{children}</>;
  }
  
  if ((requiredRoles.includes('admin') || requiredRoles.includes('super_admin')) && isDemoAdmin) {
    return <>{children}</>;
  }

  // Check if the user has the required role(s)
  if (requiredRoles.length > 0) {
    const hasRequiredRole = allowMultiple 
      ? requiredRoles.some(role => hasRole(role))  // Any role matches
      : requiredRoles.every(role => hasRole(role)); // All roles match
    
    if (!hasRequiredRole) {
      console.log("🚫 PrivateRoute: Utilisateur n'a pas les rôles requis");
      console.log(`Required: ${requiredRoles.join(', ')}, User has: ${currentUser.roles?.join(', ') || 'none'}`);
      
      // Redirect to the appropriate dashboard based on user role
      if (hasRole('instructor') || isDemoInstructor) {
        return <Navigate to="/instructor" replace />;
      } else if (hasRole('admin') || hasRole('super_admin')) {
        return <Navigate to="/admin" replace />;
      } else if (hasRole('business_admin')) {
        return <Navigate to="/entreprise" replace />;
      } else if (hasRole('employee')) {
        return <Navigate to="/employe" replace />;
      } else {
        return <Navigate to="/student" replace />;
      }
    }
  }

  // If everything is fine, display the protected content
  return <>{children}</>;
};

export default PrivateRoute;
