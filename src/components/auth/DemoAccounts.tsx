
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { demoAccounts } from "./demo/types";
import { DemoAccountCard } from "./demo/DemoAccountCard";
import { DemoInfoAlert } from "./demo/DemoInfoAlert";
import { createDemoAccount } from "./demo/demoAccountService";
import { DemoAccount } from "./demo/types";

export { demoAccounts, DemoAccount } from "./demo/types";

export const DemoAccounts = ({ isLoading: parentIsLoading }: { isLoading: boolean }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  // Reset error when section is toggled
  useEffect(() => {
    setLoginError(null);
  }, [showDemoAccounts]);

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      // Reset states
      setLoginError(null);
      setLoggingIn(account.email);
      
      // Try to create the account if it doesn't exist
      setCreatingAccount(true);
      await createDemoAccount(account);
      setCreatingAccount(false);
      
      // Add additional logging
      console.log(`Tentative de connexion avec le compte ${account.email}, rôle attendu: ${account.role}`);
      
      // Timeout for blocked connections
      const loginPromise = login(account.email, account.password, true);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("La connexion a pris trop de temps.")), 5000);
      });
      
      // Login attempt with timeout
      const user = await Promise.race([loginPromise, timeoutPromise]);
      
      // Log user information after login
      console.log("Utilisateur connecté:", user);
      console.log(`Rôle après connexion: ${user.role}`);
      
      // Prepare for redirection
      setRedirecting(true);
      
      // Determine destination based on role
      let destination;
      
      // Simplify redirection logic
      const adminRoles = ["admin", "super_admin", "business_admin"];
      
      if (adminRoles.includes(user.role)) {
        destination = '/admin';
        console.log(`🚀 Redirection vers le dashboard admin pour ${user.role}`);
      } else if (user.role === 'instructor') {
        destination = '/instructor';
        console.log(`🚀 Redirection vers le dashboard instructeur`);
      } else {
        destination = '/dashboard';
        console.log(`🚀 Redirection vers le dashboard standard`);
      }
      
      // Immediate redirection
      navigate(destination);
      
    } catch (error: any) {
      // Login error
      console.error("Erreur de connexion:", error);
      setLoginError(error.message || "Impossible de se connecter au compte de démonstration.");
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter au compte de démonstration.",
        variant: "destructive",
      });
    } finally {
      // Reset loading state
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
      
      <DemoInfoAlert />
      
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
      
      {creatingAccount && (
        <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
          <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <AlertDescription>Création du compte de démonstration...</AlertDescription>
        </Alert>
      )}
      
      {showDemoAccounts && (
        <div className="space-y-2">
          {demoAccounts.map((account, index) => (
            <DemoAccountCard 
              key={index}
              account={account}
              isLoading={parentIsLoading || redirecting || creatingAccount}
              loggingIn={loggingIn}
              onLogin={handleDemoLogin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoAccounts;
