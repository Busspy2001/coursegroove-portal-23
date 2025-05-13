
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BusinessDashboard from "@/pages/business/BusinessDashboard";

// Business Routes
export const businessRoutes: RouteObject[] = [
  {
    path: "/business",
    element: <BusinessDashboard />
  },
  {
    path: "/business/*",
    element: <BusinessDashboard />
  }
];
