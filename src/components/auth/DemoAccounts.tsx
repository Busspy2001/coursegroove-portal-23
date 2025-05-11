
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface DemoAccount {
  email: string;
  password: string;
  role: string;
  name: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    email: "student@schoolier.com",
    password: "password123",
    role: "student",
    name: "Etudiant Démo"
  },
  {
    email: "instructor@schoolier.com",
    password: "password123",
    role: "instructor",
    name: "Professeur Démo"
  },
  {
    email: "admin@schoolier.com",
    password: "password123",
    role: "business_admin",
    name: "Administrateur Démo"
  }
];

export const DemoAccounts = ({ isLoading }: { isLoading: boolean }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = useState(true); // Auto-expanded by default
  const [loggingIn, setLoggingIn] = useState<string | null>(null);

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      // Afficher l'état de chargement pour ce compte spécifique
      setLoggingIn(account.email);
      
      // Tentative de connexion simple sans logique complexe
      await login(account.email, account.password, true);
      
      // Afficher un message de succès
      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${account.name}, vous êtes connecté en tant que ${account.role}.`,
      });
      
      // Redirection basée sur le rôle
      if (account.role === 'instructor') {
        navigate('/instructor');
      } else if (account.role === 'business_admin' || account.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Erreur de connexion démo:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au compte de démonstration. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      // Réinitialiser l'état de chargement
      setLoggingIn(null);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-medium">Accès rapide aux comptes de démonstration</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          className="h-8 w-8 p-0"
        >
          {showDemoAccounts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2 mb-4 flex items-center">
        <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Utilisez ces comptes pour tester la plateforme sans avoir à vous inscrire
        </p>
      </div>
      
      {showDemoAccounts && (
        <div className="space-y-2">
          {demoAccounts.map((account, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">{account.email}</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Compte de démonstration</h4>
                        <p className="text-xs">Email: <span className="font-medium">{account.email}</span></p>
                        <p className="text-xs">Mot de passe: <span className="font-medium">{account.password}</span></p>
                        <p className="text-xs">Rôle: <span className="font-medium capitalize">{account.role}</span></p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleDemoLogin(account)}
                disabled={isLoading || loggingIn !== null}
                className="bg-schoolier-teal hover:bg-schoolier-dark-teal"
              >
                {loggingIn === account.email ? "Connexion..." : "Se connecter"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
