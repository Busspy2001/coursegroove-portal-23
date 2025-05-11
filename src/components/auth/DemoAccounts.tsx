
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

export const DemoAccounts = ({ isLoading: parentIsLoading }: { isLoading: boolean }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // Réinitialiser l'erreur quand l'utilisateur ouvre/ferme la section
  useEffect(() => {
    setLoginError(null);
  }, [showDemoAccounts]);

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      // Réinitialiser les états
      setLoginError(null);
      setLoggingIn(account.email);
      
      // Timeout pour les connexions bloquées
      const loginPromise = login(account.email, account.password, true);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("La connexion a pris trop de temps.")), 5000);
      });
      
      // Tentative de connexion avec timeout
      const user = await Promise.race([loginPromise, timeoutPromise]);
      
      // Connexion réussie, préparer la redirection
      setRedirecting(true);
      
      // Déterminer la destination en fonction du rôle
      const destinations = {
        'instructor': '/instructor',
        'admin': '/admin',
        'business_admin': '/admin',
        'student': '/dashboard'
      };
      
      const destination = destinations[user.role as keyof typeof destinations] || '/dashboard';
      console.log(`🚀 Redirection vers ${destination} pour l'utilisateur avec le rôle ${user.role}`);
      
      // Redirection immédiate
      navigate(destination);
      
    } catch (error: any) {
      // Erreur de connexion
      setLoginError(error.message || "Impossible de se connecter au compte de démonstration.");
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter au compte de démonstration.",
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
      
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      {redirecting && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <svg className="animate-spin h-4 w-4 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <AlertDescription>Redirection vers votre tableau de bord...</AlertDescription>
        </Alert>
      )}
      
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
                disabled={parentIsLoading || loggingIn !== null || redirecting}
                className="bg-schoolier-teal hover:bg-schoolier-dark-teal"
              >
                {loggingIn === account.email ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : "Se connecter"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
