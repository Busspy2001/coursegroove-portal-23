
import React, { useState } from "react";
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
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState<string | null>(null);

  const ensureAccountExists = async (account: DemoAccount): Promise<boolean> => {
    try {
      setCreatingAccount(account.email);
      
      // Check if user exists by email in auth
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
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
      
      // Auth failed - account might not exist, try to register it as a demo account
      try {
        console.log("Attempting to register demo account:", account.email);
        
        // Create demo account with auto-confirmation
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: account.email,
          password: account.password,
          options: {
            data: {
              name: account.name
            }
          }
        });
        
        if (signUpError) {
          console.error("Failed to create demo account:", signUpError);
          throw signUpError;
        }
        
        if (signUpData.user) {
          // Wait a moment for auth to complete
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Update the user profile role
          const { error: updateError } = await supabase
            .from('profiles_unified' as unknown as never)
            .update({ 
              role: account.role, 
              is_demo: true,
              full_name: account.name
            } as unknown as never)
            .eq('id', signUpData.user.id);
            
          if (updateError) {
            console.error("Failed to update role:", updateError);
          }
          
          toast({
            title: "Compte démo créé",
            description: `Le compte démo ${account.name} a été créé avec succès.`,
          });
          
          return true;
        }
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
      
      // Direct login with Supabase to avoid any issues with custom login flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: account.password
      });
      
      if (error) {
        throw error;
      }
      
      // Success! Show toast and navigate
      toast({
        title: "Connexion démo réussie !",
        description: `Bienvenue ${account.name}, vous êtes connecté en tant que ${account.role}.`,
      });
      
      // Redirect based on role
      if (account.role === 'instructor') {
        navigate('/instructor');
      } else if (account.role === 'business_admin' || account.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
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
