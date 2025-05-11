
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginBenefits } from "@/components/auth/LoginBenefits";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { useAuth } from "@/contexts/auth";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, loading: authLoading } = useAuth();
  const isMobile = useIsMobile();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Redirection optimisée si déjà authentifié
  useEffect(() => {
    // Ajouter un timeout pour éviter le blocage trop long sur la page de login
    const authCheckTimeout = setTimeout(() => {
      if (authLoading) {
        console.log("⏱️ Vérification d'authentification trop longue, continuons sans bloquer l'interface");
      }
    }, 1500); // 1.5 secondes maximum pour la vérification d'auth

    return () => clearTimeout(authCheckTimeout);
  }, [authLoading]);
  
  // Redirection rapide vers le tableau de bord approprié selon le rôle
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      console.log("✅ Utilisateur authentifié avec le rôle:", currentUser.role);
      setIsRedirecting(true);
      
      // Déterminer la destination en fonction du rôle
      let destination = "/dashboard"; // Default destination
      
      if (currentUser.role === 'instructor') {
        destination = "/instructor";
        console.log("🧑‍🏫 Redirection vers le tableau de bord instructeur");
      } else if (currentUser.role === 'admin') {
        destination = "/admin";
        console.log("👨‍💼 Redirection vers le tableau de bord administrateur");
      } else {
        console.log("🎓 Redirection vers le tableau de bord étudiant");
      }
      
      // Redirection immédiate
      navigate(destination);
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  const handleTabChange = (value: string) => {
    if (value === "register") {
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className={`flex-grow flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 ${isMobile ? "pb-16" : ""}`}>
        <div className="max-w-5xl w-full flex">
          {/* Left side: Login form */}
          <Card className="w-full md:w-1/2 shadow-2xl">
            {isRedirecting && (
              <div className="m-4 bg-green-50 text-green-800 border border-green-200 rounded-md p-3 flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Vous êtes déjà connecté. Redirection vers votre tableau de bord...</span>
              </div>
            )}
            
            <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
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
                <CardContent className="space-y-4">
                  <LoginForm />
                  <Separator className="my-4" />
                  <SocialLoginButtons />
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
          <LoginBenefits />
        </div>
      </div>
      
      <Footer />
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Login;
