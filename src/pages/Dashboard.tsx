
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useUserData } from "@/hooks/use-user-data";
import { Loader2 } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCards from "@/components/dashboard/StatCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, stats, enrolledCourses, achievements, refetch } = useUserData();
  const isMobile = useIsMobile();

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Redirect to role-specific dashboard if needed
  useEffect(() => {
    if (currentUser?.role === 'instructor') {
      navigate('/instructor');
    } else if (currentUser?.role === 'admin') {
      navigate('/admin');
    }
    // For 'student' role we stay on this page
  }, [currentUser, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
          <p className="text-muted-foreground">Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        {!isMobile && <StudentSidebar />}
        
        <SidebarInset className="p-0">
          <motion.div 
            className="flex flex-col min-h-screen pb-16 md:pb-0"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center p-4 border-b">
              {!isMobile && <SidebarTrigger className="mr-4" />}
              <h1 className="text-xl font-semibold">Tableau de bord</h1>
            </div>
            
            <div className="container px-4 md:px-6 py-6 md:py-8 flex-grow">
              <DashboardHeader userName={currentUser?.name} />
              <StatCards stats={stats} />
              <DashboardTabs 
                enrolledCourses={enrolledCourses} 
                achievements={achievements}
                stats={stats}
              />
            </div>
            
            {!isMobile && <Footer />}
          </motion.div>
        </SidebarInset>
        
        {isMobile && <BottomNavigation />}
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
