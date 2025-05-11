
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Upload, Gift, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface StepProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, number, title, description }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      variants={item}
    >
      <div className="relative">
        <div className="bg-schoolier-blue/10 dark:bg-schoolier-blue/5 p-6 rounded-full mb-4 relative">
          {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-schoolier-blue" })}
        </div>
        <div className="absolute -top-3 -right-3 bg-schoolier-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça fonctionne ?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Un parcours simple en 4 étapes pour devenir formateur sur Schoolier
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <Step
            icon={<UserPlus />}
            number={1}
            title="Créez votre compte instructeur"
            description="Inscrivez-vous gratuitement et complétez votre profil pour inspirer confiance à vos futurs élèves."
          />
          <Step
            icon={<Upload />}
            number={2}
            title="Déposez votre cours"
            description="Vidéos, quiz, fichiers PDF, exercices pratiques... Notre éditeur rend tout simple."
          />
          <Step
            icon={<Gift />}
            number={3}
            title="Publiez et vendez"
            description="Choisissez votre prix, personnalisez votre page et partagez à votre audience."
          />
          <Step
            icon={<BarChart3 />}
            number={4}
            title="Suivez vos revenus"
            description="Consultez vos statistiques et interactions avec vos élèves en temps réel."
          />
        </motion.div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-schoolier-blue hover:bg-schoolier-dark-blue text-lg px-8"
          >
            Voir la démo de l'éditeur
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
