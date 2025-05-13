
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin";
import { AdminHeader } from "@/components/admin";
import { AdminTabsContent } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";
import { useCommandPalette } from "@/hooks/use-command-palette";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const { setOpen: setCommandOpen, CommandPaletteDialog } = useCommandPalette();

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
  const userRole = currentUser?.role as UserRole;
  const userName = currentUser?.name || "";

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader role={userRole} name={userName} />
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2" 
          onClick={() => setCommandOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Recherche rapide</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <AdminTabsContent />
      </div>
      
      {/* Command Dialog for global search */}
      {CommandPaletteDialog}
    </AdminLayout>
  );
};

export default AdminDashboard;
