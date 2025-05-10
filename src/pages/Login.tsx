import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginBenefits } from "@/components/auth/LoginBenefits";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { useAuth } from "@/contexts/auth";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleTabChange = (value: string) => {
    if (value === "register") {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex">
        {/* Left side: Login form */}
        <Card className="w-full md:w-1/2 shadow-2xl">
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
              <CardContent>
                <LoginForm />
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
  );
};

export default Login;
