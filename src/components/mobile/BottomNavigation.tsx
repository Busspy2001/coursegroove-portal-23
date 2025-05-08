
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const BottomNavigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/") ? "text-schoolier-blue" : "text-gray-500"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Accueil</span>
        </Link>
        <Link
          to="/courses"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/courses") ? "text-schoolier-blue" : "text-gray-500"
          )}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Cours</span>
        </Link>
        <Link
          to="/search"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/search") ? "text-schoolier-blue" : "text-gray-500"
          )}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Recherche</span>
        </Link>
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            (isActive("/profile") || isActive("/login")) ? "text-schoolier-blue" : "text-gray-500"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
