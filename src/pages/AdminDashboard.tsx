
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Tabs } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  AdminLayout, 
  AdminHeader, 
  AdminTabsNavigation, 
  AdminTabsContent 
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types/database";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);

  // Show warnings instead of redirecting
  useEffect(() => {
    console.log("AdminDashboard - Authenticated:", isAuthenticated);
    console.log("AdminDashboard - Current user role:", currentUser?.role);
    
    if (!isAuthenticated) {
      console.log("Non authentifié, affichage de l'avertissement");
      setShowAuthWarning(true);
      return;
    } 
    
    // Check if user has admin permissions (super_admin, admin, or business_admin)
    const validAdminRoles = ["super_admin", "admin", "business_admin"];
    const hasAdminPermission = currentUser?.role && validAdminRoles.includes(currentUser.role);
    
    if (!hasAdminPermission) {
      console.log(`Utilisateur avec rôle ${currentUser?.role} n'a pas accès à l'administration`);
      setShowRoleWarning(true);
      return;
    }
    
    console.log(`Utilisateur admin confirmé: ${currentUser?.role}`);
    
    // Set super admin status for conditional rendering
    setIsSuperAdmin(currentUser.role === "super_admin");
    
    // Welcome toast for admin users
    toast({
      title: `Bienvenue, ${currentUser?.name || "Administrateur"}`,
      description: "Vous êtes connecté à l'interface d'administration de Schoolier.",
    });
    
  }, [isAuthenticated, currentUser, navigate]);

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
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Connexion requise</h2>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder au panneau d'administration.
            </p>
            <Button onClick={handleLogin} className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
              Se connecter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Role warning
  if (showRoleWarning) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Accès refusé</h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas les autorisations nécessaires pour accéder au panneau d'administration.
            </p>
            <Button 
              onClick={handleGoToDashboard}
              className="bg-schoolier-teal hover:bg-schoolier-dark-teal"
            >
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Cast role to a valid UserRole when it's known to be a valid role at this point
  const userRole = currentUser?.role || "student" as UserRole;
  const userName = currentUser?.name || "";

  return (
    <AdminLayout>
      <AdminHeader role={userRole} name={userName} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AdminTabsNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userRole={userRole} 
          />
          <AdminTabsContent />
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
