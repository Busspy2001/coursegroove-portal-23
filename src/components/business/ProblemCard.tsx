
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

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
      variants={fadeIn}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default ProblemCard;
