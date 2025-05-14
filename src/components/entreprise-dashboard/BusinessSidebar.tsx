
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  GraduationCap, 
  BarChart2, 
  Receipt,
  Settings, 
  LogOut,
  HelpCircle,
  Moon,
  Sun,
  PlusCircle,
  ClipboardList,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

const BusinessSidebar = () => {
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
  
  const getInitials = (name: string = "Entreprise") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const menuGroups = [
    {
      label: "Gestion",
      items: [
        {
          title: "Accueil",
          path: "/entreprise",
          icon: LayoutDashboard,
          tooltip: "Vue d'ensemble de votre espace entreprise"
        },
        {
          title: "Employés",
          path: "/entreprise/employes",
          icon: Users,
          tooltip: "Gestion des membres et assignation de formations"
        },
        {
          title: "Départements",
          path: "/entreprise/departements",
          icon: Building2,
          tooltip: "Organisation des équipes et responsables"
        }
      ]
    },
    {
      label: "Formations",
      items: [
        {
          title: "Formations",
          path: "/entreprise/formations",
          icon: GraduationCap,
          tooltip: "Accéder à toutes les formations disponibles",
          subItems: [
            {
              title: "Ajouter une formation",
              path: "/entreprise/formations/ajouter",
              tooltip: "Créer une formation personnalisée"
            },
            {
              title: "Assigner une formation",
              path: "/entreprise/formations/assigner",
              tooltip: "Attribuer des formations aux employés"
            }
          ]
        }
      ]
    },
    {
      label: "Analyse & Finance",
      items: [
        {
          title: "Statistiques",
          path: "/entreprise/statistiques",
          icon: BarChart2,
          tooltip: "Suivi de progression et analyse des résultats"
        },
        {
          title: "Facturation",
          path: "/entreprise/facturation",
          icon: Receipt,
          tooltip: "Gestion des abonnements et paiements"
        }
      ]
    },
    {
      label: "Configuration",
      items: [
        {
          title: "Paramètres",
          path: "/entreprise/parametres",
          icon: Settings,
          tooltip: "Configuration de votre espace entreprise"
        }
      ]
    }
  ];

  // Handle both name formats (name and full_name)
  const userName = currentUser?.full_name || currentUser?.name || "Entreprise";
  const userAvatar = currentUser?.avatar_url || currentUser?.avatar;
  const userRole = currentUser?.role || "business_admin";
  const roleDisplay = userRole === "business_admin" ? "Administrateur" : "Responsable";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-start items-center p-4 bg-white dark:bg-gray-900 border-b">
        <Avatar className="h-10 w-10 mr-3 bg-schoolier-teal">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {userName}
          </span>
          <span className="text-xs text-muted-foreground">{roleDisplay}</span>
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
                      <item.icon className={`mr-2 h-4 w-4 ${item.path.includes('ajouter') ? 'text-schoolier-teal' : ''}`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    
                    {item.subItems && (
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton
                              onClick={() => navigate(subItem.path)}
                              isActive={isActive(subItem.path)}
                            >
                              {subItem.path.includes('ajouter') ? (
                                <PlusCircle className="mr-2 h-3.5 w-3.5 text-schoolier-teal" />
                              ) : (
                                <ClipboardList className="mr-2 h-3.5 w-3.5" />
                              )}
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
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

export default BusinessSidebar;
