
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({ email, setEmail }) => {
  const [focused, setFocused] = useState(false);
  
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Basic email validation
  const isEmailValid = () => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <motion.div variants={formItemVariant} className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        {email && isEmailValid() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
          </motion.div>
        )}
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`pl-10 h-9 ${
            email && !isEmailValid() && !focused ? "border-red-500 focus-visible:ring-red-500" : 
            email && isEmailValid() ? "border-green-500 focus-visible:ring-green-500" : ""
          }`}
          required
        />
      </div>
      {email && !isEmailValid() && !focused && (
        <motion.p 
          className="text-xs text-red-500 mt-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Veuillez entrer une adresse email valide
        </motion.p>
      )}
    </motion.div>
  );
};

export default EmailField;
