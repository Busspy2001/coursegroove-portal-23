
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const { login, isLoading, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [isDemo, setIsDemo] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    // Check if the email corresponds to a demo account
    setIsDemo(isDemoAccount(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isLoggingIn || localLoading) return;
    
    setLocalLoading(true);
    setError("");
    
    try {
      const user = await login(email, password, () => {
        // Success handling moved to the callback for better async control
        if (searchParams.get("redirect")) {
          navigate(searchParams.get("redirect") as string);
        } else {
          // Use the demo-redirect for intelligent routing based on role
          navigate("/demo-redirect");
        }
      });

      console.log("Login succeeded!");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Une erreur s'est produite lors de la connexion.");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="container grid h-screen place-items-center">
      <Card className="w-[350px] md:w-[450px] lg:w-[550px] shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>Entrez votre email et mot de passe pour vous connecter</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <div className="grid gap-2">
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
            <Button disabled={isLoggingIn || localLoading} className="w-full mt-4 bg-schoolier-teal hover:bg-schoolier-dark-teal text-white font-medium">
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
        </CardContent>
        <div className="p-6 pt-0 text-center">
          <Separator />
          <div className="mt-4 text-sm">
            <Link to="/forgot-password" className="hover:underline text-muted-foreground">
              Mot de passe oublié?
            </Link>
          </div>
          <div className="mt-2 text-sm">
            Pas de compte?{" "}
            <Link to="/register" className="text-schoolier-teal hover:underline">
              S'inscrire
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
