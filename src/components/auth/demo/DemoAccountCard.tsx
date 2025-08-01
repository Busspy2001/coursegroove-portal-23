import React from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info, Loader2, CheckCircle, User } from "lucide-react";
import { DemoAccount } from "./types";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { determineUserDashboard } from "@/contexts/auth/redirectionUtils";

export interface DemoAccountCardProps {
  account: DemoAccount;
  isLoading: boolean;
  isCurrentLoginAttempt?: boolean;
  icon?: React.ReactNode;
  onLogin: (account: DemoAccount, redirectCallback: (targetDashboard?: string) => void) => void;
}

export const DemoAccountCard: React.FC<DemoAccountCardProps> = ({ 
  account, 
  isLoading, 
  isCurrentLoginAttempt = false,
  icon,
  onLogin 
}) => {
  const navigate = useNavigate();

  // Gestion des couleurs et badges selon le rôle
  const getRoleBadgeStyles = () => {
    switch (account.role) {
      case "student":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";
      case "instructor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "super_admin":
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "business_admin":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "employee":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  // Traduction des rôles
  const getRoleLabel = () => {
    switch (account.role) {
      case "student": return "Étudiant";
      case "instructor": return "Instructeur";
      case "admin": return "Admin";
      case "super_admin": return "Super Admin";
      case "business_admin": return "Entreprise";
      case "employee": return "Employé";
      default: return account.role;
    }
  };
  
  // Enhanced click handler with centralized redirection
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoading) {
      try {
        // Notification visuelle que la connexion est en cours
        toast({
          title: "Connexion en cours",
          description: `Connexion au compte ${account.name}...`,
        });
        
        // Log pour débuggage
        console.log(`🔑 Tentative de connexion avec compte démo: ${account.email} (${account.role})`);
        
        // Enhanced callback that receives redirection info from the login handler
        const redirectCallback = (targetDashboard?: string) => {
          console.log(`🎯 Demo login callback - Target dashboard: ${targetDashboard}`);
          
          if (targetDashboard) {
            console.log(`🎯 Redirection directe vers ${targetDashboard}`);
            navigate(targetDashboard, { replace: true });
          } else {
            // Fallback redirection based on account role - provide all required User properties
            const fallbackDashboard = determineUserDashboard({ 
              id: 'demo-user', // Mock ID for demo accounts
              email: account.email, 
              roles: [account.role], 
              is_demo: true 
            });
            console.log(`🎯 Fallback redirection vers ${fallbackDashboard}`);
            navigate(fallbackDashboard, { replace: true });
          }
        };
        
        // Call the login function with the enhanced callback
        onLogin(account, redirectCallback);
        
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

  // Determine if this particular button should show loading
  const showLoading = isLoading && (isCurrentLoginAttempt || (!isCurrentLoginAttempt && !account.email));

  // Initialize default features if they don't exist
  const features = account.features || [
    "Accès au tableau de bord",
    "Consultation des formations",
    "Gestion du profil"
  ];

  return (
    <div className="group flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm hover:shadow">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
          <AvatarImage src={account.avatar} alt={account.name} />
          <AvatarFallback className="bg-schoolier-teal text-white">
            {account.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="ml-3">
          <div className="flex items-center">
            <p className="text-sm font-medium">{account.name}</p>
            <Badge variant="outline" className={`ml-2 text-xs px-1.5 py-0 ${getRoleBadgeStyles()}`}>
              {getRoleLabel()}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{account.email}</p>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline">
                <Info className="h-3 w-3 mr-1" /> Détails du compte
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={account.avatar} />
                    <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                </div>
                <p className="text-sm">{account.description || "Compte de démonstration"}</p>
                <div className="pt-2">
                  <p className="text-xs font-medium mb-1">Fonctionnalités disponibles :</p>
                  <ul className="text-xs space-y-1">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400 mr-1 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Identifiant : {account.email} <br />
                    Mot de passe : {account.password}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      <Button 
        size="sm" 
        onClick={handleLogin}
        disabled={isLoading}
        className="min-w-24 bg-schoolier-teal hover:bg-schoolier-dark-teal text-white font-medium"
      >
        {showLoading ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Connexion...
          </span>
        ) : (
          <span className="flex items-center">
            {icon || <User className="mr-1 h-4 w-4" />}
            Se connecter
          </span>
        )}
      </Button>
    </div>
  );
};
