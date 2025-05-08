
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      <SearchSection />
      <BenefitsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <TestimonialsSection />
      <InstructorSection />
      <GuaranteeSection />
      <CtaSection />

      <Footer />
    </div>
  );
};

export default Index;
