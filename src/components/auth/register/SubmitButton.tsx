
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
      className="pt-4"
    >
      <Button 
        type="submit" 
        className={`w-full h-10 ${getButtonClass()} relative`} 
        disabled={isLoading || isDisabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Inscription en cours...
          </>
        ) : "S'inscrire"}
        
        <motion.span
          className="absolute inset-0 bg-white rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDisabled ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
