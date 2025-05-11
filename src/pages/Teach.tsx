
import React from "react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Teach Section Components
import {
  HeroSection,
  ProblemsSection,
  ProcessSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FaqSection,
  CtaSection
} from "@/components/teach/sections";

const Teach = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-schoolier-dark">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ProblemsSection />
        <ProcessSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Teach;
