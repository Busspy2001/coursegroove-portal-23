
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface HeroSectionProps {
  onBecomeInstructor: () => void;
  onCreateAccount: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBecomeInstructor, onCreateAccount }) => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-schoolier-dark py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Partagez votre savoir.
              <span className="text-schoolier-blue"> Changez des vies.</span>
              <span className="block">Générez des revenus.</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              Rejoignez la communauté des formateurs Schoolier et créez des expériences 
              d'apprentissage impactantes, à votre rythme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-schoolier-blue hover:bg-schoolier-dark-blue text-lg px-8"
                onClick={onBecomeInstructor}
              >
                Devenir instructeur
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10 text-lg px-8"
                onClick={onCreateAccount}
              >
                Créer mon compte gratuit
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80" 
              alt="Instructeur Schoolier" 
              className="w-full h-auto rounded-xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
