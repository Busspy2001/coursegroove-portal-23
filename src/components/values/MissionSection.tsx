
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const MissionSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schoolier.com a pour mission de démocratiser le savoir en connectant des éducateurs passionnés avec des apprenants motivés grâce à une plateforme élégante et intuitive. Nous croyons que l'apprentissage doit être flexible, accessible et orienté vers des résultats concrets.
            </p>
            
            <ul className="space-y-4">
              {["Rendre l'éducation de qualité accessible à tous", "Permettre aux experts de partager leur savoir", "Créer un environnement d'apprentissage flexible et efficace"].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1 bg-schoolier-teal/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-schoolier-teal" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="bg-schoolier-blue/10 dark:bg-schoolier-blue/5 rounded-lg p-10 relative z-10">
              <h3 className="text-2xl font-bold mb-4">Notre vision</h3>
              <p className="mb-6 text-lg">
                Permettre aux apprenants du monde entier d'accéder facilement à une éducation en ligne de haute qualité, abordable et pratique, les aidant à améliorer leurs compétences, faire progresser leur carrière et débloquer de nouvelles opportunités — le tout à leur propre rythme.
              </p>
              <div className="flex items-center border-t pt-6 border-dashed border-schoolier-teal/30">
                <div className="text-schoolier-teal font-bold text-lg">+ de 100,000</div>
                <div className="ml-3">apprenants dans le monde</div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-schoolier-teal/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-schoolier-blue/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
