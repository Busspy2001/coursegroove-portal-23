
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const NavbarLogo = () => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className="flex items-center justify-center w-full h-full group">
      <div className="overflow-visible h-full flex items-center">
        <img 
          src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
          alt="Schoolier Logo" 
          className={cn(
            "transform transition-transform duration-300 group-hover:scale-105",
            isMobile ? "h-16 w-auto" : "h-28 md:h-32 w-auto" // Smaller on mobile
          )} 
        />
      </div>
    </Link>
  );
};

export default NavbarLogo;
