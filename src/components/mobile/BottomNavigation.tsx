
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Award, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import { motion } from "framer-motion";

const BottomNavigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
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
          to="/dashboard" 
          icon={<Home className="h-5 w-5" />} 
          label="Accueil" 
          isActive={isActive("/dashboard")} 
        />
        <NavItem 
          to="/my-courses" 
          icon={<BookOpen className="h-5 w-5" />} 
          label="Cours" 
          isActive={isActive("/my-courses")} 
        />
        <NavItem 
          to="/progress" 
          icon={<TrendingUp className="h-5 w-5" />} 
          label="Progression" 
          isActive={isActive("/progress")} 
        />
        <NavItem 
          to="/certifications" 
          icon={<Award className="h-5 w-5" />} 
          label="Récompenses" 
          isActive={isActive("/certifications")} 
        />
        <NavItem 
          to={isAuthenticated ? "/profile" : "/login"} 
          icon={<User className="h-5 w-5" />} 
          label="Profil" 
          isActive={isActive("/profile") || isActive("/login")} 
        />
      </div>
    </motion.div>
  );
};

// Extract Nav Item as a sub-component for cleaner code
const NavItem = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
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
    </Link>
  );
};

export default BottomNavigation;
