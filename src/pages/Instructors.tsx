
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { InstructorsHero } from "@/components/instructors/InstructorsHero";
import { FeaturedInstructors } from "@/components/instructors/FeaturedInstructors";
import { InstructorCategories } from "@/components/instructors/InstructorCategories";
import { BecomeInstructorCta } from "@/components/instructors/BecomeInstructorCta";
import { InstructorTestimonials } from "@/components/instructors/InstructorTestimonials";
import { InstructorsFilter } from "@/components/instructors/InstructorsFilter";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Instructors = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-1 ${isMobile ? "pb-16" : ""}`}>
        <InstructorsHero />
        <FeaturedInstructors />
        <InstructorCategories />
        <InstructorsFilter />
        <InstructorTestimonials />
        <BecomeInstructorCta />
      </div>

      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Instructors;
