
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { RegisterBenefits } from "@/components/auth/RegisterBenefits";

const Register = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    if (value === "login") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex">
        {/* Left side: Image and text (hidden on mobile) */}
        <RegisterBenefits />
        
        {/* Right side: Registration form */}
        <Card className="w-full md:w-1/2 shadow-2xl">
          <Tabs defaultValue="register" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
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
                <RegisterForm />
                <SocialLoginButtons />
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
