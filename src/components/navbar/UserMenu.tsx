
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Home, Book, Settings, User, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User as AuthUser, UserRole } from "@/contexts/auth/types";
import { determineUserDashboard, getRoleInfo } from "@/contexts/auth/redirectionUtils";

interface UserMenuProps {
  currentUser: AuthUser | null;
  onLogout: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    try {
      if (isLoggingOut) return;
      
      console.log("🔄 Déconnexion depuis le menu utilisateur...");
      setIsLoggingOut(true);
      
      // Appeler onLogout et attendre sa complétion
      await onLogout();
      
      // Navigation après déconnexion réussie
      console.log("✅ Redirection après déconnexion");
      navigate("/login?logout=true", { replace: true });
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion depuis le menu utilisateur:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  // Get role info using centralized logic
  const roleInfo = getRoleInfo(currentUser);
  
  // Function to get role badge color
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "instructor":
        return "bg-schoolier-teal hover:bg-schoolier-dark-teal";
      case "admin":
        return "bg-schoolier-blue hover:bg-schoolier-dark-blue";
      case "business_admin":
        return "bg-amber-500 hover:bg-amber-600";
      case "employee":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-schoolier-gray hover:bg-schoolier-dark-gray";
    }
  };
  
  // Function to determine the correct dashboard path using centralized logic
  const getDashboardPath = () => {
    const dashboardPath = determineUserDashboard(currentUser);
    console.log("🎯 UserMenu - Dashboard path determined:", dashboardPath);
    return dashboardPath;
  };
  
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-medium font-spartan">Notifications</span>
            <Button variant="ghost" size="sm">
              Tout marquer comme lu
            </Button>
          </div>
          <div className="py-2 max-h-80 overflow-y-auto">
            <div className="px-4 py-2 hover:bg-accent cursor-pointer">
              <p className="text-sm font-medium">Nouveau cours disponible</p>
              <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
            </div>
            <div className="px-4 py-2 hover:bg-accent cursor-pointer">
              <p className="text-sm font-medium">Votre certificat est prêt</p>
              <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
            </div>
          </div>
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-center">
              Voir toutes les notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 border-2 border-schoolier-teal">
                <AvatarImage 
                  src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"} 
                  alt={currentUser?.name || "User"}
                />
                <AvatarFallback className="bg-schoolier-teal text-white">
                  {currentUser?.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 text-left hidden lg:block">
                <p className="text-sm font-medium font-spartan">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-spartan flex items-center justify-between">
            <span>Mon compte</span>
            <Badge className={`text-xs ${getRoleBadgeColor(roleInfo.role)}`}>
              {roleInfo.displayName}
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(getDashboardPath())} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            Tableau de bord
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </DropdownMenuItem>
          {(currentUser?.roles?.includes("instructor") || (currentUser?.is_demo && currentUser?.email?.includes('prof'))) && (
            <DropdownMenuItem onClick={() => navigate("/instructor")} className="cursor-pointer">
              <Book className="mr-2 h-4 w-4" />
              Espace instructeur
            </DropdownMenuItem>
          )}
          {(currentUser?.roles?.includes("admin") || currentUser?.roles?.includes("super_admin")) && (
            <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Administration
            </DropdownMenuItem>
          )}
          {(currentUser?.roles?.includes("business_admin") || (currentUser?.is_demo && (currentUser?.email?.includes('business') || currentUser?.email?.includes('entreprise')))) && (
            <DropdownMenuItem onClick={() => navigate("/entreprise")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Gestion d'entreprise
            </DropdownMenuItem>
          )}
          {(currentUser?.roles?.includes("employee") || (currentUser?.is_demo && currentUser?.email?.includes('employee'))) && (
            <DropdownMenuItem onClick={() => navigate("/employee")} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Espace employé
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="text-red-500 cursor-pointer"
            data-navbar-logout="true"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Déconnexion...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
