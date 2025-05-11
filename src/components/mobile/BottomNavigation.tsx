
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Award, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";

const BottomNavigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleNavClick = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  
  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.2 
      }}
    >
      <div className="flex items-center justify-around h-16">
        <NavItem 
          onClick={() => handleNavClick("/")}
          icon={<Home className="h-5 w-5" />} 
          label="Accueil" 
          isActive={isActive("/")} 
        />
        <NavItem 
          onClick={() => handleNavClick(isAuthenticated ? "/my-courses" : "/login", true)} 
          icon={<BookOpen className="h-5 w-5" />} 
          label="Cours" 
          isActive={isActive("/my-courses")} 
        />
        <NavItem 
          onClick={() => handleNavClick("/progress", true)} 
          icon={<TrendingUp className="h-5 w-5" />} 
          label="Progression" 
          isActive={isActive("/progress")} 
        />
        <NavItem 
          onClick={() => handleNavClick("/certifications", true)} 
          icon={<Award className="h-5 w-5" />} 
          label="Récompenses" 
          isActive={isActive("/certifications")} 
        />
        <NavItem 
          onClick={() => handleNavClick(isAuthenticated ? "/profile" : "/login", true)} 
          icon={<User className="h-5 w-5" />} 
          label="Profil" 
          isActive={isActive("/profile") || isActive("/login")} 
        />
      </div>
    </motion.div>
  );
};

// Updated Nav Item to use onClick instead of Link
const NavItem = ({ onClick, icon, label, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full relative",
        isActive ? "text-schoolier-blue" : "text-[#64748b]"
      )}
    >
      {icon}
      <span className="text-xs mt-1 font-spartan">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="bottomNavIndicator"
          className="absolute bottom-0 w-1/2 h-0.5 bg-schoolier-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
};

export default BottomNavigation;
