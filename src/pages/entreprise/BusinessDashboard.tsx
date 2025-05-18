
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
  
  // Vérifier l'état de déconnexion
  useEffect(() => {
    if (isLogoutActive || location.search.includes('logout=true')) {
      console.log("🚫 BusinessDashboard: Accès au tableau de bord entreprise avec déconnexion active, redirection vers la page de connexion");
      navigate("/login?logout=true", { replace: true });
    }
  }, [location, navigate]);
  
  // Modification pour autoriser l'accès aux comptes de démo ou aux administrateurs d'entreprise
  const isAllowedRole = currentUser?.role === "business_admin" || 
                       currentUser?.role === "admin" || 
                       currentUser?.role === "super_admin" || 
                       currentUser?.is_demo === true;
  
  // Vérifier si l'utilisateur a un rôle autorisé et qu'il n'y a pas de déconnexion active
  if (isLogoutActive) {
    return <Navigate to="/login?logout=true" replace />;
  }
  
  if (!currentUser || !isAllowedRole) {
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
