
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Award, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";

const BottomNavigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/dashboard") ? "text-schoolier-blue" : "text-[#64748b]"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Accueil</span>
        </Link>
        <Link
          to="/my-courses"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/my-courses") ? "text-schoolier-blue" : "text-[#64748b]"
          )}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Cours</span>
        </Link>
        <Link
          to="/progress"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/progress") ? "text-schoolier-blue" : "text-[#64748b]"
          )}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Progression</span>
        </Link>
        <Link
          to="/certifications"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            isActive("/certifications") ? "text-schoolier-blue" : "text-[#64748b]"
          )}
        >
          <Award className="h-5 w-5" />
          <span className="text-xs mt-1 font-spartan">Récompenses</span>
        </Link>
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            (isActive("/profile") || isActive("/login")) ? "text-schoolier-blue" : "text-[#64748b]"
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
