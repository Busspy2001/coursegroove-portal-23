
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Lock, CheckCircle, Github, Twitter } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Simple password strength check
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur Schoolier !",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de créer votre compte. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Inscription sociale",
      description: `L'inscription avec ${provider} sera disponible prochainement.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
            <CardDescription>
              Rejoignez Schoolier pour accéder à des milliers de cours
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="student" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" onClick={() => setUserRole("student")}>
                  Étudiant
                </TabsTrigger>
                <TabsTrigger value="instructor" onClick={() => setUserRole("instructor")}>
                  Instructeur
                </TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <p className="text-sm text-muted-foreground mb-4">
                  Inscrivez-vous en tant qu'étudiant pour accéder à tous les cours et développer vos compétences.
                </p>
              </TabsContent>
              <TabsContent value="instructor">
                <p className="text-sm text-muted-foreground mb-4">
                  Rejoignez-nous en tant qu'instructeur pour partager vos connaissances et gagner des revenus.
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSocialLogin("Github")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSocialLogin("Twitter")}
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    ou inscrivez-vous avec
                  </span>
                </div>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jean Dupont"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@exemple.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  {/* Password strength indicator */}
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        Force du mot de passe:
                      </span>
                      <span className="text-xs font-medium">
                        {passwordStrength === 0 && "Très faible"}
                        {passwordStrength === 1 && "Faible"}
                        {passwordStrength === 2 && "Moyen"}
                        {passwordStrength === 3 && "Fort"}
                        {passwordStrength === 4 && "Très fort"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className={`h-1.5 rounded-full ${
                          passwordStrength === 0
                            ? "bg-red-500 w-1/5"
                            : passwordStrength === 1
                            ? "bg-orange-500 w-2/5"
                            : passwordStrength === 2
                            ? "bg-yellow-500 w-3/5"
                            : passwordStrength === 3
                            ? "bg-lime-500 w-4/5"
                            : "bg-green-500 w-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                  
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className={`mr-1 h-3 w-3 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                      Au moins 8 caractères
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`mr-1 h-3 w-3 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                      Au moins une majuscule
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`mr-1 h-3 w-3 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                      Au moins un chiffre
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className={`mr-1 h-3 w-3 ${/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                      Au moins un caractère spécial
                    </li>
                  </ul>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link to="/terms" className="text-schoolier-blue hover:underline">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link to="/privacy" className="text-schoolier-blue hover:underline">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </form>
            </div>
          </CardContent>
          
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Déjà inscrit?{" "}
              <Link
                to="/login"
                className="font-medium text-schoolier-blue hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
