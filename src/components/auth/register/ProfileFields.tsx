
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Briefcase, User } from "lucide-react";
import { motion } from "framer-motion";

type ProfileType = "student" | "instructor" | "business" | "employee";

interface ProfileFieldsProps {
  profileType: ProfileType;
  name: string;
  setName: (name: string) => void;
  company: string;
  setCompany: (company: string) => void;
  jobTitle: string;
  setJobTitle: (jobTitle: string) => void;
  specialization: string;
  setSpecialization: (specialization: string) => void;
}

export const ProfileFields: React.FC<ProfileFieldsProps> = ({
  profileType,
  name,
  setName,
  company,
  setCompany,
  jobTitle,
  setJobTitle,
  specialization,
  setSpecialization
}) => {
  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
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
        <motion.div variants={formItemVariant} className="space-y-2 mt-4">
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
        <>
          <motion.div variants={formItemVariant} className="space-y-2 mt-4">
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
          
          <motion.div variants={formItemVariant} className="space-y-2 mt-4">
            <Label htmlFor="jobTitle" className="text-sm font-medium">Poste actuel</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="jobTitle"
                type="text"
                placeholder="Votre poste actuel"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="pl-10 h-9"
                required
              />
            </div>
          </motion.div>
        </>
      )}
      
      {profileType === "instructor" && (
        <motion.div variants={formItemVariant} className="space-y-2 mt-4">
          <Label htmlFor="specialization" className="text-sm font-medium">Spécialité</Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="specialization"
              type="text"
              placeholder="Ex: Développement Web"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="pl-10 h-9"
              required
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProfileFields;
