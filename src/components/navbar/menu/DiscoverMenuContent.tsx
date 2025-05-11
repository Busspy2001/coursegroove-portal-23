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
  return;
};
export default DiscoverMenuContent;