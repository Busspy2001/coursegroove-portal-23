
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessLayout from "@/components/entreprise-dashboard/BusinessLayout";

// Business pages
const BusinessDashboard = lazy(() => import("@/pages/entreprise/BusinessDashboard"));
const BusinessTrainings = lazy(() => import("@/components/entreprise-dashboard/trainings/BusinessTrainings"));
const BusinessAddTraining = lazy(() => import("@/components/entreprise-dashboard/trainings/BusinessAddTraining"));
const BusinessAssignTraining = lazy(() => import("@/components/entreprise-dashboard/trainings/BusinessAssignTraining"));
const BusinessStatistics = lazy(() => import("@/components/entreprise-dashboard/statistics/BusinessStatistics"));
const BusinessEmployees = lazy(() => import("@/components/entreprise-dashboard/employees/BusinessEmployees"));
const BusinessDepartments = lazy(() => import("@/components/entreprise-dashboard/departments/BusinessDepartments"));
const BusinessSettings = lazy(() => import("@/components/entreprise-dashboard/settings/BusinessSettings"));
const BusinessBilling = lazy(() => import("@/components/entreprise-dashboard/billing/BusinessBilling"));

export const businessRoutes: RouteObject[] = [
  {
    path: "/entreprise",
    element: <BusinessLayout />,
    children: [
      {
        path: "",
        element: <BusinessDashboard />
      },
      {
        path: "formations",
        element: <BusinessTrainings />
      },
      {
        path: "formations/ajouter",
        element: <BusinessAddTraining />
      },
      {
        path: "formations/assigner",
        element: <BusinessAssignTraining />
      },
      {
        path: "statistiques",
        element: <BusinessStatistics />
      },
      {
        path: "collaborateurs",
        element: <BusinessEmployees />
      },
      {
        path: "departements",
        element: <BusinessDepartments />
      },
      {
        path: "parametres",
        element: <BusinessSettings />
      },
      {
        path: "facturation",
        element: <BusinessBilling />
      }
    ]
  }
];
