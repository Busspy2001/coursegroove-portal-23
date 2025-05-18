import React, { useEffect } from "react";
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

const BusinessDashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check logout state
  useEffect(() => {
    if (isLogoutActive || location.search.includes('logout=true')) {
      console.log("🚫 BusinessDashboard: Accès au tableau de bord entreprise avec déconnexion active, redirection vers la page de connexion");
      navigate("/login?logout=true", { replace: true });
    }
  }, [location, navigate]);
  
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
