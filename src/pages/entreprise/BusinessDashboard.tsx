
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import BusinessLayout from "@/components/entreprise-dashboard/BusinessLayout";
import BusinessOverview from "@/components/entreprise-dashboard/overview/BusinessOverview";
import BusinessEmployees from "@/components/entreprise-dashboard/employees/BusinessEmployees";
import BusinessDepartments from "@/components/entreprise-dashboard/departments/BusinessDepartments";
import BusinessTrainings from "@/components/entreprise-dashboard/trainings/BusinessTrainings";
import BusinessStatistics from "@/components/entreprise-dashboard/statistics/BusinessStatistics";
import BusinessSettings from "@/components/entreprise-dashboard/settings/BusinessSettings";
import BusinessBilling from "@/components/entreprise-dashboard/billing/BusinessBilling";
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/contexts/auth/types";
import { isLogoutActive } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const BusinessDashboard = () => {
  const { currentUser, isAuthenticated, isLoading, authStateReady } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  
  // Check logout state and authentication
  useEffect(() => {
    if (authStateReady && !isLoading) {
      // Check for logout state
      if (isLogoutActive || location.search.includes('logout=true')) {
        console.log("🚫 BusinessDashboard: Accès au tableau de bord entreprise avec déconnexion active, redirection vers la page de connexion");
        setRedirecting(true);
        navigate("/login?logout=true", { replace: true });
        return;
      }
      
      // Check authentication
      if (!isAuthenticated || !currentUser) {
        console.log("🚫 BusinessDashboard: Utilisateur non authentifié, redirection vers la page de connexion");
        setRedirecting(true);
        navigate("/login", { state: { returnUrl: location.pathname }, replace: true });
        return;
      }
      
      // Check role permissions
      if (!isAllowedRole(currentUser.role, currentUser.is_demo)) {
        console.log(`🚫 BusinessDashboard: Rôle ${currentUser.role} non autorisé, redirection vers le tableau de bord approprié`);
        setRedirecting(true);
        navigate("/demo-redirect", { replace: true }); // Use demo-redirect to handle role-based redirections
      }
    }
  }, [isAuthenticated, currentUser, isLoading, authStateReady, navigate, location]);
  
  // Modified to allow access to demo accounts or business admins
  const isAllowedRole = (role?: UserRole, isDemo?: boolean): boolean => {
    // Always allow business_admin role
    if (role === "business_admin") return true;
    
    // Allow demo accounts regardless of role
    if (isDemo === true) return true;
    
    // Allow super admins and regular admins
    if (role === "admin" || role === "super_admin") return true;
    
    // Otherwise, deny access
    return false;
  };
  
  // Show loading state when auth is being verified or redirecting
  if (isLoading || !authStateReady || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
          <p className="text-lg font-medium">
            {redirecting ? "Redirection en cours..." : "Vérification de l'authentification..."}
          </p>
        </div>
      </div>
    );
  }
  
  // Check if the user has permission and is not in logout process
  if (isLogoutActive) {
    return <Navigate to="/login?logout=true" replace />;
  }
  
  // Using the improved permission check
  if (!currentUser || !isAllowedRole(currentUser.role, currentUser.is_demo)) {
    toast({
      title: "Accès refusé",
      description: "Vous devez être connecté en tant qu'administrateur d'entreprise pour accéder à ce tableau de bord.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  
  console.log("Utilisateur autorisé à accéder au dashboard entreprise:", currentUser);
  
  return (
    <BusinessLayout>
      <Routes>
        <Route index element={<BusinessOverview />} />
        <Route path="employes/*" element={<BusinessEmployees />} />
        <Route path="departements/*" element={<BusinessDepartments />} />
        <Route path="formations/*" element={<BusinessTrainings />} />
        <Route path="statistiques/*" element={<BusinessStatistics />} />
        <Route path="facturation/*" element={<BusinessBilling />} />
        <Route path="parametres/*" element={<BusinessSettings />} />
        <Route path="*" element={<Navigate to="/entreprise" replace />} />
      </Routes>
    </BusinessLayout>
  );
};

export default BusinessDashboard;
