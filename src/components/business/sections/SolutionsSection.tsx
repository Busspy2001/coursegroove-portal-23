
import React from "react";
import { motion } from "framer-motion";
import { FileText, ChartBar, Users, Smartphone } from "lucide-react";
import { SolutionCard } from "@/components/business";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const SolutionsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            La solution Schoolier Business
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Une plateforme complète qui transforme la formation en entreprise
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SolutionCard 
            icon={<FileText className="h-10 w-10 text-schoolier-teal" />}
            title="Formation sur mesure"
            description="Accès à des contenus adaptés à chaque métier et niveau de compétence, personnalisables selon vos besoins spécifiques."
          />
          <SolutionCard 
            icon={<ChartBar className="h-10 w-10 text-schoolier-teal" />}
            title="Suivi et analytique"
            description="Tableaux de bord détaillés pour suivre la progression, l'engagement et les résultats en temps réel."
          />
          <SolutionCard 
            icon={<Users className="h-10 w-10 text-schoolier-teal" />}
            title="Accès multi-profils"
            description="Interfaces dédiées pour employés, formateurs internes et managers – chaque rôle dispose de ses propres outils."
          />
          <SolutionCard 
            icon={<Smartphone className="h-10 w-10 text-schoolier-teal" />}
            title="Expérience mobile"
            description="Application responsive permettant d'apprendre n'importe où, n'importe quand, même hors connexion."
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
