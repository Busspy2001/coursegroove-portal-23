
import React from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { DemoAccount } from "./types";
import { toast } from "@/hooks/use-toast";

interface DemoAccountCardProps {
  account: DemoAccount;
  isLoading: boolean;
  onClick: (account: DemoAccount) => void;
}

export const DemoAccountCard: React.FC<DemoAccountCardProps> = ({ 
  account, 
  isLoading, 
  onClick 
}) => {
  // Gestionnaire de clic optimisé avec retour d'état et notification
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Évite la propagation de l'événement
    
    if (!isLoading) {
      console.log(`📲 Tentative de connexion pour ${account.role}: ${account.email}`);
      
      try {
        // Notification visuelle que la connexion est en cours
        toast({
          title: "Connexion en cours",
          description: `Connexion au compte ${account.name}...`,
        });
        
        // Appel de la fonction de connexion
        onClick(account);
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        toast({
          title: "Échec de la connexion",
          description: "Un problème est survenu. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Déterminer le texte du bouton en fonction du rôle
  const getButtonText = () => {
    if (isLoading) {
      return (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connexion...
        </span>
      );
    }
    
    return account.role === "business_admin" ? "Accéder à mon entreprise" : "Se connecter";
  };
  
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
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
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-schoolier-teal hover:bg-schoolier-dark-teal font-medium"
      >
        {getButtonText()}
      </Button>
    </div>
  );
};
