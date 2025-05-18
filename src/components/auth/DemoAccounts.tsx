
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { DemoAccountCard } from './demo/DemoAccountCard';
import { DemoInfoAlert } from './demo/DemoInfoAlert';
import { Book, Briefcase, Building, GraduationCap } from 'lucide-react';
import { DemoAccount } from './demo/types';
import { getDemoAccounts } from './demo/demoAccountService';

// Profile-specific demo accounts mapping
const demoAccountsByType: Record<string, string[]> = {
  student: ['etudiant@schoolier.com'],
  instructor: ['prof@schoolier.com'],
  business: ['business@schoolier.com', 'entreprise@schoolier.com'],
  employee: ['employee@schoolier.com']
};

// Map profile types to icons
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
  const [accounts, setAccounts] = React.useState<DemoAccount[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // Get the appropriate demo accounts for the selected profile
  React.useEffect(() => {
    const allAccounts = getDemoAccounts();
    const emails = demoAccountsByType[profileType] || [];
    
    // Filter accounts based on the profile type
    const filteredAccounts = allAccounts.filter(account => 
      emails.includes(account.email)
    );
    
    setAccounts(filteredAccounts);
    setLoading(false);
    
    console.log(`Loaded ${filteredAccounts.length} demo accounts for profile type: ${profileType}`);
  }, [profileType]);
  
  const ProfileIcon = profileIcons[profileType];
  
  if (loading) {
    return <div className="text-center py-4">Chargement des comptes de démonstration...</div>;
  }
  
  return (
    <div className="space-y-3">
      <DemoInfoAlert />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {accounts.map((account, index) => (
          <DemoAccountCard
            key={index}
            account={account}
            onLogin={() => loginWithDemo(account)}
            icon={<ProfileIcon className="h-5 w-5" />}
            isLoading={isLoggingIn}
          />
        ))}
        {accounts.length === 0 && (
          <div className="col-span-2 text-center py-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-muted-foreground">Aucun compte de démonstration disponible pour ce profil.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoAccounts;
