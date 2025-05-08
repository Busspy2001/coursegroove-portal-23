
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="overflow-hidden">
        <img 
          src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
          alt="Schoolier Logo" 
          className={cn(
            "h-10 w-auto transform transition-transform duration-300 group-hover:scale-105",
          )}
        />
      </div>
      <span className="font-spartan font-bold text-2xl text-schoolier-blue hidden sm:inline-block">
        Schoolier
      </span>
    </Link>
  );
};

export default NavbarLogo;
