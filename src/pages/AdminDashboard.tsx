
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

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

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
    
    // Set super admin status for conditional rendering
    setIsSuperAdmin(currentUser.role === "super_admin");
    
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
    <AdminLayout>
      <AdminHeader role={currentUser.role} name={currentUser.name} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AdminTabsNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userRole={currentUser.role} 
          />
          <AdminTabsContent />
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
