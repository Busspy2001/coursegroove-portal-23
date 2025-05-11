
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const CourseProgress = lazy(() => import("./pages/CourseProgress"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const CourseCreation = lazy(() => import("./pages/CourseCreation")); 
const CourseEditor = lazy(() => import("./pages/CourseEditor"));
const Profile = lazy(() => import("./pages/Profile"));
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Business = lazy(() => import("./pages/Business"));

// Nouvelles pages du tableau de bord étudiant
const Certifications = lazy(() => import("./pages/Certifications"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Progress = lazy(() => import("./pages/Progress"));
const Messages = lazy(() => import("./pages/Messages"));
const Settings = lazy(() => import("./pages/Settings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/my-courses/:courseId" element={<CourseProgress />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/courses/create" element={<CourseCreation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/instructor" element={<InstructorDashboard />} />
              <Route path="/instructor/courses/create" element={<CourseEditor />} />
              <Route path="/instructor/courses/edit/:courseId" element={<CourseEditor />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/business" element={<Business />} />
              
              {/* Nouvelles routes pour le tableau de bord étudiant */}
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
