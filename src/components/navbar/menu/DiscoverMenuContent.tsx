
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Grid, HelpCircle, MessageSquare, Award } from "lucide-react";
import { motion } from "framer-motion";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";
import ListItem from "./ListItem";

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
      {/* First Column - Core Sections */}
      <motion.div
        variants={itemVariants} 
        className="flex flex-col space-y-4"
      >
        <h3 className="font-bold text-lg text-schoolier-dark-blue dark:text-white mb-4">
          Explorez Schoolier
        </h3>
        
        <ul className="space-y-3">
          <li>
            <ListItem 
              title="Nos cours" 
              icon={<Book className="h-5 w-5 text-schoolier-blue" />}
              href="/courses"
            >
              Découvrez notre catalogue complet de formations en ligne
            </ListItem>
          </li>
          <li>
            <ListItem 
              title="Catégories" 
              icon={<Grid className="h-5 w-5 text-schoolier-green" />}
              href="/categories"
            >
              Parcourez nos cours par domaine d'expertise
            </ListItem>
          </li>
          <li>
            <ListItem 
              title="Pourquoi Schoolier" 
              icon={<HelpCircle className="h-5 w-5 text-schoolier-teal" />}
              href="/about"
            >
              Découvrez notre mission et nos avantages uniques
            </ListItem>
          </li>
          <li>
            <ListItem 
              title="Témoignages" 
              icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
              href="/testimonials"
            >
              Ce que disent nos étudiants satisfaits
            </ListItem>
          </li>
          <li>
            <ListItem 
              title="Nos valeurs" 
              icon={<Award className="h-5 w-5 text-amber-500" />}
              href="/values"
            >
              Les principes qui guident notre plateforme éducative
            </ListItem>
          </li>
        </ul>
      </motion.div>

      {/* Second Column - Categories */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col space-y-4"
      >
        <h3 className="font-bold text-lg text-schoolier-dark-blue dark:text-white mb-2">
          Catégories de cours
        </h3>
        <CourseCategories />
      </motion.div>

      {/* Third Column - Popular Topics */}
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
