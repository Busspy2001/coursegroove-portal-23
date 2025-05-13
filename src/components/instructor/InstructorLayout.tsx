
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import InstructorBottomNavigation from "@/components/instructor/InstructorBottomNavigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface InstructorLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ 
  children, 
  loading = false 
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);

  // Show warnings instead of redirecting
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthWarning(true);
    } else if (currentUser?.role !== "instructor") {
      setShowRoleWarning(true);
    }
  }, [isAuthenticated, currentUser]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  // Authentication warning
  if (showAuthWarning) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Connexion requise</h2>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder au tableau de bord instructeur.
            </p>
            <Button onClick={handleLogin} className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
              Se connecter
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Role warning
  if (showRoleWarning) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Accès réservé aux instructeurs</h2>
            <p className="text-muted-foreground mb-6">
              Cette section est réservée aux utilisateurs ayant le rôle d'instructeur.
            </p>
            <Button 
              onClick={handleGoToDashboard}
              className="bg-schoolier-teal hover:bg-schoolier-dark-teal"
            >
              Retour au tableau de bord
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-4 md:px-6 py-4 md:py-8 flex-grow pb-20 md:pb-8">
            {children}
          </div>
          
          {!isMobile && <Footer />}
        </SidebarInset>
        
        <InstructorBottomNavigation />
      </div>
    </SidebarProvider>
  );
};

export default InstructorLayout;
