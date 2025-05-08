
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Book, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Check if we're in a reset password flow
  useEffect(() => {
    const checkResetSession = async () => {
      // When user comes from a password reset email link, the URL will contain the access token
      // Supabase automatically detects this and handles the session internally
      const { data, error } = await supabase.auth.getSession();
      
      // If no active session or error, redirect to login
      if (error || !data.session) {
        toast({
          title: "Session expirée",
          description: "Votre lien de réinitialisation de mot de passe a expiré. Veuillez réessayer.",
          variant: "destructive",
        });
        navigate("/forgot-password");
      }
    };
    
    checkResetSession();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
      
      // We'll let the user navigate back to login manually after seeing the success message
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Book className="h-10 w-10 text-schoolier-teal" />
            <span className="text-2xl font-bold ml-2">Schoolier</span>
          </div>
          <CardTitle className="text-2xl text-center">
            {isSuccess ? "Mot de passe réinitialisé" : "Réinitialiser votre mot de passe"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSuccess 
              ? "Votre mot de passe a été mis à jour avec succès" 
              : "Veuillez choisir un nouveau mot de passe sécurisé"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Nouveau mot de passe</div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
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
                  <div className="text-sm font-medium">Confirmer le mot de passe</div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
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
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !isPasswordMatch}
                >
                  {isLoading ? "Mise à jour en cours..." : "Réinitialiser le mot de passe"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 dark:bg-green-800/30 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
              </div>
              <p className="text-green-800 dark:text-green-300 font-medium mb-2">Mot de passe réinitialisé avec succès !</p>
              <p className="text-sm text-green-700 dark:text-green-400">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => navigate("/login")}
            disabled={isLoading}
          >
            Retour à la connexion
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
