
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center justify-center w-full h-full group">
      <div className="overflow-visible h-full flex items-center">
        <img 
          src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
          alt="Schoolier Logo" 
          className={cn(
            "h-28 w-auto transform transition-transform duration-300 group-hover:scale-105",
            "md:h-32" // Plus grand sur desktop
          )} 
        />
      </div>
    </Link>
  );
};

export default NavbarLogo;
