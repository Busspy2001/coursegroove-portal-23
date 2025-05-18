
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

type ProfileType = "student" | "instructor" | "business" | "employee";

interface RegisterFormProps {
  profileType?: ProfileType;
}

export const RegisterForm = ({ profileType = "student" }: RegisterFormProps) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
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

  return (
    <form onSubmit={handleRegister}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        {/* Additional fields based on profile type */}
        {profileType === "business" && (
          <div className="space-y-2">
            <Label htmlFor="company">Nom de l'entreprise</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                id="company"
                type="text"
                placeholder="Nom de votre entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        )}
        
        {profileType === "employee" && (
          <div className="space-y-2">
            <Label htmlFor="company">Entreprise</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                id="company"
                type="text"
                placeholder="Nom de votre entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        )}
        
        {(profileType === "instructor" || profileType === "employee") && (
          <div className="space-y-2">
            <Label htmlFor="jobTitle">{profileType === "instructor" ? "Spécialité" : "Poste"}</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                id="jobTitle"
                type="text"
                placeholder={profileType === "instructor" ? "Ex: Développement Web" : "Votre poste actuel"}
                value={profileType === "instructor" ? specialization : jobTitle}
                onChange={(e) => profileType === "instructor" ? setSpecialization(e.target.value) : setJobTitle(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Force du mot de passe:</span>
                <span>{passwordStrength.text}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-10 ${confirmPassword && (isPasswordMatch ? 'border-green-500' : 'border-red-500')}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {confirmPassword && !isPasswordMatch && (
            <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
          )}
          {confirmPassword && isPasswordMatch && (
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" /> Les mots de passe correspondent
            </p>
          )}
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms} 
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm">
            J'accepte les <Link to="/terms" className="text-schoolier-blue hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-schoolier-blue hover:underline">politique de confidentialité</Link>
          </Label>
        </div>
        <Button 
          type="submit" 
          className={`w-full ${getButtonClass()}`} 
          disabled={isLoading || !acceptTerms || !isPasswordMatch}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
