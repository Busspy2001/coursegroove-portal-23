
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Shield, BarChart, BookOpen, CreditCard, Bell, Settings } from "lucide-react";
import AdminGlobalDashboard from "@/components/admin/AdminGlobalDashboard";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminCourseModeration from "@/components/admin/AdminCourseModeration";
import AdminStatistics from "@/components/admin/AdminStatistics";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    console.log("AdminDashboard - Authenticated:", isAuthenticated);
    console.log("AdminDashboard - Current user role:", currentUser?.role);
    
    if (!isAuthenticated) {
      console.log("Non authentifié, redirection vers login");
      navigate("/login");
      return;
    } 
    
    // Check if user has admin permissions (super_admin, admin, or business_admin)
    const validAdminRoles = ["super_admin", "admin", "business_admin"];
    const hasAdminPermission = currentUser?.role && validAdminRoles.includes(currentUser.role);
    
    if (!hasAdminPermission) {
      console.log(`Utilisateur avec rôle ${currentUser?.role} n'a pas accès à l'administration`);
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les autorisations nécessaires pour accéder au panneau d'administration.",
        variant: "destructive"
      });
      navigate("/dashboard");
      return;
    }
    
    console.log(`Utilisateur admin confirmé: ${currentUser?.role}`);
    
    // Welcome toast for admin users
    toast({
      title: `Bienvenue, ${currentUser?.name || "Administrateur"}`,
      description: "Vous êtes connecté à l'interface d'administration de Schoolier.",
    });
    
  }, [isAuthenticated, currentUser, navigate]);

  // Return nothing during redirect
  if (!isAuthenticated || !currentUser?.role || !["super_admin", "admin", "business_admin"].includes(currentUser.role)) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 font-spartan">Espace Administration</h1>
        <p className="text-muted-foreground mb-6">
          {currentUser.role === "super_admin" ? 
            "Panneau d'administration complet avec tous les accès" : 
            currentUser.role === "business_admin" ? 
            "Administration des fonctionnalités Business" : 
            "Gestion modérée de la plateforme"}
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-8 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2 font-spartan">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2 font-spartan">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center space-x-2 font-spartan">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Cours</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="flex items-center space-x-2 font-spartan">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Modération</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center space-x-2 font-spartan">
                <CreditCard className="h-4 w-4" />
                <span className="hidden md:inline">Paiements</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2 font-spartan">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2 font-spartan">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Paramètres</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center space-x-2 font-spartan">
                <BarChart className="h-4 w-4" />
                <span className="hidden md:inline">Statistiques</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AdminGlobalDashboard />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUserManagement />
            </TabsContent>
            
            <TabsContent value="courses">
              <AdminCourseModeration />
            </TabsContent>
            
            <TabsContent value="moderation">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>La gestion de modération avancée sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="payments">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le tableau de bord des paiements sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>La gestion des notifications sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Les paramètres système seront disponibles prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="statistics">
              <AdminStatistics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
