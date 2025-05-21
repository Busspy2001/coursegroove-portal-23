
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  User, 
  LogOut,
  Loader2,
  ClipboardCheck,
  GraduationCap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EmployeeSidebar = () => {
  const { currentUser, logout, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const handleLogout = async () => {
    try {
      if (isLoggingOut) return;
      
      await logout(() => {
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès.",
        });
        navigate("/login?logout=true", { replace: true });
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };
  
  const getInitials = (name: string = "Employé") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const menuItems = [
    {
      title: "Tableau de bord",
      path: "/employee",
      icon: LayoutDashboard
    },
    {
      title: "Mes formations",
      path: "/employee/formations",
      icon: BookOpen
    },
    {
      title: "Catalogue",
      path: "/employee/catalogue",
      icon: GraduationCap
    },
    {
      title: "Mes évaluations",
      path: "/employee/evaluations",
      icon: ClipboardCheck
    },
    {
      title: "Certifications",
      path: "/employee/certifications",
      icon: Award
    },
    {
      title: "Mon profil",
      path: "/employee/profil",
      icon: User
    }
  ];

  // Handle both name formats (name and full_name)
  const userName = currentUser?.full_name || currentUser?.name || "Employé";
  const userAvatar = currentUser?.avatar_url || currentUser?.avatar;

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-start items-center p-4 bg-gray-50 dark:bg-gray-800">
        <Avatar className="h-10 w-10 mr-2 bg-schoolier-teal">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {userName}
          </span>
          <span className="text-xs text-muted-foreground">Employé</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50 dark:bg-gray-800">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                onClick={() => navigate(item.path)}
                tooltip={item.title}
                isActive={isActive(item.path)}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-gray-50 dark:bg-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {isLoggingOut ? "Déconnexion en cours..." : "Se déconnecter"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default EmployeeSidebar;
