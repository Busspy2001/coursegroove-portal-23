import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Home, BookOpen, Award, Star, TrendingUp, MessageSquare, Settings, LogOut, Loader2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const StudentSidebar = () => {
  const {
    currentUser,
    logout,
    isLoggingOut
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      console.log("Déconnexion en cours depuis StudentSidebar...");
      
      // Utiliser le callback pour rediriger après la déconnexion complète
      await logout(() => {
        navigate("/login", { replace: true });
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [{
    title: "Accueil",
    path: "/dashboard",
    icon: Home
  }, {
    title: "Mes cours",
    path: "/my-courses",
    icon: BookOpen
  }, {
    title: "Certifications",
    path: "/certifications",
    icon: Award
  }, {
    title: "Favoris",
    path: "/favorites",
    icon: Star
  }, {
    title: "Progression",
    path: "/progress",
    icon: TrendingUp
  }, {
    title: "Messages",
    path: "/messages",
    icon: MessageSquare
  }, {
    title: "Paramètres",
    path: "/settings",
    icon: Settings
  }];
  
  const getInitials = (name: string = "Utilisateur") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  return <Sidebar>
      <SidebarHeader className="flex justify-start items-center p-4 bg-gray-50">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
          <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {currentUser?.name || "Utilisateur"}
          </span>
          <span className="text-xs text-muted-foreground">Étudiant</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.title}>
                    <Button variant="ghost" className="w-full justify-start hover:text-schoolier-teal" onClick={() => navigate(item.path)}>
                      <item.icon className={`mr-2 h-4 w-4 ${isActive(item.path) ? 'text-schoolier-blue' : 'text-schoolier-gray'}`} />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-gray-50">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-schoolier-red hover:text-schoolier-red hover:bg-schoolier-red/10" 
          onClick={handleLogout}
          disabled={isLoggingOut}
          data-testid="student-sidebar-logout"
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {isLoggingOut ? "Déconnexion en cours..." : "Se déconnecter"}
        </Button>
      </SidebarFooter>
    </Sidebar>;
};

export default StudentSidebar;
