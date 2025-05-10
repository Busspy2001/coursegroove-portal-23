import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = React.useState(false);
  const [creatingAccount, setCreatingAccount] = React.useState<string | null>(null);

  const ensureAccountExists = async (account: DemoAccount): Promise<boolean> => {
    try {
      // First check if the user already exists
      const { data } = await supabase
        .from('profiles_unified')
        .select('id')
        .eq('email', account.email)
        .single();
      
      // If the user exists, return true
      if (data) {
        return true;
      }
      
      // User doesn't exist, create the account
      setCreatingAccount(account.email);
      
      // Register the new user with auth service
      await register(account.name, account.email, account.password);
      
      // Need to update role if not a student
      if (account.role !== 'student') {
        const userResponse = await supabase.auth.getUser();
        const userData = userResponse.data;
        
        if (userData?.user?.id) {
          await supabase
            .from('profiles_unified')
            .update({ role: account.role })
            .eq('id', userData.user.id);
        }
      }

      toast({
        title: "Compte démo créé",
        description: `Le compte démo ${account.name} a été créé avec succès.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error ensuring demo account exists:", error);
      // If we get a "User already registered" error, we can continue with login
      const errorMessage = String(error);
      if (errorMessage.includes("already registered") || errorMessage.includes("already exists")) {
        return true;
      }
      return false;
    } finally {
      setCreatingAccount(null);
    }
  };

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      // First ensure the account exists
      const accountExists = await ensureAccountExists(account);
      
      if (!accountExists) {
        toast({
          title: "Erreur de configuration",
          description: "Impossible de créer le compte démo. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }
      
      // Then login with the account
      await login(account.email, account.password);
      toast({
        title: "Connexion démo réussie !",
        description: `Bienvenue ${account.name}, vous êtes connecté en tant que ${account.role}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Demo login error:", error);
      toast({
        title: "Erreur de connexion démo",
        description: "Impossible de se connecter au compte démo. Veuillez réessayer.",
        variant: "destructive",
      });
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
                disabled={isLoading || creatingAccount !== null}
                variant="secondary"
              >
                {creatingAccount === account.email ? "Création..." : "Utiliser"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
