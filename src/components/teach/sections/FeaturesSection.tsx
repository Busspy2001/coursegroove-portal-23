
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, CreditCard, LineChart, Users, Award } from "lucide-react";

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

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, benefits }) => {
  return (
    <motion.div variants={item} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md h-full">
      <div className="mb-6 bg-schoolier-blue/10 dark:bg-schoolier-blue/20 p-4 rounded-full inline-block">
        {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-schoolier-blue" })}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-schoolier-teal rounded-full p-1 mr-3 mt-1 flex-shrink-0">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MousePointerClick />,
      title: "Outils de création faciles",
      description: "Créez des cours professionnels sans compétences techniques",
      benefits: [
        "Éditeur drag-and-drop intuitif",
        "Intégration vidéo HD avec player optimisé",
        "Quiz interactifs et devoirs automatiquement notés",
        "Templates prêts à l'emploi pour gagner du temps"
      ]
    },
    {
      icon: <CreditCard />,
      title: "Monétisation simplifiée",
      description: "Transformez votre savoir en revenus récurrents",
      benefits: [
        "Prix libre, abonnements ou paiements uniques",
        "Promotions automatisées et codes promo",
        "Paiement en ligne sécurisé (CB, PayPal)",
        "Versement des revenus chaque mois"
      ]
    },
    {
      icon: <LineChart />,
      title: "Suivi des étudiants",
      description: "Optimisez votre contenu grâce aux données",
      benefits: [
        "Statistiques de progression détaillées",
        "Feedback et notations des étudiants",
        "Analyses d'engagement et de rétention",
        "Évaluations personnalisables"
      ]
    },
    {
      icon: <Users />,
      title: "Support & communauté",
      description: "Ne soyez jamais seul dans votre aventure pédagogique",
      benefits: [
        "Équipe dédiée aux formateurs",
        "Groupe privé des instructeurs Schoolier",
        "Webinaires mensuels de perfectionnement",
        "Ressources exclusives pour réussir"
      ]
    },
    {
      icon: <Award />,
      title: "Certification Schoolier",
      description: "Ajoutez de la valeur à vos apprenants",
      benefits: [
        "Certificats de réussite personnalisables",
        "Badges de compétences reconnus",
        "Partage facile sur LinkedIn",
        "Vérification d'authenticité via blockchain"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que Schoolier vous offre</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Des outils supérieurs aux alternatives comme YouTube, Udemy ou les plateformes personnelles
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              benefits={feature.benefits}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
