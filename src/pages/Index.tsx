
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstructorSection from "@/components/home/InstructorSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import CtaSection from "@/components/home/CtaSection";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
  const isMobile = useIsMobile();
  
  // Animation variants for the page content
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.div 
        className={`flex-1 ${isMobile ? "pb-16" : ""}`}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <HeroSection />
        <SearchSection />
        <BenefitsSection />
        <CategoriesSection />
        <FeaturedCoursesSection />
        <TestimonialsSection />
        <InstructorSection />
        <GuaranteeSection />
        <CtaSection />
      </motion.div>

      <Footer />
      
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Index;
