
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

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="flex gap-4"
      variants={fadeIn}
    >
      <div className="mt-1 bg-schoolier-blue/10 p-2 rounded-full">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-schoolier-blue" })}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureItem;
