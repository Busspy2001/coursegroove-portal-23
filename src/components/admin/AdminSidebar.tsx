
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { adminNavigation } from "./navigation/admin-nav-data";
import { 
  AdminNavGroup, 
  AdminSidebarHeader, 
  AdminSidebarFooter 
} from "./navigation";

interface AdminSidebarProps {
  onNavigate?: (path: string) => void;
}

const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const { currentUser, logout, isLoggingOut, getUserPrimaryRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      await logout(() => {
        navigate("/login?logout=true", { replace: true });
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  
  console.log("Admin navigation groups:", adminNavigation.map(g => g.label));
  
  return (
    <Sidebar>
      <AdminSidebarHeader 
        name={currentUser?.name || ""} 
        avatar={currentUser?.avatar} 
        role={getUserPrimaryRole()} 
      />
      
      <SidebarContent>
        {adminNavigation.map((group) => (
          <AdminNavGroup
            key={group.label}
            group={group}
            onNavigate={onNavigate}
          />
        ))}
      </SidebarContent>
      
      <AdminSidebarFooter onLogout={handleLogout} isLoggingOut={isLoggingOut} />
    </Sidebar>
  );
};

export default AdminSidebar;
