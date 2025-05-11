
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  PlusCircle,
  Users,
  MessageSquare,
  BarChart2,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { authService } from "@/contexts/auth/authService";

const InstructorSidebar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    {
      icon: Home,
      label: "Accueil",
      path: "/instructor",
      description: "Vue d'ensemble"
    },
    {
      icon: BookOpen,
      label: "Mes cours",
      path: "/instructor/courses",
      description: "Gérer vos cours"
    },
    {
      icon: PlusCircle,
      label: "Créer un cours",
      path: "/instructor/courses/create",
      description: "Ajouter un nouveau cours"
    },
    {
      icon: Users,
      label: "Étudiants",
      path: "/instructor/students",
      description: "Gérer vos étudiants"
    },
    {
      icon: MessageSquare,
      label: "Avis & feedback",
      path: "/instructor/reviews",
      description: "Vos retours d'utilisateurs"
    },
    {
      icon: BarChart2,
      label: "Performances",
      path: "/instructor/stats",
      description: "Statistiques détaillées"
    },
    {
      icon: DollarSign,
      label: "Revenus",
      path: "/instructor/earnings",
      description: "Gérer vos revenus"
    },
    {
      icon: Settings,
      label: "Paramètres",
      path: "/instructor/settings",
      description: "Profil et préférences"
    },
    {
      icon: HelpCircle,
      label: "Support",
      path: "/instructor/support",
      description: "Aide et ressources"
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar variant="floating" className="z-30">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.name || "Instructor"} />
            <AvatarFallback className="bg-schoolier-teal text-white">
              {currentUser?.name?.charAt(0) || "I"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <h3 className="font-medium leading-none">
              {currentUser?.name || "Instructor"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {currentUser?.email || "instructor@schoolier.com"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)} 
                    isActive={isActive(item.path)}
                    tooltip={item.description}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 justify-start" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default InstructorSidebar;
