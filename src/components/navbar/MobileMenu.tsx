
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Settings, Book, BookOpen, User, Info, MessageSquare, Search } from "lucide-react";
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
            to="/"
            className={`flex items-center p-3 rounded-lg ${isActive("/") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <Home className="h-5 w-5 mr-3" />
            <span className="font-spartan">Accueil</span>
          </Link>
          <Link
            to="/courses"
            className={`flex items-center p-3 rounded-lg ${isActive("/courses") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            <span className="font-spartan">Cours</span>
          </Link>
          <Link
            to="/about"
            className={`flex items-center p-3 rounded-lg ${isActive("/about") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <Info className="h-5 w-5 mr-3" />
            <span className="font-spartan">À propos</span>
          </Link>
          <Link
            to="/contact"
            className={`flex items-center p-3 rounded-lg ${isActive("/contact") 
              ? "bg-schoolier-blue text-white" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={onClose}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            <span className="font-spartan">Contact</span>
          </Link>
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
          <Button onClick={() => { navigate("/login"); onClose(); }} className="w-full font-spartan">
            Connexion
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { navigate("/register"); onClose(); }}
            className="w-full border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10 font-spartan"
          >
            Inscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
