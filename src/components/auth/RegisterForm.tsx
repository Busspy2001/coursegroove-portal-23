
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User, CheckCircle, Building, Briefcase } from "lucide-react";
import { getPasswordStrength } from "@/utils/passwordUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

type ProfileType = "student" | "instructor" | "business" | "employee";

interface RegisterFormProps {
  profileType?: ProfileType;
}

export const RegisterForm = ({ profileType = "student" }: RegisterFormProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Additional fields for specific profiles
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [specialization, setSpecialization] = useState("");
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation pour vous inscrire.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // We would need to extend the register function to handle different roles
      // For now, we'll use the standard register function and handle role assignment later
      await register(name, email, password);
      toast({
        title: "Inscription réussie !",
        description: `Bienvenue sur Schoolier en tant que ${profileType}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const passwordStrength = getPasswordStrength(password);
  const isPasswordMatch = password === confirmPassword && confirmPassword !== "";

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

  // Add animation variants
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.form 
      onSubmit={handleRegister}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05 }}
    >
      <div className="space-y-3">
        <motion.div variants={formItemVariant} className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 h-9"
              required
            />
          </div>
        </motion.div>
        
        {/* Additional fields based on profile type */}
        {profileType === "business" && (
          <motion.div variants={formItemVariant} className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">Nom de l'entreprise</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="company"
                type="text"
                placeholder="Nom de votre entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10 h-9"
                required
              />
            </div>
          </motion.div>
        )}
        
        {profileType === "employee" && (
          <motion.div variants={formItemVariant} className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">Entreprise</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="company"
                type="text"
                placeholder="Nom de votre entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10 h-9"
                required
              />
            </div>
          </motion.div>
        )}
        
        {(profileType === "instructor" || profileType === "employee") && (
          <motion.div variants={formItemVariant} className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              {profileType === "instructor" ? "Spécialité" : "Poste"}
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="jobTitle"
                type="text"
                placeholder={profileType === "instructor" ? "Ex: Développement Web" : "Votre poste actuel"}
                value={profileType === "instructor" ? specialization : jobTitle}
                onChange={(e) => profileType === "instructor" ? setSpecialization(e.target.value) : setJobTitle(e.target.value)}
                className="pl-10 h-9"
                required
              />
            </div>
          </motion.div>
        )}
        
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
        
        <motion.div 
          variants={formItemVariant}
          className="pt-2"
        >
          <Button 
            type="submit" 
            className={`w-full h-9 ${getButtonClass()}`} 
            disabled={isLoading || !acceptTerms || !isPasswordMatch}
          >
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
