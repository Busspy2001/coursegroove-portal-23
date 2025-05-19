
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
    <motion.div variants={formItemVariant} className="flex items-start space-x-2 pt-1">
      <Checkbox 
        id="terms" 
        checked={acceptTerms} 
        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
        className="mt-1"
      />
      <Label htmlFor="terms" className="text-xs">
        J'accepte les <Link to="/terms" className="text-schoolier-blue hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-schoolier-blue hover:underline">politique de confidentialité</Link>
      </Label>
    </motion.div>
  );
};

export default TermsCheckbox;
