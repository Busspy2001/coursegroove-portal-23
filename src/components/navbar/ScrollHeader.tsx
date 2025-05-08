
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

const ScrollHeader: React.FC<ScrollHeaderProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 py-1", // Added py-1 to reduce vertical padding
        isScrolled 
          ? "bg-white/80 dark:bg-schoolier-dark/80 backdrop-blur-md shadow-sm" 
          : "bg-white dark:bg-schoolier-dark"
      )}
    >
      {children}
    </header>
  );
};

export default ScrollHeader;
