
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  Award,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

const EmployeeSidebar = () => {
  const { currentUser, logout, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
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

  // Employee menu items
  const menuGroups = [
    {
      label: "Formation",
      items: [
        {
          title: "Tableau de bord",
          path: "/employe",
          icon: LayoutDashboard,
          tooltip: "Vue d'ensemble de votre espace"
        },
        {
          title: "Profil",
          path: "/employe/profil",
          icon: User,
          tooltip: "Gérer votre profil et informations"
        },
        {
          title: "Mes formations",
          path: "/employe/formations",
          icon: BookOpen,
          tooltip: "Accéder à vos formations en cours"
        }
      ]
    },
    {
      label: "Apprentissage",
      items: [
        {
          title: "Catalogue",
          path: "/employe/catalogue",
          icon: GraduationCap,
          tooltip: "Découvrir de nouvelles formations"
        },
        {
          title: "Certifications",
          path: "/employe/certifications",
          icon: Award,
          tooltip: "Gérer vos certifications"
        }
      ]
    }
  ];

  // User data
  const userName = currentUser?.full_name || currentUser?.name || "Employé";
  const userAvatar = currentUser?.avatar_url || currentUser?.avatar;
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-start items-center p-4 bg-white dark:bg-gray-900 border-b">
        <Avatar className="h-10 w-10 mr-3 bg-schoolier-blue">
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
      
      <SidebarContent className="bg-white dark:bg-gray-900 py-2">
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      tooltip={item.tooltip}
                      isActive={isActive(item.path)}
                      className="w-full justify-start"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-white dark:bg-gray-900 border-t space-y-3">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 justify-start"
            onClick={() => navigate('/support')}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Aide
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="w-10 p-0"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
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
