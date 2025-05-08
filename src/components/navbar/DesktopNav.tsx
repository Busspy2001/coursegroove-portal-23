
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import DiscoverMenuContent from "./menu/DiscoverMenuContent";

interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface DesktopNavProps {
  isActive: (path: string) => boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isActive }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    if (isMobile) return;
    
    // Clear any existing timeout to prevent menu from closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setOpen(true);
  };
  
  const handleMouseLeave = () => {
    if (isMobile) return;
    
    // Add a small delay before closing to prevent accidental closures
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };
  
  // Clear the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const handleMenuToggle = () => {
    if (isMobile) {
      setOpen(!open);
    }
  };
  
  return (
    <NavigationMenu className="hidden lg:flex mx-auto">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
              isActive("/explore") && "text-schoolier-blue font-medium",
              "data-[state=open]:text-schoolier-blue"
            )}
            onMouseEnter={handleMouseEnter}
            onClick={handleMenuToggle}
            aria-expanded={open}
          >
            Découvrir
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-[960px] overflow-visible rounded-xl shadow-xl bg-white border border-[#f1f5f9] animate-fade-in z-[1000] mt-1"
            forceMount={open}
          >
            <DiscoverMenuContent />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/business">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
                isActive("/business") &&
                  "text-schoolier-blue font-medium"
              )}
            >
              Schoolier Business
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/teach">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
                isActive("/teach") &&
                  "text-schoolier-blue font-medium"
              )}
            >
              Enseigner sur Schoolier
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
