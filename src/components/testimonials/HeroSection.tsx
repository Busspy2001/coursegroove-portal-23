
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const renderStars = (count: number) => {
  return Array(count).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-schoolier-yellow" fill="currentColor" />);
};

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-schoolier-blue/10 to-schoolier-teal/10 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeIn}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Ce que nos apprenants disent de nous
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Découvrez les expériences réelles de nos étudiants qui ont transformé leur vie professionnelle grâce à nos formations
          </p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-lg font-bold">4.8/5</span>
            <span className="text-gray-600">(2,500+ avis)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
