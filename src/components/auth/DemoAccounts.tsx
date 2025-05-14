
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { toast } from '@/hooks/use-toast';

import { DemoAccountCard } from './demo/DemoAccountCard';
import { DemoInfoAlert } from './demo/DemoInfoAlert';
import { getDemoAccounts } from './demo/demoAccountService';
import { DemoAccount } from './demo/types';
import { ensureDemoAccountsExist } from './demo/initDemoAccounts';

interface DemoAccountsProps {
  isLoading?: boolean;
}

const DemoAccounts: React.FC<DemoAccountsProps> = ({ isLoading: externalIsLoading }) => {
  const navigate = useNavigate();
  const { loginWithDemo, isLoggingIn } = useAuth();
  const demoAccounts = getDemoAccounts();
  const [loggingInAccount, setLoggingInAccount] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  
  // État de chargement global
  const isLoading = externalIsLoading || isLoggingIn || !!loggingInAccount || initializing;

  // S'assurer que les comptes démo existent au chargement du composant
  useEffect(() => {
    const initAccounts = async () => {
      try {
        await ensureDemoAccountsExist();
      } finally {
        setInitializing(false);
      }
    };
    
    initAccounts();
  }, []);

  // Fonction de connexion optimisée avec redirection immédiate garantie
  const handleLogin = async (account: DemoAccount) => {
    if (isLoading) return;
    
    // Mettre à jour l'état de chargement en premier
    setLoggingInAccount(account.email);
    
    // Prédéterminer la destination basée sur le rôle
    const destination = getRoleDestination(account.role);
    console.log(`🚀 Démarrage de la connexion pour ${account.role} (${account.email}) avec redirection vers ${destination}`);
    
    try {
      // Commencer le processus de connexion
      const user = await loginWithDemo(account.email, account.password);
      
      console.log(`✅ Connexion réussie pour ${account.role}, redirection vers ${destination}`);
      
      // Notification de connexion réussie
      toast({
        title: "Connexion réussie",
        description: `Vous êtes maintenant connecté en tant que ${account.name}`,
      });
      
      // Redirection immédiate vers le tableau de bord approprié
      // Utilisation de replace:true pour empêcher le retour à la page de login
      navigate(destination, { replace: true });
      
    } catch (error) {
      console.error(`❌ Erreur de connexion démo pour ${account.role}:`, error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au compte de démonstration. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      // Toujours réinitialiser l'état de chargement
      setLoggingInAccount(null);
    }
  };
  
  // Fonction utilitaire pour déterminer la destination en fonction du rôle
  const getRoleDestination = (role: string): string => {
    switch (role) {
      case 'student': return '/dashboard';
      case 'instructor': return '/instructor';
      case 'admin':
      case 'super_admin': 
        return '/admin';
      case 'business_admin': 
        return '/business';
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
