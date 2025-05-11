
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
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
  onBecomeInstructor: () => void;
  onDownloadGuide: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onBecomeInstructor, onDownloadGuide }) => {
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
            Prêt à enseigner au monde ?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Rejoignez des centaines d'experts qui changent des vies avec leurs savoirs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              size="lg" 
              className="bg-white text-schoolier-blue hover:bg-gray-100 text-lg px-8 shadow-lg"
              onClick={onBecomeInstructor}
            >
              Devenir instructeur maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/20 text-lg px-8"
              onClick={onDownloadGuide}
            >
              <Download className="mr-2 h-5 w-5" />
              Télécharger le guide gratuit
            </Button>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg inline-block">
            <p className="text-white text-sm">
              "Ce qui me plaît chez Schoolier, c'est que la plateforme s'occupe de toute la technique pendant que je peux me concentrer sur ce que j'aime : enseigner et partager mon expertise."
            </p>
            <p className="text-white font-bold mt-2">Martin D., Instructeur depuis 2022</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
