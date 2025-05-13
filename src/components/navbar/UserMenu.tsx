
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Home, Book, Settings, User, LogOut } from "lucide-react";
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

interface User {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface UserMenuProps {
  currentUser: User | null;
  onLogout: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      console.log("Déconnexion depuis le menu utilisateur...");
      
      // Appeler onLogout sans lui passer de callback
      await onLogout();
      
      // Utiliser navigate directement après la déconnexion
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erreur lors de la déconnexion depuis le menu utilisateur:", error);
    }
  };
  
  // Function to get role badge color
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "instructor":
        return "bg-schoolier-teal hover:bg-schoolier-dark-teal";
      case "admin":
        return "bg-schoolier-blue hover:bg-schoolier-dark-blue";
      default:
        return "bg-schoolier-gray hover:bg-schoolier-dark-gray";
    }
  };

  // Function to get role display name
  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case "instructor":
        return "Instructeur";
      case "admin":
        return "Admin";
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
            <Badge className={`text-xs ${getRoleBadgeColor(currentUser?.role)}`}>
              {getRoleDisplayName(currentUser?.role)}
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
          {currentUser?.role === "instructor" && (
            <DropdownMenuItem onClick={() => navigate("/instructor")} className="cursor-pointer">
              <Book className="mr-2 h-4 w-4" />
              Espace instructeur
            </DropdownMenuItem>
          )}
          {currentUser?.role === "admin" && (
            <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Administration
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="text-red-500 cursor-pointer"
            data-navbar-logout="true"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
