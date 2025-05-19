
import React from "react";
import { motion } from "framer-motion";
import { useRegisterForm } from "./useRegisterForm";
import { ProfileFields } from "./ProfileFields";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { TermsCheckbox } from "./TermsCheckbox";
import { SubmitButton } from "./SubmitButton";

type ProfileType = "student" | "instructor" | "business" | "employee";

interface RegisterFormProps {
  profileType?: ProfileType;
}

export const RegisterForm = ({ profileType = "student" }: RegisterFormProps) => {
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

  return (
    <motion.form 
      onSubmit={handleRegister}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05 }}
    >
      <div className="space-y-3">
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
      </div>
    </motion.form>
  );
};

export default RegisterForm;
