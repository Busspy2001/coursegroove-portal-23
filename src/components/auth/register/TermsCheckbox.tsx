
import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface TermsCheckboxProps {
  acceptTerms: boolean;
  setAcceptTerms: (acceptTerms: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ acceptTerms, setAcceptTerms }) => {
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div variants={formItemVariant} className="flex items-start space-x-2 pt-2">
      <Checkbox 
        id="terms" 
        checked={acceptTerms} 
        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
        className="mt-0.5 data-[state=checked]:bg-schoolier-blue data-[state=checked]:border-schoolier-blue"
      />
      <Label htmlFor="terms" className="text-xs leading-tight">
        J'accepte les <Link to="/terms" className="text-schoolier-blue hover:underline font-medium">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-schoolier-blue hover:underline font-medium">politique de confidentialité</Link>
      </Label>
    </motion.div>
  );
};

export default TermsCheckbox;
