
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Home, Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <span className="font-medium">Notifications</span>
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
              <img
                src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
                alt="User"
                className="h-8 w-8 rounded-full object-cover border-2 border-schoolier-teal"
              />
              <div className="ml-2 text-left hidden lg:block">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center space-x-2 p-2 border-b lg:hidden">
            <div>
              <p className="font-medium">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
          <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            Tableau de bord
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
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
          <DropdownMenuItem onClick={onLogout} className="text-red-500 cursor-pointer">
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
