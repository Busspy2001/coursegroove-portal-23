
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { DemoAccountCard } from './demo/DemoAccountCard';
import { DemoInfoAlert } from './demo/DemoInfoAlert';
import { Book, Briefcase, Building, GraduationCap } from 'lucide-react';
import { DemoAccount } from './demo/types';
import { v4 as uuidv4 } from 'uuid';

// Profile-specific demo accounts
const demoAccounts: Record<string, DemoAccount[]> = {
  student: [
    {
      id: uuidv4(),
      name: "Étudiant Démo",
      email: "student@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      role: "student",
      description: "Accédez à des milliers de cours et progressez à votre rythme",
      features: [
        "Parcourir le catalogue de cours",
        "Suivre des cours et compléter des leçons",
        "Recevoir des certificats",
        "Interagir avec la communauté"
      ]
    }
  ],
  instructor: [
    {
      id: uuidv4(),
      name: "Enseignant Démo",
      email: "instructor@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
      role: "instructor",
      description: "Partagez votre expertise et créez des cours de qualité",
      features: [
        "Créer et publier des cours",
        "Analyser les statistiques des cours",
        "Interagir avec les étudiants",
        "Gérer les revenus et paiements"
      ]
    }
  ],
  business: [
    {
      id: uuidv4(),
      name: "Entreprise Démo",
      email: "business@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      role: "business_admin",
      description: "Gérez la formation de vos équipes et suivez leurs progrès",
      features: [
        "Gérer les utilisateurs de l'entreprise",
        "Suivre les progrès de l'équipe",
        "Attribuer des cours et parcours",
        "Analyser les résultats de formation"
      ]
    }
  ],
  employee: [
    {
      id: uuidv4(),
      name: "Employé Démo",
      email: "employee@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      role: "employee",
      description: "Accédez aux formations fournies par votre entreprise",
      features: [
        "Accéder aux cours assignés",
        "Suivre votre progression",
        "Obtenir des certifications",
        "Communiquer avec les formateurs"
      ]
    }
  ]
};

const profileIcons = {
  student: GraduationCap,
  instructor: Book,
  business: Building,
  employee: Briefcase
};

type ProfileType = "student" | "instructor" | "business" | "employee";

interface DemoAccountsProps {
  profileType?: ProfileType;
}

const DemoAccounts = ({ profileType = "student" }: DemoAccountsProps) => {
  const { loginWithDemo, isLoggingIn } = useAuth();
  
  // Get the appropriate demo accounts for the selected profile
  const filteredAccounts = demoAccounts[profileType];
  const ProfileIcon = profileIcons[profileType];
  
  return (
    <div className="space-y-3">
      <DemoInfoAlert />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredAccounts.map((account, index) => (
          <DemoAccountCard
            key={index}
            account={account}
            onLogin={() => loginWithDemo(account)}
            icon={<ProfileIcon className="h-5 w-5" />}
            isLoading={isLoggingIn}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoAccounts;
