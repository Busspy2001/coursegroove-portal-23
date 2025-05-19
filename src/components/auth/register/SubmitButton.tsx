
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ProfileType = "student" | "instructor" | "business" | "employee";

interface SubmitButtonProps {
  profileType: ProfileType;
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ profileType, isLoading, isDisabled }) => {
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Get button styles based on profile type
  const getButtonClass = () => {
    switch (profileType) {
      case "instructor":
        return "bg-schoolier-teal hover:bg-schoolier-dark-teal";
      case "business":
        return "bg-amber-500 hover:bg-amber-600";
      case "employee":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-schoolier-blue hover:bg-schoolier-dark-blue";
    }
  };

  return (
    <motion.div 
      variants={formItemVariant}
      className="pt-2"
    >
      <Button 
        type="submit" 
        className={`w-full h-9 ${getButtonClass()}`} 
        disabled={isLoading || isDisabled}
      >
        {isLoading ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
