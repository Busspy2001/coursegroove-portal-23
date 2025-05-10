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
import { Book, Eye, EyeOff, Lock, Mail, User, CheckCircle } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation pour vous inscrire.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast({
        title: "Inscription réussie !",
        description: "Bienvenue sur Schoolier.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    let text = "";
    let color = "";
    
    switch (strength) {
      case 0:
      case 1:
        text = "Très faible";
        color = "bg-red-500";
        break;
      case 2:
        text = "Faible";
        color = "bg-orange-500";
        break;
      case 3:
        text = "Moyen";
        color = "bg-yellow-500";
        break;
      case 4:
        text = "Fort";
        color = "bg-green-500";
        break;
      case 5:
        text = "Très fort";
        color = "bg-green-600";
        break;
      default:
        text = "";
        color = "";
    }
    
    return { strength: (strength / 5) * 100, text, color };
  };
  
  const passwordStrength = getPasswordStrength(password);
  const isPasswordMatch = password === confirmPassword && confirmPassword !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex">
        {/* Left side: Image and text (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-teal to-schoolier-blue rounded-l-xl text-white">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez la communauté Schoolier</h2>
            <p className="mb-6">
              Créez votre compte et commencez votre parcours d'apprentissage dès aujourd'hui avec des milliers de cours disponibles.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-4" />
                <p>Accès à plus de 10 000 cours de qualité</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-4" />
                <p>Certificats reconnus par les entreprises</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-4" />
                <p>Communauté active d'apprenants</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-4" />
                <p>Satisfaction garantie pendant 30 jours</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Registration form */}
        <Card className="w-full md:w-1/2 shadow-2xl">
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={handleLoginClick}>Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Book className="h-10 w-10 text-schoolier-teal" />
                  <span className="text-2xl font-bold ml-2">Schoolier</span>
                </div>
                <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
                <CardDescription className="text-center">
                  Inscrivez-vous pour accéder à des milliers de cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Votre nom"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="password">Mot de passe</Label>
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
                      {password && (
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Force du mot de passe:</span>
                            <span>{passwordStrength.text}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`pl-10 ${confirmPassword && (isPasswordMatch ? 'border-green-500' : 'border-red-500')}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {confirmPassword && !isPasswordMatch && (
                        <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                      )}
                      {confirmPassword && isPasswordMatch && (
                        <p className="text-xs text-green-500 mt-1 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Les mots de passe correspondent
                        </p>
                      )}
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={acceptTerms} 
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        J'accepte les <Link to="/terms" className="text-schoolier-blue hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-schoolier-blue hover:underline">politique de confidentialité</Link>
                      </Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !acceptTerms || !isPasswordMatch}
                    >
                      {isLoading ? "Inscription en cours..." : "S'inscrire"}
                    </Button>
                  </div>
                </form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">Ou inscrivez-vous avec</span>
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
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="text-schoolier-blue hover:underline">
                    Se connecter
                  </Link>
                </p>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Register;
