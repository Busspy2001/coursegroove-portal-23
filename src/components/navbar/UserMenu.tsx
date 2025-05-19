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
import { UserRole } from "@/contexts/auth/types";

interface User {
  name?: string;
  email?: string;
  avatar?: string;
  roles?: UserRole[];
}

interface UserMenuProps {
  currentUser: User | null;
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
  
  // Get primary role
  const primaryRole = currentUser?.roles && currentUser.roles.length > 0
    ? currentUser.roles[0]
    : "student";
  
  // Function to get role badge color
  const getRoleBadgeColor = (role?: UserRole) => {
    switch (role) {
      case "instructor":
        return "bg-schoolier-teal hover:bg-schoolier-dark-teal";
      case "admin":
      case "super_admin":
        return "bg-schoolier-blue hover:bg-schoolier-dark-blue";
      case "business_admin":
        return "bg-amber-500 hover:bg-amber-600";
      case "employee":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-schoolier-gray hover:bg-schoolier-dark-gray";
    }
  };

  // Function to get role display name
  const getRoleDisplayName = (role?: UserRole) => {
    switch (role) {
      case "instructor":
        return "Instructeur";
      case "admin":
      case "super_admin":
        return "Admin";
      case "business_admin":
        return "Admin Entreprise";
      case "employee":
        return "Employé";
      default:
        return "Étudiant";
    }
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
            <Badge className={`text-xs ${getRoleBadgeColor(primaryRole)}`}>
              {getRoleDisplayName(primaryRole)}
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            Tableau de bord
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </DropdownMenuItem>
          {currentUser?.roles?.includes("instructor") && (
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
          {currentUser?.roles?.includes("business_admin") && (
            <DropdownMenuItem onClick={() => navigate("/entreprise")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Gestion d'entreprise
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
