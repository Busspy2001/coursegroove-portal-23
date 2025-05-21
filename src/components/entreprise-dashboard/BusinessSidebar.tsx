
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
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
  Loader2,
  ClipboardCheck,
  Lightbulb
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

const BusinessSidebar = () => {
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const handleLogout = async () => {
    try {
      // Éviter les doubles clics
      if (isLoggingOut) return;
      
      setIsLoggingOut(true);
      console.log("🔄 Déconnexion depuis BusinessSidebar en cours...");
      
      await logout(() => {
        // IMPORTANT: Ordre inversé - d'abord rediriger, puis réinitialiser l'état
        // Cela permet d'éviter que la réinitialisation de l'état ne soit pas effectuée
        // avant la navigation, ce qui pourrait laisser l'état "isLoggingOut" à true
        console.log("✅ Redirection après déconnexion depuis BusinessSidebar");
        navigate("/login?logout=true", { replace: true });
        
        // Réinitialiser l'état APRÈS la redirection pour s'assurer
        // que les changements d'état ne sont pas perdus pendant la navigation
        setTimeout(() => {
          setIsLoggingOut(false);
          console.log("✅ État de déconnexion réinitialisé après redirection");
        }, 50);
      });
      
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion depuis BusinessSidebar:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
      // En cas d'erreur, réinitialiser l'état pour permettre une nouvelle tentative
      setIsLoggingOut(false);
    }
  };
  
  const getInitials = (name: string = "Entreprise") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
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
          title: "Collaborateurs",
          path: "/entreprise/collaborateurs",
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
      label: "Formations et Évaluations",
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
        },
        {
          title: "Évaluations",
          path: "/entreprise/evaluations",
          icon: ClipboardCheck,
          tooltip: "Gérer les évaluations et tests de compétences"
        },
        {
          title: "Compétences",
          path: "/entreprise/competences",
          icon: Lightbulb,
          tooltip: "Gérer les compétences de vos équipes"
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
  const userRoles = currentUser?.roles || [];
  const userPrimaryRole = userRoles.length > 0 ? userRoles[0] : 'business_admin';
  const roleDisplay = userPrimaryRole === "business_admin" ? "Administrateur" : "Responsable";

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
                    <SidebarMenuSubButton 
                      onClick={() => handleNavigation(item.path)}
                      title={item.tooltip}
                      isActive={isActive(item.path)}
                      className="w-full justify-start"
                    >
                      <item.icon className={`mr-2 h-4 w-4 ${item.path.includes('ajouter') ? 'text-schoolier-teal' : ''}`} />
                      <span>{item.title}</span>
                    </SidebarMenuSubButton>
                    
                    {item.subItems && (
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation(subItem.path)}
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
            onClick={() => handleNavigation('/support')}
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
