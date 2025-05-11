
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Headphones } from "lucide-react";
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

interface CtaSectionProps {
  onRequestDemo: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onRequestDemo }) => {
  return (
    <section className="py-16 lg:py-24 bg-schoolier-blue dark:bg-schoolier-dark-blue">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Prêt à transformer la formation dans votre entreprise ?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Rejoignez les entreprises qui propulsent leurs équipes vers l'excellence avec Schoolier Business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRequestDemo}
              size="lg" 
              className="bg-white text-schoolier-blue hover:bg-gray-100 text-lg px-8 shadow-lg"
            >
              Demander une démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/20 text-lg px-8"
            >
              Créer un compte entreprise
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-10 text-white/80">
            <Headphones className="h-5 w-5 mr-2" />
            <span>Sans engagement – Support prioritaire inclus</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
