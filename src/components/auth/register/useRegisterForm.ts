
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";

type ProfileType = "student" | "instructor" | "business" | "employee";

export const useRegisterForm = (profileType: ProfileType = "student") => {
  const { register, isLoggingIn } = useAuth();
  
  // Form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  
  // Additional fields based on profile type
  const [company, setCompany] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  
  // Form state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Computed values
  const isPasswordMatch = password === confirmPassword;
  
  // Form validation
  const isFormValid = () => {
    // Basic validation for all profile types
    if (!name || !email || !password || !confirmPassword || !isPasswordMatch || !acceptTerms) {
      return false;
    }
    
    // Additional validation based on profile type
    if (profileType === "business" && !company) {
      return false;
    }
    
    if (profileType === "employee" && (!company || !jobTitle)) {
      return false;
    }
    
    if (profileType === "instructor" && !specialization) {
      return false;
    }
    
    return true;
  };
  
  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    if (!isPasswordMatch) {
      toast({
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare additional user metadata based on profile type
      const userMetadata: Record<string, any> = {
        profileType
      };
      
      if (profileType === "business" || profileType === "employee") {
        userMetadata.company = company;
      }
      
      if (profileType === "employee") {
        userMetadata.jobTitle = jobTitle;
      }
      
      if (profileType === "instructor") {
        userMetadata.specialization = specialization;
      }
      
      // Register the user
      await register(email, password, name);
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès"
      });
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
        variant: "destructive"
      });
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
    acceptTerms,
    setAcceptTerms,
    company,
    setCompany,
    jobTitle,
    setJobTitle,
    specialization,
    setSpecialization,
    isLoading: isLoading || isLoggingIn,
    isPasswordMatch,
    handleRegister,
    isFormValid: isFormValid()
  };
};
