
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate("/login")}
        className="hover:bg-schoolier-blue/10 hover:text-schoolier-blue font-spartan"
      >
        Connexion
      </Button>
      <Button 
        onClick={() => navigate("/register")}
        className="bg-gradient-to-r from-schoolier-blue to-schoolier-teal hover:opacity-90 transition-opacity font-spartan font-medium"
      >
        Inscription
      </Button>
    </>
  );
};

export default AuthButtons;
