
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info, Loader2, AlertCircle } from "lucide-react";
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

  // Timeout pour éviter les blocages indéfinis
  useEffect(() => {
    let timeout: number | undefined;
    
    if (loggingIn) {
      timeout = window.setTimeout(() => {
        if (loggingIn) {
          setLoggingIn(null);
          setLoginError("La connexion a pris trop de temps. Veuillez réessayer.");
          toast({
            title: "Délai d'attente dépassé",
            description: "La connexion a pris trop de temps. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      }, 10000); // 10 secondes de timeout
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loggingIn, toast]);

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      // Réinitialiser les états
      setLoginError(null);
      setLoggingIn(account.email);
      console.log(`🚀 Tentative de connexion avec le compte ${account.role}:`, account.email);
      
      // Tentative de connexion
      const user = await login(account.email, account.password, true);
      console.log("✅ Connexion réussie:", user);
      
      // Afficher un message de succès
      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${account.name}, vous êtes connecté en tant que ${account.role}.`,
      });
      
      // Indiquer la redirection
      setRedirecting(true);
      
      // Redirection basée sur le rôle après un court délai pour laisser le temps à l'utilisateur de voir le toast
      setTimeout(() => {
        console.log(`🔄 Redirection vers le tableau de bord pour le rôle: ${account.role}`);
        if (account.role === 'instructor') {
          navigate('/instructor');
        } else if (account.role === 'business_admin' || account.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 500);
      
    } catch (error: any) {
      console.error("❌ Erreur de connexion démo:", error);
      
      // Message d'erreur spécifique
      const errorMessage = error.message || "Impossible de se connecter au compte de démonstration.";
      setLoginError(errorMessage);
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
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
          <Loader2 className="h-4 w-4 mr-2 animate-spin text-green-600" />
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
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
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
