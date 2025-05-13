
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import BusinessLayout from "@/components/business-dashboard/BusinessLayout";
import BusinessOverview from "@/components/business-dashboard/overview/BusinessOverview";
import BusinessEmployees from "@/components/business-dashboard/employees/BusinessEmployees";
import BusinessDepartments from "@/components/business-dashboard/departments/BusinessDepartments";
import BusinessTrainings from "@/components/business-dashboard/trainings/BusinessTrainings";
import BusinessStatistics from "@/components/business-dashboard/statistics/BusinessStatistics";
import BusinessSettings from "@/components/business-dashboard/settings/BusinessSettings";
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
        <Route path="employees/*" element={<BusinessEmployees />} />
        <Route path="departments/*" element={<BusinessDepartments />} />
        <Route path="trainings/*" element={<BusinessTrainings />} />
        <Route path="statistics/*" element={<BusinessStatistics />} />
        <Route path="settings/*" element={<BusinessSettings />} />
        <Route path="*" element={<Navigate to="/business" replace />} />
      </Routes>
    </BusinessLayout>
  );
};

export default BusinessDashboard;
