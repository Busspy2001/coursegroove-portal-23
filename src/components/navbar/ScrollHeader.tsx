
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

const ScrollHeader: React.FC<ScrollHeaderProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we should show or hide the header
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      // Determine if we should apply the scrolled style
      setIsScrolled(currentScrollY > 10);
      
      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 py-0", 
        isScrolled 
          ? "bg-white/90 dark:bg-schoolier-dark/90 backdrop-blur-md shadow-sm" 
          : "bg-white dark:bg-schoolier-dark",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {children}
    </header>
  );
};

export default ScrollHeader;
