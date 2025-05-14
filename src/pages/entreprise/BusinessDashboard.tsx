
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

const BusinessDashboard = () => {
  const { currentUser } = useAuth();
  
  // Modification pour autoriser l'accès aux comptes de démo ou aux administrateurs d'entreprise
  const isAllowedRole = currentUser?.role === "business_admin" || 
                       currentUser?.role === "admin" || 
                       currentUser?.is_demo === true;
  
  // Vérifier si l'utilisateur a un rôle autorisé
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
