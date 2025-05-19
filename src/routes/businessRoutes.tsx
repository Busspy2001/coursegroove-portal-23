
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessLayout from "@/components/entreprise-dashboard/BusinessLayout";
import BusinessDashboard from "@/pages/entreprise/BusinessDashboard";
import BusinessEmployees from "@/components/entreprise-dashboard/employees/BusinessEmployees";
import BusinessDepartments from "@/components/entreprise-dashboard/departments/BusinessDepartments";
import BusinessSettings from "@/components/business-dashboard/settings/BusinessSettings";
import { BusinessTrainings } from "@/components/entreprise-dashboard/trainings/BusinessTrainings";
import { BusinessStatistics } from "@/components/entreprise-dashboard/statistics/BusinessStatistics";
import { BusinessBilling } from "@/components/entreprise-dashboard/billing/BusinessBilling";

// Use the BusinessLayout component for all business routes
const WithBusinessLayout = ({ children }: { children: React.ReactNode }) => (
  <BusinessLayout>{children}</BusinessLayout>
);

export const businessRoutes: RouteObject[] = [
  {
    path: "/entreprise",
    element: <WithBusinessLayout><BusinessDashboard /></WithBusinessLayout>
  },
  {
    path: "/entreprise/employes",
    element: <WithBusinessLayout><BusinessEmployees /></WithBusinessLayout>
  },
  {
    path: "/entreprise/departements",
    element: <WithBusinessLayout><BusinessDepartments /></WithBusinessLayout>
  },
  {
    path: "/entreprise/parametres",
    element: <WithBusinessLayout><BusinessSettings /></WithBusinessLayout>
  },
  {
    path: "/entreprise/formations",
    element: <WithBusinessLayout><BusinessTrainings /></WithBusinessLayout>
  },
  {
    path: "/entreprise/statistiques",
    element: <WithBusinessLayout><BusinessStatistics /></WithBusinessLayout>
  },
  {
    path: "/entreprise/facturation",
    element: <WithBusinessLayout><BusinessBilling /></WithBusinessLayout>
  },
  // Redirect from English routes to French routes
  {
    path: "/business",
    element: <WithBusinessLayout><BusinessDashboard /></WithBusinessLayout>
  }
];
