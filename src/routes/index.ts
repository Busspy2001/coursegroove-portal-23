
import { RouteObject } from "react-router-dom";
import { generalRoutes } from "./generalRoutes";
import { authRoutes } from "./authRoutes";
import { studentRoutes } from "./studentRoutes";
import { instructorRoutes } from "./instructorRoutes";
import { adminRoutes } from "./adminRoutes";
import businessRoutes from "./businessRoutes";
import employeeRoutes from "./employeeRoutes";

export const appRoutes: RouteObject[] = [
  ...generalRoutes,
  ...authRoutes,
  ...studentRoutes,
  ...instructorRoutes,
  ...adminRoutes,
  businessRoutes,
  employeeRoutes
];
