
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
import { toast } from "@/hooks/use-toast";

const BusinessDashboard = () => {
  const { currentUser } = useAuth();
  
  // Vérifier si l'utilisateur est un administrateur d'entreprise
  if (!currentUser || currentUser.role !== "business_admin") {
    toast({
      title: "Accès refusé",
      description: "Vous devez être connecté en tant qu'administrateur d'entreprise pour accéder à ce tableau de bord.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  
  return (
    <BusinessLayout>
      <Routes>
        <Route index element={<BusinessOverview />} />
        <Route path="employes/*" element={<BusinessEmployees />} />
        <Route path="departements/*" element={<BusinessDepartments />} />
        <Route path="formations/*" element={<BusinessTrainings />} />
        <Route path="statistiques/*" element={<BusinessStatistics />} />
        <Route path="parametres/*" element={<BusinessSettings />} />
        <Route path="*" element={<Navigate to="/entreprise" replace />} />
      </Routes>
    </BusinessLayout>
  );
};

export default BusinessDashboard;
