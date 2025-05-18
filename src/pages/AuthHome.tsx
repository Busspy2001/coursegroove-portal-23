
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileSelector from "@/components/auth/ProfileSelector";
import { ensureDemoAccountsExist } from "@/components/auth/demo/initDemoAccounts";

const AuthHome = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Ensure demo accounts are available - fixed parameter issue
  useEffect(() => {
    const initAccounts = async () => {
      await ensureDemoAccountsExist();
    };
    
    initAccounts();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className={`flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 ${isMobile ? "pb-16" : ""}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Book className="h-12 w-12 text-schoolier-teal mr-3" />
            <h2 className="text-4xl font-bold">Schoolier</h2>
          </div>
          
          <ProfileSelector />
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Vous avez déjà un compte ?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Se connecter
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default AuthHome;
