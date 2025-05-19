
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessLayout from "@/components/entreprise-dashboard/BusinessLayout";
import BusinessDashboard from "@/pages/entreprise/BusinessDashboard";
import BusinessEmployees from "@/components/entreprise-dashboard/employees/BusinessEmployees";
import BusinessDepartments from "@/components/business-dashboard/departments/BusinessDepartments";
import BusinessSettings from "@/components/business-dashboard/settings/BusinessSettings";

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
  // Redirect from English routes to French routes
  {
    path: "/business",
    element: <WithBusinessLayout><BusinessDashboard /></WithBusinessLayout>
  }
];
