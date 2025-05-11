
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Grid, HelpCircle, MessageSquare, Award, Star } from "lucide-react";
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
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main links column */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-semibold text-schoolier-blue text-sm tracking-wide uppercase mb-2 border-b pb-2">Découvrez Schoolier</h4>
        <ul className="grid gap-3">
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
        </ul>
      </motion.div>
      
      {/* Second column - Additional links */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-semibold text-schoolier-blue text-sm tracking-wide uppercase mb-2 border-b pb-2">Notre communauté</h4>
        <ul className="grid gap-3">
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

          <ListItem 
            title="Formateurs vedettes" 
            href="/instructors" 
            icon={<Star className="h-5 w-5 text-schoolier-teal" />}
          >
            Découvrez nos formateurs les plus populaires et leurs cours
          </ListItem>
        </ul>
        
        <div className="pt-2">
          <Link 
            to="/courses" 
            className="flex items-center text-sm font-medium text-schoolier-blue hover:underline"
          >
            Explorer tous les cours
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiscoverMenuContent;
