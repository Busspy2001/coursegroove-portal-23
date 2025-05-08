
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

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-1 ${isMobile ? "pb-16" : ""}`}>
        <HeroSection />
        <SearchSection />
        <BenefitsSection />
        <CategoriesSection />
        <FeaturedCoursesSection />
        <TestimonialsSection />
        <InstructorSection />
        <GuaranteeSection />
        <CtaSection />
      </div>

      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
