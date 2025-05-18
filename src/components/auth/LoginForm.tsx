
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { isDemoAccount } from "./demo/demoAccountService";

interface LoginFormProps {
  profileType?: string;
}

const LoginForm = ({ profileType }: LoginFormProps) => {
  const { login, isLoading, isLoggingIn, authStateReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [isDemo, setIsDemo] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  // Check if the email corresponds to a demo account
  useEffect(() => {
    setIsDemo(isDemoAccount(email));
  }, [email]);

  // Gestion de la redirection après connexion
  const getRedirectPath = () => {
    // Vérifier si nous avons un chemin de redirection explicite
    const redirectParam = searchParams.get("redirect");
    if (redirectParam) return redirectParam;
    
    // Vérifier l'état de localisation pour un URL de retour
    const locationState = location.state as { from?: Location, returnUrl?: string } | null;
    if (locationState?.returnUrl) return locationState.returnUrl;
    if (locationState?.from?.pathname) return locationState.from.pathname;
    
    // Par défaut, utiliser demo-redirect pour une redirection intelligente
    return "/demo-redirect";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isLoggingIn || localLoading) return;
    
    setLocalLoading(true);
    setError("");
    
    try {
      await login(email, password, () => {
        toast({
          title: "Connexion réussie",
          description: "Redirection vers votre tableau de bord...",
        });
      });

      console.log("✅ Login succeeded!");
      setLoginSuccessful(true);
      
      // Redirection avec un léger délai pour s'assurer que l'état auth est mis à jour
      setTimeout(() => {
        const redirectPath = getRedirectPath();
        console.log(`🚀 Redirection vers ${redirectPath}`);
        navigate(redirectPath, { replace: true });
      }, 500);
      
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Une erreur s'est produite lors de la connexion.");
      
      toast({
        title: "Erreur de connexion",
        description: err.message || "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
      
      setLocalLoading(false);
    }
  };

  // Éviter de rendre à nouveau le formulaire si la connexion a réussi
  if (loginSuccessful) {
    return (
      <div className="text-center py-4">
        <Icons.spinner className="inline-block h-8 w-8 animate-spin text-schoolier-teal" />
        <p className="mt-2">Connexion réussie, redirection en cours...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemple@schoolier.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            {error}
          </p>
        )}
        <Button 
          disabled={isLoggingIn || localLoading || !authStateReady || isLoading} 
          className="w-full mt-4 bg-schoolier-teal hover:bg-schoolier-dark-teal text-white font-medium"
        >
          {isLoggingIn || localLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4" />
              Chargement...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>
      <Button variant="outline" disabled className="w-full justify-center">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
};

export default LoginForm;
