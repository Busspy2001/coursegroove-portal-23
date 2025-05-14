
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import { ensureDemoAccountsExist } from "@/components/auth/demo/initDemoAccounts";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [demoInitialized, setDemoInitialized] = useState(false);
  
  // Only initialize demo accounts once when the login page loads
  useEffect(() => {
    if (!demoInitialized) {
      // Check if we have a logout parameter to prevent immediate relogin
      const searchParams = new URLSearchParams(location.search);
      const isLoggedOut = searchParams.get('logout') === 'true';
      
      if (!isLoggedOut) {
        // Only initialize demo accounts if we're not coming from a logout
        ensureDemoAccountsExist();
      } else {
        console.log("🚫 Initialisation des comptes démo ignorée - l'utilisateur vient de se déconnecter");
      }
      
      setDemoInitialized(true);
    }
  }, [demoInitialized, location.search]);
  
  // Optimized authentication check timeout
  useEffect(() => {
    const authCheckTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("⏱️ Vérification d'authentification trop longue, continuons sans bloquer l'interface");
      }
    }, 1000); // Reduced from 1.5s to 1s

    return () => clearTimeout(authCheckTimeout);
  }, [isLoading]);
  
  // Instead of automatic redirect, show a button for authenticated users
  const handleGoToDashboard = () => {
    setIsRedirecting(true);
    
    // Determine destination based on role
    let destination = "/dashboard"; // Default destination
    
    if (currentUser?.role === 'instructor') {
      destination = "/instructor";
      console.log("🧑‍🏫 Redirection vers le tableau de bord instructeur");
    } else if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      destination = "/admin";
      console.log("👨‍💼 Redirection vers le tableau de bord administrateur");
    } else if (currentUser?.role === 'business_admin') {
      destination = "/business";
      console.log("🏢 Redirection vers le tableau de bord entreprise");
    } else {
      console.log("🎓 Redirection vers le tableau de bord étudiant");
    }
    
    // Immediate navigation without delay
    navigate(destination);
  };
  
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
            {isAuthenticated && currentUser && (
              <div className="m-4 bg-green-50 text-green-800 border border-green-200 rounded-md p-4 flex flex-col items-center">
                <p className="mb-3">Vous êtes connecté en tant que <span className="font-bold">{currentUser.name}</span></p>
                <p className="text-sm mb-4">Rôle: <span className="font-semibold">{currentUser.role}</span></p>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-white hover:bg-gray-100"
                    onClick={() => toast({ title: "Information", description: "Vous êtes déjà connecté. Vous pouvez accéder à votre tableau de bord ou vous déconnecter." })}
                  >
                    Rester sur cette page
                  </Button>
                  
                  <Button 
                    onClick={handleGoToDashboard}
                    className="bg-schoolier-teal hover:bg-schoolier-dark-teal"
                    disabled={isRedirecting}
                  >
                    {isRedirecting ? "Redirection..." : "Accéder à mon tableau de bord"}
                  </Button>
                </div>
              </div>
            )}
            
            {!isAuthenticated && (
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
            )}
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
