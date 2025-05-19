import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Book, Building, Briefcase, ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/components/auth/register";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { RegisterBenefits } from "@/components/auth/RegisterBenefits";
import { useAuth } from "@/contexts/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MobileProfileSelector } from "@/components/auth/MobileProfileSelector";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the profile types and their properties
const profileConfig = {
  student: {
    title: "Inscription Étudiant",
    description: "Créez votre compte étudiant pour accéder à des milliers de cours",
    icon: GraduationCap,
    gradientClass: "from-schoolier-blue to-schoolier-dark-blue",
    benefitsTitle: "Pourquoi s'inscrire comme étudiant ?",
    benefits: [
      "Accédez à des milliers de cours dans tous les domaines",
      "Apprenez à votre rythme, où que vous soyez",
      "Obtenez des certifications reconnues",
      "Rejoignez une communauté d'apprenants"
    ]
  },
  instructor: {
    title: "Inscription Enseignant",
    description: "Créez votre compte enseignant pour partager votre expertise",
    icon: Book,
    gradientClass: "from-schoolier-teal to-schoolier-dark-teal",
    benefitsTitle: "Pourquoi s'inscrire comme enseignant ?",
    benefits: [
      "Partagez votre expertise avec des milliers d'apprenants",
      "Créez des cours engageants avec nos outils",
      "Suivez la progression de vos étudiants",
      "Générez des revenus avec vos connaissances"
    ]
  },
  business: {
    title: "Inscription Entreprise",
    description: "Créez votre compte entreprise pour gérer la formation de vos équipes",
    icon: Building,
    gradientClass: "from-amber-500 to-orange-600",
    benefitsTitle: "Pourquoi s'inscrire comme entreprise ?",
    benefits: [
      "Formez vos employés avec des contenus de qualité",
      "Suivez les progrès de vos équipes",
      "Créez des parcours de formation personnalisés",
      "Optimisez votre budget formation"
    ]
  },
  employee: {
    title: "Inscription Employé",
    description: "Créez votre compte employé pour accéder à vos formations professionnelles",
    icon: Briefcase,
    gradientClass: "from-purple-500 to-indigo-600",
    benefitsTitle: "Pourquoi s'inscrire comme employé ?",
    benefits: [
      "Développez vos compétences professionnelles",
      "Suivez les formations recommandées par votre entreprise",
      "Obtenez des certifications professionnelles",
      "Progressez dans votre carrière"
    ]
  }
};

type ProfileType = "student" | "instructor" | "business" | "employee";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  // Get the profile from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const profileParam = searchParams.get('profile') as ProfileType | null;
  
  // Default to student if no profile is specified
  const [activeProfile, setActiveProfile] = useState<ProfileType>(profileParam || "student");
  
  // Get the current profile configuration
  const currentProfile = profileConfig[activeProfile];
  
  const handleTabChange = (value: string) => {
    if (value === "login") {
      navigate(`/login${profileParam ? `?profile=${profileParam}` : ""}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <motion.div 
        className={`flex-grow flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 ${isMobile ? "pb-20" : ""}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-5xl w-full flex flex-col">
          {/* Back to profile selection */}
          <div className={`mb-4 self-start ${isMobile ? "px-2" : ""}`}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/auth")}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Retour à la sélection</span>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row w-full">
            {/* Left side: Benefits - visible only on desktop */}
            <div className={`hidden md:block md:w-1/2 p-8 bg-gradient-to-r ${currentProfile.gradientClass} rounded-l-xl text-white`}>
              <motion.div className="h-full flex flex-col justify-center" variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <currentProfile.icon className="h-12 w-12 text-white mr-3" />
                  <h2 className="text-4xl font-bold">Schoolier</h2>
                </div>
                
                <h3 className="text-3xl font-bold mb-6">{currentProfile.benefitsTitle}</h3>
                
                <motion.div 
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, staggerChildren: 0.1 }}
                >
                  {currentProfile.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-lg">{benefit}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right side: Registration form */}
            <motion.div 
              variants={itemVariants} 
              className="w-full md:w-1/2"
            >
              <Card className="shadow-2xl border-0 md:rounded-l-none">
                {/* Profile tabs for mobile view only */}
                {isMobile && (
                  <div className="pt-4 px-4">
                    <MobileProfileSelector 
                      activeProfile={activeProfile} 
                      onProfileChange={setActiveProfile} 
                    />
                  </div>
                )}
                
                <ScrollArea className={`${isMobile ? "max-h-[70vh]" : ""}`}>
                  <Tabs defaultValue="register" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Connexion</TabsTrigger>
                      <TabsTrigger value="register">Inscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                      <CardHeader className="space-y-1 pb-2">
                        <div className="flex items-center justify-center mb-2">
                          <currentProfile.icon className={`h-10 w-10 text-${activeProfile === "business" ? "amber-500" : activeProfile === "employee" ? "purple-500" : activeProfile === "instructor" ? "schoolier-teal" : "schoolier-blue"}`} />
                          <span className="text-2xl font-bold ml-2">Schoolier</span>
                        </div>
                        <CardTitle className="text-xl text-center">{currentProfile.title}</CardTitle>
                        <CardDescription className="text-center">
                          {currentProfile.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RegisterForm profileType={activeProfile} />
                        <div className="mt-4">
                          <SocialLoginButtons />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4 pt-0 pb-6">
                        <p className="text-center text-sm text-muted-foreground">
                          Vous avez déjà un compte ?{" "}
                          <Link to={`/login${profileParam ? `?profile=${profileParam}` : ""}`} className="text-schoolier-blue hover:underline">
                            Se connecter
                          </Link>
                        </p>
                      </CardFooter>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Register;
