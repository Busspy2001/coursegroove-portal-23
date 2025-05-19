import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Auth pages
const AuthHome = lazy(() => import("@/pages/AuthHome"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const DemoRedirect = lazy(() => import("@/pages/DemoRedirect"));

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthHome />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/demo-redirect",
    element: <DemoRedirect />
  },
  // Routes d'inscription directe pour chaque profil
  {
    path: "/register/student",
    element: <Register />
  },
  {
    path: "/register/instructor",
    element: <Register />
  },
  {
    path: "/register/business",
    element: <Register />
  },
  {
    path: "/register/employee",
    element: <Register />
  }
];
