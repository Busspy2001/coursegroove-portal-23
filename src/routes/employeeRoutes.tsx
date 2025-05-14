
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import EmployeeProfile from "@/pages/employee/EmployeeProfile";
import EmployeeCourses from "@/pages/employee/EmployeeCourses";
import EmployeeCatalog from "@/pages/employee/EmployeeCatalog";
import EmployeeCertifications from "@/pages/employee/EmployeeCertifications";

export const employeeRoutes: RouteObject[] = [
  {
    path: "/employe",
    element: <EmployeeDashboard />
  },
  {
    path: "/employe/profil",
    element: <EmployeeProfile />
  },
  {
    path: "/employe/formations",
    element: <EmployeeCourses />
  },
  {
    path: "/employe/catalogue",
    element: <EmployeeCatalog />
  },
  {
    path: "/employe/certifications",
    element: <EmployeeCertifications />
  },
  // Redirect from English route to French route
  {
    path: "/employee",
    element: <Navigate to="/employe" replace />
  }
];
