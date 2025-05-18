
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import DemoAccountCard from './demo/DemoAccountCard';
import DemoInfoAlert from './demo/DemoInfoAlert';
import { Book, Briefcase, Building, GraduationCap } from 'lucide-react';

// Profile-specific demo accounts
const demoAccounts = {
  student: [
    {
      name: "Étudiant Démo",
      email: "student@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      role: "student"
    }
  ],
  instructor: [
    {
      name: "Enseignant Démo",
      email: "instructor@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
      role: "instructor"
    }
  ],
  business: [
    {
      name: "Entreprise Démo",
      email: "business@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      role: "business_admin"
    }
  ],
  employee: [
    {
      name: "Employé Démo",
      email: "employee@demo.com",
      password: "demo1234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      role: "employee"
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
