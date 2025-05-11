
import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, ChartBar, Users, TrendingUp
} from "lucide-react";
import { ProblemCard } from "@/components/business";

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

const ProblemsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vos équipes perdent du temps avec des formations peu adaptées ?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Les défis courants qui freinent le développement des compétences en entreprise
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Problem Cards */}
          <ProblemCard 
            icon={<FileText className="h-10 w-10 text-schoolier-red" />}
            title="Formations génériques"
            description="Des contenus standardisés qui ne correspondent pas aux besoins spécifiques de votre secteur."
          />
          <ProblemCard 
            icon={<ChartBar className="h-10 w-10 text-schoolier-red" />}
            title="Suivi impossible"
            description="Difficulté à mesurer la progression réelle et l'engagement des employés."
          />
          <ProblemCard 
            icon={<Users className="h-10 w-10 text-schoolier-red" />}
            title="Manque d'engagement"
            description="Faible motivation due à des formats inadaptés et des contenus peu personnalisés."
          />
          <ProblemCard 
            icon={<TrendingUp className="h-10 w-10 text-schoolier-red" />}
            title="ROI incertain"
            description="Absence de données concrètes sur l'impact réel des formations sur la performance."
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
