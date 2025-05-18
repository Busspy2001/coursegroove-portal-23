
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessDashboard from "@/pages/entreprise/BusinessDashboard";
import { Navigate } from "react-router-dom";

// Routes d'entreprise avec des URL en français
export const businessRoutes: RouteObject[] = [
  {
    path: "/entreprise/*",
    element: <BusinessDashboard />,
  },
  // Redirection des routes en anglais vers les routes en français
  {
    path: "/business",
    element: <Navigate to="/entreprise" replace />
  },
  {
    path: "/business/*",
    element: <Navigate to="/entreprise" replace />
  }
];
