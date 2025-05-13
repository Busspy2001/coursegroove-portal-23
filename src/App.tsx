
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { Loader2 } from "lucide-react";
import { Layout } from "./components/layout/Layout";

// Import critical pages directly to avoid dynamic loading issues
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Directly import Dashboard

// Lazy load other components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const CourseProgress = lazy(() => import("./pages/CourseProgress"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const CourseCreation = lazy(() => import("./pages/CourseCreation")); 
const CourseEditor = lazy(() => import("./pages/CourseEditor"));
const Profile = lazy(() => import("./pages/Profile"));

// Instructor Dashboard Pages
const InstructorDashboard = lazy(() => import("./pages/instructor/InstructorDashboard"));
const InstructorCourses = lazy(() => import("./pages/instructor/InstructorCourses"));
const InstructorStudents = lazy(() => import("./pages/instructor/InstructorStudents"));
const InstructorReviews = lazy(() => import("./pages/instructor/InstructorReviews"));
const InstructorStats = lazy(() => import("./pages/instructor/InstructorStats"));
const InstructorEarnings = lazy(() => import("./pages/instructor/InstructorEarnings"));
const InstructorSettings = lazy(() => import("./pages/instructor/InstructorSettings"));
const InstructorSupport = lazy(() => import("./pages/instructor/InstructorSupport"));

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Admin User Management Pages
const AdminUsers = lazy(() => import("./pages/admin/users"));
const AdminUserActivity = lazy(() => import("./pages/admin/user-activity"));
const AdminUserReports = lazy(() => import("./pages/admin/user-reports"));

// Admin Business Pages
const AdminBusiness = lazy(() => import("./pages/admin/business"));
const AdminBusinessPlans = lazy(() => import("./pages/admin/business/plans"));
const AdminBusinessStatistics = lazy(() => import("./pages/admin/business/statistics"));

// Admin Finance Pages
const AdminFinance = lazy(() => import("./pages/admin/finance"));
const AdminFinanceRevenue = lazy(() => import("./pages/admin/finance/revenue"));
const AdminFinanceReports = lazy(() => import("./pages/admin/finance/reports"));

// Admin Statistics Pages
const AdminStatistics = lazy(() => import("./pages/admin/statistics"));
const AdminStatisticsInstructors = lazy(() => import("./pages/admin/statistics/instructors"));
const AdminStatisticsStudents = lazy(() => import("./pages/admin/statistics/students"));
const AdminStatisticsComparison = lazy(() => import("./pages/admin/statistics/comparison"));

// Admin Marketing Pages
const AdminMarketingEmails = lazy(() => import("./pages/admin/marketing/emails"));
const AdminMarketingPromotions = lazy(() => import("./pages/admin/marketing/promotions"));
const AdminMarketingAnnouncements = lazy(() => import("./pages/admin/marketing/announcements"));

// Admin Notifications Pages
const AdminNotifications = lazy(() => import("./pages/admin/notifications"));
const AdminNotificationsPreferences = lazy(() => import("./pages/admin/notifications/preferences"));

// Admin System Pages
const AdminSystem = lazy(() => import("./pages/admin/system"));
const AdminSystemLogs = lazy(() => import("./pages/admin/system/logs"));
const AdminSystemAlerts = lazy(() => import("./pages/admin/system/alerts"));

// General pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Business = lazy(() => import("./pages/Business"));
const Teach = lazy(() => import("./pages/Teach"));
const Categories = lazy(() => import("./pages/Categories"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Values = lazy(() => import("./pages/Values"));
const Instructors = lazy(() => import("./pages/Instructors"));

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Utiliser le Layout comme wrapper pour les routes */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/my-courses" element={<MyCourses />} />
                  <Route path="/my-courses/:courseId" element={<CourseProgress />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:courseId" element={<CourseDetails />} />
                  <Route path="/courses/create" element={<CourseCreation />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Instructor Routes */}
                  <Route path="/instructor" element={<InstructorDashboard />} />
                  <Route path="/instructor/courses" element={<InstructorCourses />} />
                  <Route path="/instructor/courses/create" element={<CourseCreation />} />
                  <Route path="/instructor/courses/edit/:courseId" element={<CourseEditor />} />
                  <Route path="/instructor/students" element={<InstructorStudents />} />
                  <Route path="/instructor/reviews" element={<InstructorReviews />} />
                  <Route path="/instructor/stats" element={<InstructorStats />} />
                  <Route path="/instructor/earnings" element={<InstructorEarnings />} />
                  <Route path="/instructor/settings" element={<InstructorSettings />} />
                  <Route path="/instructor/support" element={<InstructorSupport />} />
                  
                  {/* Admin Route */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* Admin Users Routes */}
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/user-activity" element={<AdminUserActivity />} />
                  <Route path="/admin/user-reports" element={<AdminUserReports />} />
                  
                  {/* Admin Business Routes */}
                  <Route path="/admin/business" element={<AdminBusiness />} />
                  <Route path="/admin/business/plans" element={<AdminBusinessPlans />} />
                  <Route path="/admin/business/statistics" element={<AdminBusinessStatistics />} />
                  
                  {/* Admin Finance Routes */}
                  <Route path="/admin/finance" element={<AdminFinance />} />
                  <Route path="/admin/finance/revenue" element={<AdminFinanceRevenue />} />
                  <Route path="/admin/finance/reports" element={<AdminFinanceReports />} />
                  
                  {/* Admin Statistics Routes */}
                  <Route path="/admin/statistics" element={<AdminStatistics />} />
                  <Route path="/admin/statistics/instructors" element={<AdminStatisticsInstructors />} />
                  <Route path="/admin/statistics/students" element={<AdminStatisticsStudents />} />
                  <Route path="/admin/statistics/comparison" element={<AdminStatisticsComparison />} />
                  
                  {/* Admin Marketing Routes */}
                  <Route path="/admin/marketing/emails" element={<AdminMarketingEmails />} />
                  <Route path="/admin/marketing/promotions" element={<AdminMarketingPromotions />} />
                  <Route path="/admin/marketing/announcements" element={<AdminMarketingAnnouncements />} />
                  
                  {/* Admin Notifications Routes */}
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                  <Route path="/admin/notifications/preferences" element={<AdminNotificationsPreferences />} />
                  
                  {/* Admin System Routes */}
                  <Route path="/admin/system" element={<AdminSystem />} />
                  <Route path="/admin/system/logs" element={<AdminSystemLogs />} />
                  <Route path="/admin/system/alerts" element={<AdminSystemAlerts />} />
                  
                  {/* General Routes */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/teach" element={<Teach />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/values" element={<Values />} />
                  <Route path="/instructors" element={<Instructors />} />
                  
                  {/* Nouvelles routes pour le tableau de bord étudiant */}
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
