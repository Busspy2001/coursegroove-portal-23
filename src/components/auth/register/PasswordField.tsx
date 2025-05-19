
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
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
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;
  const isPasswordMisMatch = password && confirmPassword && password !== confirmPassword;

  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const strengthClass = () => {
    if (!password) return "";
    if (password.length < 6) return "bg-red-500";
    if (password.length < 8) return "bg-amber-500";
    if (password.length >= 8) return "bg-green-500";
    return "";
  };

  return (
    <>
      <motion.div variants={formItemVariant} className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
          {passwordFocused && password && (
            <span className="text-xs text-muted-foreground">
              {password.length < 6 ? "Faible" : password.length < 8 ? "Moyen" : "Fort"}
            </span>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
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
        {passwordFocused && password && (
          <motion.div 
            className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`h-full ${strengthClass()}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </motion.div>
      
      <motion.div variants={formItemVariant} className="space-y-2">
        <Label 
          htmlFor="confirmPassword" 
          className="text-sm font-medium flex justify-between items-center"
        >
          <span>Confirmer le mot de passe</span>
          {confirmPassword && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xs ${isPasswordMatch ? 'text-green-600' : isPasswordMisMatch ? 'text-red-500' : ''}`}
            >
              {isPasswordMatch ? "Mots de passe identiques" : isPasswordMisMatch ? "Mots de passe différents" : ""}
            </motion.span>
          )}
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 pr-10 h-9 ${
              isPasswordMisMatch ? "border-red-500 focus-visible:ring-red-500" : 
              isPasswordMatch ? "border-green-500 focus-visible:ring-green-500" : ""
            }`}
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
      </motion.div>
    </>
  );
};

export default PasswordField;
