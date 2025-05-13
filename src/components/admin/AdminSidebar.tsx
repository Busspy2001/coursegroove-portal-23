
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { 
  LayoutDashboard, Users, Shield, BookOpen, Star, TrendingDown,
  Building, CreditCard, BarChart3, Tag, MessageSquare, Bell,
  Settings, FileWarning, Search, Activity, Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { UserRole } from "@/contexts/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AdminSidebarProps {
  onNavigate?: (path: string) => void;
}

const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const { currentUser, logout, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

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
  
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSuperAdmin = currentUser?.role === "super_admin";
  const isBusinessAdmin = currentUser?.role === "business_admin";

  const getInitials = (name: string = "Admin") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  // Utiliser des badges pour indiquer des états
  const getStatusBadge = (status: "success" | "warning" | "danger" | "neutral") => {
    const statusMap = {
      success: <Badge variant="outline" className="h-2 w-2 rounded-full bg-green-500 p-0" />,
      warning: <Badge variant="outline" className="h-2 w-2 rounded-full bg-yellow-500 p-0" />,
      danger: <Badge variant="outline" className="h-2 w-2 rounded-full bg-red-500 p-0" />,
      neutral: <Badge variant="outline" className="h-2 w-2 rounded-full bg-gray-300 p-0" />
    };
    
    return statusMap[status];
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name || "Admin"} />
          <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{currentUser?.name || "Admin"}</span>
          <span className="text-xs text-muted-foreground capitalize">{currentUser?.role || "admin"}</span>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent>
        {/* Vue d'ensemble */}
        <SidebarGroup>
          <SidebarGroupLabel>Vue d'ensemble</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Tableau de bord"
                  isActive={isActive("/admin")}
                  onClick={() => handleNavigation("/admin")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Tableau de bord</span>
                  {getStatusBadge("success")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Utilisateurs */}
        <SidebarGroup>
          <SidebarGroupLabel>Utilisateurs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Comptes"
                  isActive={isActive("/admin/users")}
                  onClick={() => handleNavigation("/admin/users")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Comptes</span>
                  {getStatusBadge("warning")}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Activité utilisateur"
                  isActive={isActive("/admin/user-activity")}
                  onClick={() => handleNavigation("/admin/user-activity")}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Activité utilisateur</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Support & signalements"
                  isActive={isActive("/admin/user-support")}
                  onClick={() => handleNavigation("/admin/user-support")}
                >
                  <Headphones className="mr-2 h-4 w-4" />
                  <span>Support & signalements</span>
                  {getStatusBadge("danger")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Cours */}
        <SidebarGroup>
          <SidebarGroupLabel>Cours</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Cours à modérer"
                  isActive={isActive("/admin/courses")}
                  onClick={() => handleNavigation("/admin/courses")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Cours à modérer</span>
                  {getStatusBadge("warning")}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Avis & notes"
                  isActive={isActive("/admin/reviews")}
                  onClick={() => handleNavigation("/admin/reviews")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  <span>Avis & notes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Qualité & anomalies"
                  isActive={isActive("/admin/course-quality")}
                  onClick={() => handleNavigation("/admin/course-quality")}
                >
                  <TrendingDown className="mr-2 h-4 w-4" />
                  <span>Qualité & anomalies</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Business - limité aux super_admin et business_admin */}
        {(isSuperAdmin || isBusinessAdmin) && (
          <SidebarGroup>
            <SidebarGroupLabel>Business</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Entreprises clientes"
                    isActive={isActive("/admin/business")}
                    onClick={() => handleNavigation("/admin/business")}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    <span>Entreprises clientes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Plans & abonnements"
                    isActive={isActive("/admin/business/plans")}
                    onClick={() => handleNavigation("/admin/business/plans")}
                    disabled={!isSuperAdmin}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Plans & abonnements</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Finance - limité aux super_admin */}
        {isSuperAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Finance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Transactions"
                    isActive={isActive("/admin/finance")}
                    onClick={() => handleNavigation("/admin/finance")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Transactions</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Statistiques */}
        <SidebarGroup>
          <SidebarGroupLabel>Statistiques</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Statistiques"
                  isActive={isActive("/admin/statistics")}
                  onClick={() => handleNavigation("/admin/statistics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Statistiques</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Sections en développement */}
        {isSuperAdmin && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Marketing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Marketing"
                      isActive={isActive("/admin/marketing")}
                      onClick={() => handleNavigation("/admin/marketing")}
                    >
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Marketing</span>
                      <Badge variant="outline" className="ml-auto text-xs">Beta</Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Communication</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Messages"
                      isActive={isActive("/admin/messages")}
                      onClick={() => handleNavigation("/admin/messages")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                      <Badge variant="outline" className="ml-auto text-xs">Bientôt</Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Système</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Notifications"
                      isActive={isActive("/admin/notifications")}
                      onClick={() => handleNavigation("/admin/notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                      <Badge variant="outline" className="ml-auto text-xs">Bientôt</Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Paramètres"
                      isActive={isActive("/admin/settings")}
                      onClick={() => handleNavigation("/admin/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Système & Sécurité"
                      isActive={isActive("/admin/system")}
                      onClick={() => handleNavigation("/admin/system")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Système & Sécurité</span>
                      <Badge variant="outline" className="ml-auto text-xs">Bientôt</Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-schoolier-red hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Shield className="mr-2 h-4 w-4" />
          )}
          {isLoggingOut ? "Déconnexion en cours..." : "Se déconnecter"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
