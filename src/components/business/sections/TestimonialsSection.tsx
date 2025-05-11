
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TestimonialCard } from "@/components/business";

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

const TestimonialsSection: React.FC = () => {
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
            Ce que nos clients disent
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Rejoignez plus de 500 entreprises qui font confiance à Schoolier Business
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {/* Client logos would go here */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 h-16 w-32 rounded flex items-center justify-center">
              <Star className="h-8 w-8 text-schoolier-gray" />
            </div>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialCard 
            quote="Grâce à Schoolier, notre onboarding a gagné 40% en efficacité et nos nouveaux collaborateurs sont opérationnels plus rapidement."
            name="Marie Dupont"
            role="DRH, TechInnovate"
          />
          <TestimonialCard 
            quote="La plateforme nous a permis de créer des parcours personnalisés pour chaque département tout en gardant une vue d'ensemble cohérente."
            name="Thomas Bernard"
            role="Responsable Formation, MediaGroup"
          />
          <TestimonialCard 
            quote="Le support client est exceptionnel. L'équipe Schoolier nous a guidés à chaque étape pour maximiser notre retour sur investissement."
            name="Sophie Martin"
            role="CEO, GrowthPartners"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
