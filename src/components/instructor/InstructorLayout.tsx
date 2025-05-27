
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
  const { currentUser, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Enhanced demo instructor detection
  const isDemoInstructor = currentUser?.is_demo && 
    (currentUser?.email?.toLowerCase().includes('prof') || 
     currentUser?.email?.toLowerCase() === 'prof@schoolier.com');
  
  // Enhanced instructor access check - prioritize demo detection
  const hasInstructorAccess = isDemoInstructor || hasRole("instructor");
  
  // States for authentication and role warnings
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);

  // Enhanced access control logic
  useEffect(() => {
    console.log("🔍 InstructorLayout - User check:", {
      email: currentUser?.email,
      is_demo: currentUser?.is_demo,
      roles: currentUser?.roles,
      isDemoInstructor,
      hasInstructorAccess,
      isAuthenticated
    });

    if (!isAuthenticated) {
      console.log("❌ InstructorLayout - Not authenticated");
      setShowAuthWarning(true);
      setShowRoleWarning(false);
      setIsLayoutLoading(false);
    } else if (!hasInstructorAccess) {
      console.log("❌ InstructorLayout - No instructor access");
      setShowAuthWarning(false);
      setShowRoleWarning(true);
      setIsLayoutLoading(false);
    } else {
      console.log("✅ InstructorLayout - Access granted");
      setShowAuthWarning(false);
      setShowRoleWarning(false);
      setIsLayoutLoading(false);
    }
  }, [isAuthenticated, hasInstructorAccess, currentUser, isDemoInstructor]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGoToDashboard = () => {
    navigate("/redirect");
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
            <p className="text-sm text-muted-foreground mb-4">
              Utilisateur actuel: {currentUser?.email} <br />
              Rôles: {currentUser?.roles?.join(', ') || 'aucun'} <br />
              Compte démo: {currentUser?.is_demo ? 'Oui' : 'Non'}
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

  // Show loading state only when explicitly passed as prop, not for layout initialization
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

  // Main instructor layout - only shown when access is granted
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
