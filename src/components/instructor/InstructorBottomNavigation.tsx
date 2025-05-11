
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  User, 
  Settings 
} from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const InstructorBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };
  
  const mainRoutes = [
    { 
      icon: LayoutDashboard, 
      label: "Tableau de bord", 
      path: "/instructor" 
    },
    { 
      icon: BookOpen, 
      label: "Cours", 
      path: "/instructor/courses" 
    },
    { 
      icon: Users, 
      label: "Étudiants", 
      path: "/instructor/students" 
    },
    { 
      icon: DollarSign, 
      label: "Revenus", 
      path: "/instructor/earnings" 
    }
  ];
  
  const moreRoutes = [
    { 
      icon: Settings, 
      label: "Paramètres", 
      path: "/instructor/settings" 
    },
    { 
      icon: User, 
      label: "Profil", 
      path: "/profile" 
    }
  ];
  
  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      style={{
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      }}
    >
      <div className="grid grid-cols-5 h-16">
        {mainRoutes.map((route, idx) => (
          <button
            key={route.path}
            onClick={() => navigate(route.path)}
            className={cn(
              "flex flex-col items-center justify-center h-full transition-colors",
              isActive(route.path) 
                ? "text-schoolier-blue" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{route.label}</span>
            {isActive(route.path) && (
              <motion.div 
                layoutId="instructorBottomNavIndicator"
                className="absolute bottom-0 h-0.5 w-10 bg-schoolier-blue rounded-t-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
        
        <Drawer open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
          <DrawerTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center h-full transition-colors",
                isActive("/instructor/settings") || isActive("/profile")
                  ? "text-schoolier-blue" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Plus</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="px-4 pb-8 pt-2 h-80">
            <div className="mt-6 space-y-4">
              {moreRoutes.map((route) => (
                <Button
                  key={route.path}
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "w-full justify-start text-base",
                    isActive(route.path) && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    navigate(route.path);
                    setMoreMenuOpen(false);
                  }}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </Button>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.div>
  );
};

export default InstructorBottomNavigation;
