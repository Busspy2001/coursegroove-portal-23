
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Import critical pages directly to avoid dynamic loading issues
import Dashboard from "@/pages/Dashboard";

// General pages
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Faq = lazy(() => import("@/pages/Faq"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Business = lazy(() => import("@/pages/Business"));
const Teach = lazy(() => import("@/pages/Teach"));
const Categories = lazy(() => import("@/pages/Categories"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Values = lazy(() => import("@/pages/Values"));
const Instructors = lazy(() => import("@/pages/Instructors"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetails = lazy(() => import("@/pages/CourseDetails"));
const Profile = lazy(() => import("@/pages/Profile"));

export const generalRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/faq",
    element: <Faq />
  },
  {
    path: "/blog",
    element: <Blog />
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />
  },
  {
    path: "/business",
    element: <Business />
  },
  {
    path: "/teach",
    element: <Teach />
  },
  {
    path: "/categories",
    element: <Categories />
  },
  {
    path: "/testimonials",
    element: <Testimonials />
  },
  {
    path: "/values",
    element: <Values />
  },
  {
    path: "/instructors",
    element: <Instructors />
  },
  {
    path: "/courses",
    element: <Courses />
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetails />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
