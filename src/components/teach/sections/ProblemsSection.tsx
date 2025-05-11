
import React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, ServerCrash, UserMinus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const ProblemCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="mb-4 bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-block">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProblemsSection: React.FC = () => {
  const problems = [
    {
      icon: <UserMinus className="h-6 w-6 text-red-600" />,
      title: "Manque de visibilité",
      description: "Vos contenus de qualité restent cachés faute de plateforme adaptée pour les exposer."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
      title: "Difficulté à monétiser",
      description: "Transformer votre expertise en revenus réguliers est un parcours complexe et incertain."
    },
    {
      icon: <ServerCrash className="h-6 w-6 text-red-600" />,
      title: "Gestion technique complexe",
      description: "Hébergement, système de paiement, vidéos... La technique vous freine dans votre mission d'enseignement."
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: "Pas de vraie communauté",
      description: "Difficile de créer un environnement d'apprentissage engageant sans les bons outils."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi enseigner sur Schoolier ?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beaucoup d'experts ont le savoir... mais pas les outils pour le partager efficacement
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </motion.div>

        <div className="mt-16 bg-schoolier-blue/10 dark:bg-schoolier-blue/5 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Schoolier est la solution</h3>
          <ul className="space-y-3 max-w-3xl mx-auto">
            <li className="flex items-start">
              <div className="bg-schoolier-blue rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Une plateforme tout-en-un pour héberger, vendre et faire rayonner vos cours</p>
            </li>
            <li className="flex items-start">
              <div className="bg-schoolier-blue rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Interface simple, analytics intégrés, support pédagogique personnalisé</p>
            </li>
            <li className="flex items-start">
              <div className="bg-schoolier-blue rounded-full p-1 mr-3 mt-1">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Paiements automatisés, gestion des étudiants, messagerie intégrée</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
