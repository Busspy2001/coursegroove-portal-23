
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ProfileType = "student" | "instructor" | "business" | "employee";

export const useRegisterForm = (profileType: ProfileType = "student") => {
  const { register, isLoggingIn } = useAuth();
  const { toast } = useToast();
  
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
  const [bio, setBio] = useState<string>("");
  
  // Form state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  
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
        description: "Veuillez remplir tous les champs requis",
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
      console.log(`Starting registration for ${email} as ${profileType}`);
      
      // Prepare user metadata based on profile type
      const userMetadata: Record<string, any> = {
        name,
        full_name: name,
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
        if (bio) userMetadata.bio = bio;
      }
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: window.location.origin + '/auth-redirect'
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Additional role assignment based on profile type
        if (profileType === "instructor") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'instructor'
            });
          } catch (roleError) {
            console.error("Error assigning instructor role:", roleError);
            // Continue despite role assignment error
          }
        } else if (profileType === "business") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'business_admin'
            });
          } catch (roleError) {
            console.error("Error assigning business admin role:", roleError);
          }
        } else if (profileType === "employee") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'employee'
            });
          } catch (roleError) {
            console.error("Error assigning employee role:", roleError);
          }
        }
        
        // If the user is a business admin, create a company record
        if (profileType === "business" && company) {
          try {
            const { error: companyError } = await supabase
              .from('companies')
              .insert({
                name: company,
                admin_id: data.user.id
              });
              
            if (companyError) {
              console.error("Error creating company:", companyError);
            }
          } catch (companyError) {
            console.error("Error creating company:", companyError);
          }
        }
        
        setRegistrationSuccess(true);
        
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
          variant: "success"
        });
        
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        setCompany("");
        setJobTitle("");
        setSpecialization("");
        setBio("");
      }
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
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
    bio,
    setBio,
    isLoading: isLoading || isLoggingIn,
    isPasswordMatch,
    registrationSuccess,
    handleRegister,
    isFormValid: isFormValid()
  };
};
