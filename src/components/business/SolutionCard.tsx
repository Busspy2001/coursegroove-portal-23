
import React from "react";
import { motion } from "framer-motion";

// Animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      variants={fadeIn}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default SolutionCard;
