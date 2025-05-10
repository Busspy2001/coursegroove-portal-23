
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    role: "admin",
    name: "Administrateur Démo"
  }
];

export const DemoAccounts = ({ isLoading }: { isLoading: boolean }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = React.useState(false);

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      await login(account.email, account.password);
      toast({
        title: "Connexion démo réussie !",
        description: `Bienvenue ${account.name}, vous êtes connecté en tant que ${account.role}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur de connexion démo",
        description: "Impossible de se connecter au compte démo. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        type="button"
        className="w-full flex items-center justify-between"
        onClick={() => setShowDemoAccounts(!showDemoAccounts)}
      >
        <span>Accès aux comptes démo</span>
        {showDemoAccounts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {showDemoAccounts && (
        <div className="mt-3 space-y-2 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-xs text-muted-foreground mb-2">
            Sélectionnez un compte de démonstration pour tester la plateforme:
          </p>
          {demoAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.email}</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleDemoLogin(account)}
                disabled={isLoading}
                variant="secondary"
              >
                Utiliser
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
