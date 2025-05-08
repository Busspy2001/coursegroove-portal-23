
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

interface User {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  currentUser: User | null;
  isActive: (path: string) => boolean;
  onLogout: () => Promise<void>;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isAuthenticated,
  currentUser,
  isActive,
  onLogout,
  onClose
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="md:hidden bg-white dark:bg-schoolier-dark border-t animate-fade-in">
      {/* Mobile Search */}
      <div className="p-4 border-b">
        <SearchBar />
      </div>
      
      <div className="flex flex-col space-y-1 p-2">
        <Link
          to="/"
          className={`p-3 rounded-md ${isActive("/") ? "bg-accent" : "hover:bg-muted"}`}
          onClick={onClose}
        >
          Accueil
        </Link>
        <Link
          to="/courses"
          className={`p-3 rounded-md ${isActive("/courses") ? "bg-accent" : "hover:bg-muted"}`}
          onClick={onClose}
        >
          Cours
        </Link>
        <Link
          to="/about"
          className={`p-3 rounded-md ${isActive("/about") ? "bg-accent" : "hover:bg-muted"}`}
          onClick={onClose}
        >
          À propos
        </Link>
        <Link
          to="/contact"
          className={`p-3 rounded-md ${isActive("/contact") ? "bg-accent" : "hover:bg-muted"}`}
          onClick={onClose}
        >
          Contact
        </Link>
      </div>
      
      {isAuthenticated ? (
        <div className="border-t p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Link
              to="/dashboard"
              className="flex items-center p-2 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <Home className="h-4 w-4 mr-2" />
              Tableau de bord
            </Link>
            <Link
              to="/profile"
              className="flex items-center p-2 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <Settings className="h-4 w-4 mr-2" />
              Mon profil
            </Link>
            {currentUser?.role === "instructor" && (
              <Link
                to="/instructor"
                className="flex items-center p-2 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <Book className="h-4 w-4 mr-2" />
                Espace instructeur
              </Link>
            )}
            {currentUser?.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center p-2 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <Settings className="h-4 w-4 mr-2" />
                Administration
              </Link>
            )}
            <Button variant="destructive" onClick={onLogout} className="mt-2">
              Déconnexion
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 p-4 border-t">
          <Button onClick={() => { navigate("/login"); onClose(); }}>
            Connexion
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { navigate("/register"); onClose(); }}
            className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10"
          >
            Inscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
