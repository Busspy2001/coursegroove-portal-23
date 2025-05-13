
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Instructor pages
const InstructorDashboard = lazy(() => import("@/pages/instructor/InstructorDashboard"));
const InstructorCourses = lazy(() => import("@/pages/instructor/InstructorCourses"));
const InstructorStudents = lazy(() => import("@/pages/instructor/InstructorStudents"));
const InstructorReviews = lazy(() => import("@/pages/instructor/InstructorReviews"));
const InstructorStats = lazy(() => import("@/pages/instructor/InstructorStats"));
const InstructorEarnings = lazy(() => import("@/pages/instructor/InstructorEarnings"));
const InstructorSettings = lazy(() => import("@/pages/instructor/InstructorSettings"));
const InstructorSupport = lazy(() => import("@/pages/instructor/InstructorSupport"));
const CourseCreation = lazy(() => import("@/pages/CourseCreation"));
const CourseEditor = lazy(() => import("@/pages/CourseEditor"));

export const instructorRoutes: RouteObject[] = [
  {
    path: "/instructor",
    element: <InstructorDashboard />
  },
  {
    path: "/instructor/courses",
    element: <InstructorCourses />
  },
  {
    path: "/instructor/courses/create",
    element: <CourseCreation />
  },
  {
    path: "/instructor/courses/edit/:courseId",
    element: <CourseEditor />
  },
  {
    path: "/instructor/students",
    element: <InstructorStudents />
  },
  {
    path: "/instructor/reviews",
    element: <InstructorReviews />
  },
  {
    path: "/instructor/stats",
    element: <InstructorStats />
  },
  {
    path: "/instructor/earnings",
    element: <InstructorEarnings />
  },
  {
    path: "/instructor/settings",
    element: <InstructorSettings />
  },
  {
    path: "/instructor/support",
    element: <InstructorSupport />
  }
];
