import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Globe, Home, MessageSquare, Search, ShoppingCart, User } from "lucide-react";
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
    <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 animate-fade-in">
      {/* Header with close button */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="font-spartan font-bold text-lg">Menu</div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="sr-only">Fermer</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Search */}
      <div className="p-4 border-b">
        <SearchBar />
      </div>
      
      {/* Main navigation */}
      <div className="overflow-y-auto flex-grow">
        <div className="p-2 space-y-1">
          <Link
            to="/explore"
            className={`flex items-center p-3 rounded-lg ${isActive("/explore") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <Search className="h-5 w-5 mr-3" />
            <span className="font-spartan">Découvrir</span>
          </Link>
          <Link
            to="/business"
            className={`flex items-center p-3 rounded-lg ${isActive("/business") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            <span className="font-spartan">Schoolier Business</span>
          </Link>
          <Link
            to="/teach"
            className={`flex items-center p-3 rounded-lg ${isActive("/teach") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <User className="h-5 w-5 mr-3" />
            <span className="font-spartan">Enseigner sur Schoolier</span>
          </Link>
          <Link
            to="/cart"
            className={`flex items-center p-3 rounded-lg ${isActive("/cart") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            <span className="font-spartan">Panier</span>
          </Link>
          <div className="h-px my-2 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Globe className="h-5 w-5 mr-3" />
            <span className="font-spartan">Langue</span>
          </div>
        </div>
      </div>
      
      {/* User section */}
      {isAuthenticated ? (
        <div className="border-t p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b">
            <img
              src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
              alt="User"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-medium font-spartan">{currentUser?.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
              onClick={onClose}
            >
              <Home className="h-5 w-5 mr-3 text-schoolier-blue" />
              <span className="font-spartan">Tableau de bord</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-3 text-schoolier-blue" />
              <span className="font-spartan">Mon profil</span>
            </Link>
            {currentUser?.role === "instructor" && (
              <Link
                to="/instructor"
                className="flex items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
                onClick={onClose}
              >
                <Book className="h-5 w-5 mr-3 text-schoolier-blue" />
                <span className="font-spartan">Espace instructeur</span>
              </Link>
            )}
            {currentUser?.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700"
                onClick={onClose}
              >
                <Settings className="h-5 w-5 mr-3 text-schoolier-blue" />
                <span className="font-spartan">Administration</span>
              </Link>
            )}
            <Button variant="destructive" onClick={onLogout} className="w-full mt-4 font-spartan">
              Déconnexion
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-t p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
          <Button onClick={() => { navigate("/login"); onClose(); }} 
                  className="w-full font-spartan border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10" 
                  variant="outline">
            Se connecter
          </Button>
          <Button 
            variant="default" 
            onClick={() => { navigate("/register"); onClose(); }}
            className="w-full bg-schoolier-blue hover:bg-schoolier-dark-blue font-spartan"
          >
            S'inscrire
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
