
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Grid, HelpCircle, MessageSquare, Award } from "lucide-react";
import { motion } from "framer-motion";
import ListItem from "./ListItem";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({
  className
}) => {
  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
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
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* First column - Main links */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-semibold text-schoolier-blue text-sm tracking-wide uppercase mb-2 border-b pb-2">Découvrez Schoolier</h4>
        <ul className="grid gap-2">
          <ListItem 
            title="Nos cours" 
            href="/courses" 
            icon={<Book className="h-5 w-5 text-schoolier-teal" />}
          >
            Parcourez notre catalogue de formations pour tous les niveaux et domaines
          </ListItem>
          
          <ListItem 
            title="Catégories" 
            href="/categories" 
            icon={<Grid className="h-5 w-5 text-schoolier-teal" />}
          >
            Explorez nos différentes catégories de formation par domaine d'expertise
          </ListItem>
          
          <ListItem 
            title="Pourquoi Schoolier" 
            href="/about" 
            icon={<HelpCircle className="h-5 w-5 text-schoolier-teal" />}
          >
            Découvrez ce qui nous différencie et notre approche pédagogique
          </ListItem>
          
          <ListItem 
            title="Témoignages" 
            href="/testimonials" 
            icon={<MessageSquare className="h-5 w-5 text-schoolier-teal" />}
          >
            Lisez les retours d'expérience de nos apprenants et instructeurs
          </ListItem>
          
          <ListItem 
            title="Nos valeurs" 
            href="/values" 
            icon={<Award className="h-5 w-5 text-schoolier-teal" />}
          >
            Comprenez notre mission et les valeurs qui guident Schoolier
          </ListItem>
        </ul>
        
        <div className="pt-2">
          <Link 
            to="/courses" 
            className="flex items-center text-sm font-medium text-schoolier-blue hover:underline"
          >
            Voir tous les cours
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
      
      {/* Second column - Featured categories */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-semibold text-schoolier-blue text-sm tracking-wide uppercase mb-2 border-b pb-2">Catégories populaires</h4>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          <li className="flex">
            <Link to="/courses/development" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Développement
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/design" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Design
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/business" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Business
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/marketing" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Marketing
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/finance" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Finance
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/personal-development" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Développement personnel
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/data-science" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Data Science
            </Link>
          </li>
          <li className="flex">
            <Link to="/courses/health" className="group flex items-center hover:text-schoolier-blue">
              <span className="w-2 h-2 bg-schoolier-teal rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
              Santé & Bien-être
            </Link>
          </li>
        </ul>
      </motion.div>
      
      {/* Third column - Featured content */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-schoolier-blue/5 to-schoolier-teal/10 rounded-xl p-5">
        <h4 className="font-semibold text-schoolier-blue text-sm tracking-wide uppercase mb-3">À la une</h4>
        <div className="mb-4">
          <div className="bg-schoolier-teal/20 mb-2 h-32 rounded-lg flex items-center justify-center">
            <span className="text-schoolier-teal font-medium">Formation du moment</span>
          </div>
          <h5 className="font-medium text-sm">Développement Web Full Stack</h5>
          <p className="text-xs text-gray-600 mt-1">Maîtrisez le développement web de A à Z</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium px-2 py-1 bg-schoolier-teal/20 text-schoolier-teal rounded-full">Bestseller</span>
          <Link 
            to="/courses/web-development" 
            className="text-xs font-medium text-schoolier-blue hover:underline flex items-center"
          >
            En savoir plus
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiscoverMenuContent;
