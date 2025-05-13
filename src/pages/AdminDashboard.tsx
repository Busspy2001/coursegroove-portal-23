
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin";
import { AdminHeader } from "@/components/admin";
import { AdminTabsNavigation } from "@/components/admin";
import { AdminTabsContent } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Search, ChevronRight } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setOpen: setCommandOpen, CommandPaletteDialog } = useCommandPalette();

  // Show warnings instead of redirecting
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      console.log("AdminDashboard - Authenticated:", isAuthenticated);
      console.log("AdminDashboard - Current user role:", currentUser?.role);
      
      if (!isAuthenticated) {
        console.log("Non authentifié, affichage de l'avertissement");
        setShowAuthWarning(true);
        setIsLoading(false);
        return;
      } 
      
      // Check if user has admin permissions (super_admin, admin, or business_admin)
      const validAdminRoles = ["super_admin", "admin", "business_admin"];
      const hasAdminPermission = currentUser?.role && validAdminRoles.includes(currentUser.role);
      
      if (!hasAdminPermission) {
        console.log(`Utilisateur avec rôle ${currentUser?.role} n'a pas accès à l'administration`);
        setShowRoleWarning(true);
        setIsLoading(false);
        return;
      }
      
      console.log(`Utilisateur admin confirmé: ${currentUser?.role}`);
      
      // Welcome toast for admin users
      toast({
        title: `Bienvenue, ${currentUser?.name || "Administrateur"}`,
        description: "Vous êtes connecté à l'interface d'administration de Schoolier.",
      });
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [isAuthenticated, currentUser, navigate]);

  const handleLogin = () => {
    navigate("/login", { state: { returnUrl: "/admin" } });
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-schoolier-teal mx-auto mb-4" />
            <h2 className="text-xl font-medium">Chargement du tableau de bord admin...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Authentication warning
  if (showAuthWarning) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="container flex-grow flex items-center justify-center py-12">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Connexion requise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-schoolier-teal animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Vous devez être connecté pour accéder au panneau d'administration.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button onClick={handleLogin} className="w-full bg-schoolier-teal hover:bg-schoolier-dark-teal">
                  Se connecter
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                
                <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Role warning
  if (showRoleWarning) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="container flex-grow flex items-center justify-center py-12">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-red-600 dark:text-red-400">Accès refusé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-muted-foreground">
                  Vous n'avez pas les autorisations nécessaires pour accéder au panneau d'administration.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={handleGoToDashboard}
                  className="w-full bg-schoolier-teal hover:bg-schoolier-dark-teal"
                >
                  Retour au tableau de bord
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Cast role to a valid UserRole when it's known to be a valid role at this point
  const userRole = currentUser?.role as UserRole;
  const userName = currentUser?.name || "";

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <AdminHeader role={userRole} name={userName} />
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 ml-auto" 
          onClick={() => setCommandOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Recherche rapide</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AdminTabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <AdminTabsContent />
        </Tabs>
      </div>
      
      {/* Command Dialog for global search */}
      {CommandPaletteDialog}
    </AdminLayout>
  );
};

export default AdminDashboard;
