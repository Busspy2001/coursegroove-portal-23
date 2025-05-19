
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { getPasswordStrength } from "@/utils/passwordUtils";
import { motion } from "framer-motion";

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordStrength = getPasswordStrength(password);
  const isPasswordMatch = password === confirmPassword && confirmPassword !== "";
  
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.div variants={formItemVariant} className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-9"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {password && (
          <motion.div 
            className="mt-1 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between text-xs">
              <span>Force du mot de passe:</span>
              <span>{passwordStrength.text}</span>
            </div>
            <div className="h-1 rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              ></div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div variants={formItemVariant} className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 pr-10 h-9 ${confirmPassword && (isPasswordMatch ? 'border-green-500 dark:border-green-600' : 'border-red-500 dark:border-red-600')}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {confirmPassword && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {!isPasswordMatch && (
              <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
            )}
            {isPasswordMatch && (
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" /> Les mots de passe correspondent
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default PasswordField;
