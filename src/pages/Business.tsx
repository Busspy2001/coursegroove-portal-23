
import React from "react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Business Section Components
import {
  HeroSection,
  ProblemsSection,
  SolutionsSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FaqSection,
  CtaSection
} from "@/components/business/sections";

// Demo request function
const requestDemo = () => {
  // This would be connected to a form or calendly in a real implementation
  alert("Merci de votre intérêt ! Un conseiller Schoolier Business vous contactera sous peu.");
};

const Business = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-schoolier-dark">
      <Navbar />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-schoolier-dark p-4 border-t z-50">
        <button 
          onClick={requestDemo} 
          className="w-full py-3 bg-schoolier-blue hover:bg-schoolier-dark-blue text-white rounded-md flex items-center justify-center"
        >
          <span className="mr-2">💬</span>
          Réserver une démo gratuite
        </button>
      </div>

      <main className="flex-grow pb-24 lg:pb-0">
        <HeroSection onRequestDemo={requestDemo} />
        <ProblemsSection />
        <SolutionsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection onRequestDemo={requestDemo} />
        <FaqSection />
        <CtaSection onRequestDemo={requestDemo} />
      </main>

      <Footer />
    </div>
  );
};

export default Business;
