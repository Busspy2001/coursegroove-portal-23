
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "./useRegisterForm";
import { ProfileFields } from "./ProfileFields";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { TermsCheckbox } from "./TermsCheckbox";
import { SubmitButton } from "./SubmitButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { StepForm } from "./StepForm";
import SocialLoginButtonsMobile from "../SocialLoginButtonsMobile";

type ProfileType = "student" | "instructor" | "business" | "employee";

interface RegisterFormProps {
  profileType?: ProfileType;
}

export const RegisterForm = ({ profileType = "student" }: RegisterFormProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isStepView, setIsStepView] = useState(() => {
    // Use step view by default for business and employee on mobile
    return isMobile && (profileType === "business" || profileType === "employee");
  });
  
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    isLoading,
    acceptTerms, setAcceptTerms,
    company, setCompany,
    jobTitle, setJobTitle,
    specialization, setSpecialization,
    isPasswordMatch,
    handleRegister,
    isFormValid
  } = useRegisterForm(profileType);

  const formContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  // For step form
  const steps = [
    {
      title: "Profil",
      component: <ProfileFields 
        profileType={profileType}
        name={name}
        setName={setName}
        company={company}
        setCompany={setCompany}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        specialization={specialization}
        setSpecialization={setSpecialization}
      />,
      isValid: name && (
        (profileType === "business" || profileType === "employee") ? company !== "" : true
      ) && (
        profileType === "instructor" ? specialization !== "" : true
      )
    },
    {
      title: "Identifiants",
      component: (
        <>
          <EmailField email={email} setEmail={setEmail} />
          <div className="mt-4">
            <PasswordField 
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </div>
        </>
      ),
      isValid: email !== "" && password !== "" && confirmPassword !== "" && isPasswordMatch
    },
    {
      title: "Confirmation",
      component: (
        <>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="font-medium text-sm mb-2">Récapitulatif</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nom:</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{email}</span>
              </div>
              {(profileType === "business" || profileType === "employee") && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entreprise:</span>
                  <span>{company}</span>
                </div>
              )}
              {profileType === "employee" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Poste:</span>
                  <span>{jobTitle}</span>
                </div>
              )}
              {profileType === "instructor" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spécialité:</span>
                  <span>{specialization}</span>
                </div>
              )}
            </div>
          </div>
          <TermsCheckbox 
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
          />
          <SocialLoginButtonsMobile />
        </>
      ),
      isValid: acceptTerms
    }
  ];

  if (isStepView) {
    return (
      <StepForm 
        steps={steps}
        onComplete={handleRegister}
        submitLabel="S'inscrire"
      />
    );
  }

  return (
    <motion.form 
      onSubmit={handleRegister}
      initial="hidden"
      animate="visible"
      variants={formContainer}
    >
      <div className="space-y-4">
        {/* Profile-specific fields */}
        <ProfileFields 
          profileType={profileType}
          name={name}
          setName={setName}
          company={company}
          setCompany={setCompany}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          specialization={specialization}
          setSpecialization={setSpecialization}
        />
        
        {/* Email field */}
        <EmailField email={email} setEmail={setEmail} />
        
        {/* Password fields */}
        <PasswordField 
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        
        {/* Terms checkbox */}
        <TermsCheckbox 
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
        />
        
        {/* Submit button */}
        <SubmitButton 
          profileType={profileType}
          isLoading={isLoading}
          isDisabled={!isFormValid || !isPasswordMatch}
        />

        {isMobile && (
          <div className="mt-2">
            <SocialLoginButtonsMobile />
          </div>
        )}
      </div>
    </motion.form>
  );
};

export default RegisterForm;
