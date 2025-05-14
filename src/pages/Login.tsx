
import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import DemoAccounts from "@/components/auth/DemoAccounts";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Book } from "lucide-react";

const Login = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Redirection après connexion
  useEffect(() => {
    if (isLoading) return;

    if (currentUser && isAuthenticated) {
      let destination = "/dashboard";
      if (currentUser.role === 'instructor') {
        destination = "/instructor";
        console.log("👨‍🏫 Redirection vers le tableau de bord instructeur");
      } else if (currentUser.role === 'super_admin') {
        destination = "/admin";
        console.log("👨‍💼 Redirection vers le tableau de bord administrateur");
      } else if (currentUser.role === 'business_admin') {
        destination = "/entreprise";
        console.log("🏢 Redirection vers le tableau de bord entreprise");
      } else {
        console.log("🎓 Redirection vers le tableau de bord étudiant");
      }

      navigate(destination, { replace: true });
    }
  }, [currentUser, isAuthenticated, navigate, location, isLoading]);

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
          {/* Left side: Benefits - visible seulement sur desktop */}
          <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-dark-blue to-schoolier-teal rounded-l-xl text-white">
            <div className="h-full flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <Book className="h-12 w-12 text-white mr-3" />
                <h2 className="text-4xl font-bold">Schoolier</h2>
              </div>
              
              <h3 className="text-3xl font-bold mb-6">Bienvenue sur Schoolier</h3>
              <p className="mb-8 text-lg">
                Connectez-vous pour accéder à votre espace d'apprentissage et continuer votre progression.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg">Accédez à vos cours et certifications</p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg">Suivez votre progression personnelle</p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg">Interagissez avec les formateurs</p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-4">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg">Obtenez des certifications reconnues</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Login form */}
          <Card className="w-full md:w-1/2 md:rounded-l-none shadow-2xl">
            <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Book className="h-10 w-10 text-schoolier-teal" />
                    <span className="text-2xl font-bold ml-2">Schoolier</span>
                  </div>
                  <CardTitle className="text-2xl text-center">Se connecter</CardTitle>
                  <CardDescription className="text-center">
                    Connectez-vous pour accéder à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                  <div className="mt-6">
                    <SocialLoginButtons />
                  </div>
                </CardContent>
                <CardHeader className="pt-0">
                  <CardTitle className="text-lg">Comptes de démonstration</CardTitle>
                  <CardDescription>
                    Essayez Schoolier avec ces comptes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DemoAccounts />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Pas encore inscrit ?{" "}
                    <Link to="/register" className="text-schoolier-blue hover:underline">
                      Créer un compte
                    </Link>
                  </p>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      
      <Footer />
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Login;
