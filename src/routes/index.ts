
import { generalRoutes } from "./generalRoutes";
import { authRoutes } from "./authRoutes";
import { studentRoutes } from "./studentRoutes";
import { instructorRoutes } from "./instructorRoutes";
import { adminRoutes } from "./adminRoutes";
import { businessRoutes } from "./businessRoutes";
import { employeeRoutes } from "./employeeRoutes";
import { Route } from "react-router-dom";

// Combine all routes into a single array
export const appRoutes = [
  ...authRoutes,
  ...generalRoutes, 
  ...studentRoutes,
  ...instructorRoutes,
  ...adminRoutes,
  ...businessRoutes,
  ...employeeRoutes
];
