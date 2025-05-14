
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessDashboard from "@/pages/entreprise/BusinessDashboard";
import { Navigate } from "react-router-dom";

// Business Routes with French URL paths
export const businessRoutes: RouteObject[] = [
  {
    path: "/entreprise/*",
    element: <BusinessDashboard />,
  },
  // Redirect from English route to French route
  {
    path: "/business",
    element: <Navigate to="/entreprise" replace />
  },
  {
    path: "/business/*",
    element: <Navigate to="/entreprise" replace />
  }
];
