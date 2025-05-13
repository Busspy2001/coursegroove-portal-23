
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
  
  const isLoading = externalIsLoading || isLoggingIn;

  const handleLogin = async (email: string, password: string, role: string) => {
    if (isLoading) return;
    
    setLoggingInAccount(email);
    
    try {
      await loginWithDemo(email, password);
      
      toast({
        title: "Connexion réussie",
        description: `Vous êtes connecté en tant que compte ${role} de démonstration.`,
      });

      // Redirect based on role
      if (role === 'student') {
        navigate('/dashboard');
      } else if (role === 'instructor') {
        navigate('/instructor');
      } else if (role === 'admin' || role === 'super_admin' || role === 'business_admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error("Erreur de connexion démo:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au compte de démonstration",
        variant: "destructive",
      });
    } finally {
      setLoggingInAccount(null);
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
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="instructor">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'instructor')!}
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="admin">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'admin')!}
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="business">
            <DemoAccountCard
              account={demoAccounts.find(a => a.role === 'business_admin')!}
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DemoAccounts;
