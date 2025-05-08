
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
        alt="Schoolier Logo" 
        className="h-16 w-auto" // Increased from h-10 to h-16
      />
    </Link>
  );
};

export default NavbarLogo;
