
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialDialog from "@/components/testimonials/TestimonialDialog";
import {
  HeroSection,
  FeaturedTestimonialsSection,
  TestimonialsGridSection,
  CompaniesSection,
  TestimonialCta,
  ShareTestimonialSection
} from "@/components/testimonials";

const Testimonials: React.FC = () => {
  // Testimonial dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      <FeaturedTestimonialsSection />
      <TestimonialsGridSection />
      <CompaniesSection />
      <TestimonialCta />
      <ShareTestimonialSection onOpenDialog={() => setIsDialogOpen(true)} />
      
      {/* Testimonial Dialog */}
      <TestimonialDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default Testimonials;
