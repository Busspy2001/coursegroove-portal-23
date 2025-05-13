
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, stats, enrolledCourses, achievements, refetch } = useUserData();
  const isMobile = useIsMobile();
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  // Show authentication warning instead of redirecting
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("⚠️ Utilisateur non authentifié sur le tableau de bord");
      setShowAuthWarning(true);
    }
  }, [isAuthenticated]);

  // Show role warning instead of redirecting
  const shouldShowRoleWarning = () => {
    return isAuthenticated && currentUser && 
      (currentUser.role === 'instructor' || currentUser.role === 'admin');
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const getRoleSpecificDashboard = () => {
    if (currentUser?.role === 'instructor') return "/instructor";
    if (currentUser?.role === 'admin') return "/admin";
    return "/dashboard";
  };

  // Authentication warning
  if (showAuthWarning) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Connexion requise</h2>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder à votre tableau de bord.
            </p>
            <Button onClick={handleLogin} className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
              Se connecter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Role warning (instead of redirect)
  if (shouldShowRoleWarning()) {
    const roleDashboard = getRoleSpecificDashboard();
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Tableau de bord spécifique</h2>
            <p className="text-muted-foreground mb-6">
              En tant que {currentUser?.role === 'instructor' ? 'instructeur' : 'administrateur'}, 
              vous disposez d'un tableau de bord spécifique.
            </p>
            <Button 
              onClick={() => navigate(roleDashboard)}
              className="bg-schoolier-teal hover:bg-schoolier-dark-teal mb-3"
            >
              Accéder à mon tableau de bord
            </Button>
            <div>
              <Button 
                variant="outline"
                onClick={() => toast({ 
                  title: "Information", 
                  description: "Vous pouvez rester sur cette page, mais certaines fonctionnalités pourraient ne pas être disponibles."
                })}
              >
                Rester sur cette page
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="flex flex-col min-h-screen pb-16 md:pb-0">
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
          </div>
        </SidebarInset>
        
        {isMobile && <BottomNavigation />}
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
