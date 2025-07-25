
import React from 'react';
import { GraduationCap, Book, Building, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type ProfileType = "student" | "instructor" | "business" | "employee";

interface ProfileOption {
  id: ProfileType;
  title: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

interface MobileProfileSelectorProps {
  activeProfile: ProfileType;
  onProfileChange: (profile: ProfileType) => void;
}

export const MobileProfileSelector: React.FC<MobileProfileSelectorProps> = ({ activeProfile, onProfileChange }) => {
  const profiles: ProfileOption[] = [
    {
      id: "student",
      title: "Étudiant",
      icon: GraduationCap,
      color: "bg-gradient-to-r from-schoolier-blue to-schoolier-dark-blue",
    },
    {
      id: "instructor",
      title: "Enseignant",
      icon: Book,
      color: "bg-gradient-to-r from-schoolier-teal to-schoolier-dark-teal",
    },
    {
      id: "business",
      title: "Entreprise",
      icon: Building,
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
    },
    {
      id: "employee",
      title: "Employé",
      icon: Briefcase,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="mb-6">
      <p className="text-sm text-center mb-3 text-muted-foreground">Type de compte</p>
      <ScrollArea className="w-full pb-2">
        <div className="flex space-x-3 px-1 pb-1 min-w-full">
          {profiles.map((profile) => (
            <ProfileButton
              key={profile.id}
              profile={profile}
              isActive={activeProfile === profile.id}
              onClick={() => onProfileChange(profile.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ProfileButtonProps {
  profile: ProfileOption;
  isActive: boolean;
  onClick: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ profile, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`relative flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-lg h-auto min-w-16 transition-all ${
        isActive ? 'bg-muted' : ''
      }`}
    >
      <motion.div 
        className={`rounded-full p-2 ${isActive ? profile.color : 'bg-gray-100 dark:bg-gray-800'} mb-2`}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <profile.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
      </motion.div>
      <span className="text-xs whitespace-nowrap font-medium">{profile.title}</span>
      {isActive && (
        <motion.div
          layoutId="profileIndicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Button>
  );
};

export default MobileProfileSelector;
