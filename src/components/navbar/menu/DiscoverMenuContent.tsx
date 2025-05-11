
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({
  className
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Course Categories Column */}
      <motion.div
        variants={itemVariants} 
        className="flex flex-col space-y-4"
      >
        <h3 className="font-bold text-lg text-schoolier-dark-blue dark:text-white mb-2">
          Catégories de cours
        </h3>
        <CourseCategories />
      </motion.div>

      {/* Certification Providers Column */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col space-y-4"
      >
        <h3 className="font-bold text-lg text-schoolier-dark-blue dark:text-white mb-2">
          Certifications professionnelles
        </h3>
        <CertificationProviders />
      </motion.div>

      {/* Popular Topics Column */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col space-y-4"
      >
        <h3 className="font-bold text-lg text-schoolier-dark-blue dark:text-white mb-2">
          Sujets populaires
        </h3>
        <PopularTopics />
        
        {/* Call to Action for Catalog */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <Link 
            to="/courses"
            className="inline-flex items-center gap-2 px-4 py-3 text-white bg-schoolier-blue rounded-md hover:bg-schoolier-dark-blue transition-colors group w-full"
          >
            <span className="font-medium">Explorer tout le catalogue</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DiscoverMenuContent;
