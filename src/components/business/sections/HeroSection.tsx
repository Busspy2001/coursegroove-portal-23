
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
  onRequestDemo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRequestDemo }) => {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Formez vos équipes, développez vos talents, 
              <span className="text-schoolier-blue"> accélérez votre croissance.</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              Schoolier Business offre une plateforme clé en main pour la montée en compétence 
              de vos employés — à votre image, à votre rythme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button onClick={onRequestDemo} size="lg" className="bg-schoolier-blue hover:bg-schoolier-dark-blue text-lg px-8">
                Demander une démo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10 text-lg px-8">
                Créer un compte entreprise
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
              src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
              alt="Schoolier Business Dashboard" 
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
