
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Student pages
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const MyCourses = lazy(() => import("@/pages/MyCourses"));
const CourseProgress = lazy(() => import("@/pages/CourseProgress"));
const StudentProfile = lazy(() => import("@/pages/StudentProfile"));
const CourseCreation = lazy(() => import("@/pages/CourseCreation")); 
const CourseEditor = lazy(() => import("@/pages/CourseEditor"));

// Student dashboard pages
const Certifications = lazy(() => import("@/pages/Certifications"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const Progress = lazy(() => import("@/pages/Progress"));
const Messages = lazy(() => import("@/pages/Messages"));
const Settings = lazy(() => import("@/pages/Settings"));

export const studentRoutes: RouteObject[] = [
  {
    path: "/student",
    element: <StudentDashboard />
  },
  {
    path: "/my-courses",
    element: <MyCourses />
  },
  {
    path: "/my-courses/:courseId",
    element: <CourseProgress />
  },
  {
    path: "/student/profile",
    element: <StudentProfile />
  },
  {
    path: "/courses/create",
    element: <CourseCreation />
  },
  {
    path: "/certifications",
    element: <Certifications />
  },
  {
    path: "/favorites",
    element: <Favorites />
  },
  {
    path: "/progress",
    element: <Progress />
  },
  {
    path: "/messages",
    element: <Messages />
  },
  {
    path: "/settings",
    element: <Settings />
  }
];
