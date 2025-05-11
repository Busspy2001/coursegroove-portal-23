
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
    role: "business_admin",
    name: "Administrateur Démo"
  }
];

export const DemoAccounts = ({ isLoading }: { isLoading: boolean }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = React.useState(false);
  const [creatingAccount, setCreatingAccount] = React.useState<string | null>(null);

  // Completely rewritten function with simplified logic to avoid TypeScript recursion issues
  const ensureAccountExists = async (account: DemoAccount): Promise<boolean> => {
    try {
      setCreatingAccount(account.email);
      
      // First check if user exists by email in auth
      const { data: authData } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password
      });
      
      // If we can sign in, the account exists
      if (authData.user) {
        console.log("Account exists, authenticated successfully");
        return true;
      }
    } catch (authError) {
      console.log("Auth check error (expected if new account):", authError);
      
      // If auth error is not about invalid credentials, it's another issue
      if (!String(authError).includes("Invalid login credentials")) {
        console.error("Unexpected auth error:", authError);
        return false;
      }
      
      // Auth failed - account might not exist, try to register it
      try {
        console.log("Attempting to register account:", account.email);
        await register(account.name, account.email, account.password);
        
        // If not a student, update the role (register creates with student role by default)
        if (account.role !== 'student') {
          // Wait a moment for auth to complete
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Get the current user
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData?.user?.id) {
            console.log("Updating role for new user:", account.role);
            
            // Using type assertion with as unknown first to bypass strict TypeScript errors
            const { error: updateError } = await (supabase
              .from('profiles_unified' as unknown as never)
              .update({ role: account.role, is_demo: true } as unknown as never)
              .eq('id', userData.user.id));
              
            if (updateError) {
              console.error("Failed to update role:", updateError);
            }
          }
        }
        
        toast({
          title: "Compte démo créé",
          description: `Le compte démo ${account.name} a été créé avec succès.`,
        });
        
        return true;
      } catch (registerError) {
        console.error("Registration error:", registerError);
        
        // If error indicates user already exists, that's actually good
        if (String(registerError).includes("already registered") || 
            String(registerError).includes("already exists")) {
          return true;
        }
        
        return false;
      }
    } finally {
      setCreatingAccount(null);
    }
    
    return false;
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
