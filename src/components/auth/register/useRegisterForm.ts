
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

type ProfileType = "student" | "instructor" | "business" | "employee";

export const useRegisterForm = (profileType: ProfileType = "student") => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form fields state
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

  // Form validation
  const isPasswordMatch = password === confirmPassword && confirmPassword !== "";
  const isFormValid = name && email && password && confirmPassword && isPasswordMatch && acceptTerms;
  if (profileType === "business" || profileType === "employee") {
    isFormValid && company;
  }
  if (profileType === "instructor") {
    isFormValid && specialization;
  }
  if (profileType === "employee") {
    isFormValid && jobTitle;
  }
  
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

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword, 
    setShowConfirmPassword,
    isLoading,
    acceptTerms,
    setAcceptTerms,
    company,
    setCompany,
    jobTitle,
    setJobTitle,
    specialization,
    setSpecialization,
    isPasswordMatch,
    handleRegister,
    isFormValid: Boolean(isFormValid)
  };
};
