
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

import { DemoAccountCard } from './demo/DemoAccountCard';
import { DemoInfoAlert } from './demo/DemoInfoAlert';
import { getDemoAccounts } from './demo/demoAccountService';
import { DemoAccount } from './demo/types';

interface DemoAccountsProps {
  isLoading?: boolean;
}

const DemoAccounts: React.FC<DemoAccountsProps> = ({ isLoading: externalIsLoading }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loginWithDemo, isLoggingIn } = useAuth();
  const demoAccounts = getDemoAccounts();
  const [loggingInAccount, setLoggingInAccount] = useState<string | null>(null);
  
  const isLoading = externalIsLoading || isLoggingIn || !!loggingInAccount;

  // Optimized login handler with immediate navigation intent
  const handleLogin = async (account: DemoAccount) => {
    if (isLoading) return;
    
    // Set the loading state first
    setLoggingInAccount(account.email);
    
    // Pre-determine destination based on role
    const destination = getRoleDestination(account.role);
    console.log(`🚀 Démarrage de la connexion pour ${account.role} (${account.email}) avec redirection vers ${destination}`);
    
    try {
      // Start login process
      await loginWithDemo(account.email, account.password)
        .then(() => {
          console.log(`✅ Connexion réussie, redirection vers ${destination}`);
          // Immediate redirect to appropriate dashboard
          navigate(destination, { replace: true });
        })
        .catch((error) => {
          console.error("❌ Erreur de connexion démo:", error);
          toast({
            title: "Erreur de connexion",
            description: "Impossible de se connecter au compte de démonstration",
            variant: "destructive",
          });
        });
    } finally {
      setLoggingInAccount(null);
    }
  };
  
  // Helper function to determine destination based on role
  const getRoleDestination = (role: string): string => {
    switch (role) {
      case 'student': return '/dashboard';
      case 'instructor': return '/instructor';
      case 'admin':
      case 'super_admin': 
        return '/admin';
      case 'business_admin': 
        return '/admin';
      default: return '/dashboard';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <DemoInfoAlert />
      
      <Tabs defaultValue="student" className="w-full mt-6">
        <TabsList className="flex w-full overflow-x-auto no-scrollbar justify-start md:justify-center">
          <TabsTrigger value="student">Étudiant</TabsTrigger>
          <TabsTrigger value="instructor">Instructeur</TabsTrigger>
          <TabsTrigger value="admin">Administrateur</TabsTrigger>
          <TabsTrigger value="business">Entreprise</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 gap-6 mt-6">
          <TabsContent value="student">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'student')!}
              onLogin={handleLogin}
              isLoading={isLoading && loggingInAccount === demoAccounts.find(a => a.role === 'student')?.email}
            />
          </TabsContent>
          
          <TabsContent value="instructor">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'instructor')!}
              onLogin={handleLogin}
              isLoading={isLoading && loggingInAccount === demoAccounts.find(a => a.role === 'instructor')?.email}
            />
          </TabsContent>
          
          <TabsContent value="admin">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'admin')!}
              onLogin={handleLogin}
              isLoading={isLoading && loggingInAccount === demoAccounts.find(a => a.role === 'admin')?.email}
            />
          </TabsContent>
          
          <TabsContent value="business">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'business_admin')!}
              onLogin={handleLogin}
              isLoading={isLoading && loggingInAccount === demoAccounts.find(a => a.role === 'business_admin')?.email}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DemoAccounts;
