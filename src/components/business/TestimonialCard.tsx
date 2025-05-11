
import React from "react";
import { Star } from "lucide-react";
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

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
      variants={fadeIn}
    >
      <div className="mb-4">
        <Star className="h-6 w-6 text-schoolier-yellow" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{quote}"</p>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
