
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Book, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur Schoolier.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex">
        {/* Left side: Login form */}
        <Card className="w-full md:w-1/2 shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register" onClick={handleRegisterClick}>Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Book className="h-10 w-10 text-schoolier-teal" />
                  <span className="text-2xl font-bold ml-2">Schoolier</span>
                </div>
                <CardTitle className="text-2xl text-center">Connexion à votre compte</CardTitle>
                <CardDescription className="text-center">
                  Entrez vos identifiants pour accéder à vos cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link to="/forgot-password" className="text-sm text-schoolier-blue hover:underline">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe} 
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                      />
                      <Label htmlFor="remember">Se souvenir de moi</Label>
                    </div>
                    <Button type="submit" className="w-full bg-schoolier-teal hover:bg-schoolier-dark-teal" disabled={isLoading}>
                      {isLoading ? "Connexion en cours..." : "Se connecter"}
                    </Button>
                  </div>
                </form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">Ou connectez-vous avec</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Pas encore de compte ?{" "}
                  <Link to="/register" className="text-schoolier-blue hover:underline">
                    S'inscrire
                  </Link>
                </p>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Right side: Image and text (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-blue to-schoolier-teal rounded-r-xl text-white">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Bienvenue sur Schoolier</h2>
            <p className="mb-6">
              Accédez à des milliers de cours de qualité et développez vos compétences avec des instructeurs experts.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-2 mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Profil personnel</h3>
                  <p className="text-sm text-blue-100">Suivez votre progression et vos certificats</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-2 mr-4">
                  <Book className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Bibliothèque de cours</h3>
                  <p className="text-sm text-blue-100">Accédez à tous vos cours en un seul endroit</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-white/20 p-2 mr-4">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Sécurité garantie</h3>
                  <p className="text-sm text-blue-100">Vos données sont protégées et sécurisées</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
