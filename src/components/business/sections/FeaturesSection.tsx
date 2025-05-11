
import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Mail, Award, Link as LinkIcon, Headphones } from "lucide-react";
import { FeatureItem } from "@/components/business";

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

const FeaturesSection: React.FC = () => {
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
            Fonctionnalités du programme entreprise
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Des outils puissants conçus pour les besoins spécifiques des entreprises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
              alt="Dashboard RH Schoolier" 
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </motion.div>

          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FeatureItem 
              icon={<CalendarDays />}
              title="Dashboard RH avec suivi par département"
              description="Visualisez les progrès par équipe, département ou individu avec des rapports personnalisables."
            />
            <FeatureItem 
              icon={<Mail />}
              title="Invitations et affectation automatique"
              description="Automatisez l'attribution des parcours de formation selon les rôles et besoins identifiés."
            />
            <FeatureItem 
              icon={<Award />}
              title="Certificats de complétion auditables"
              description="Certifications vérifiables et exportables pour valoriser les compétences acquises."
            />
            <FeatureItem 
              icon={<LinkIcon />}
              title="API d'intégration avec vos outils"
              description="Connectez facilement Schoolier à votre écosystème existant (Slack, Notion, MS Teams, etc)."
            />
            <FeatureItem 
              icon={<Headphones />}
              title="Support dédié et onboarding personnalisé"
              description="Un conseiller dédié vous accompagne dans la mise en place et l'optimisation de votre environnement."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
