
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({ email, setEmail }) => {
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div variants={formItemVariant} className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-9"
          required
        />
      </div>
    </motion.div>
  );
};

export default EmailField;
