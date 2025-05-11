
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

// Dialog components
import {
  DemoRequestDialog,
  BusinessSignupDialog,
  SalesContactDialog
} from "@/components/business/dialogs";

// Dialog states enum
enum DialogType {
  None,
  Demo,
  Signup,
  Sales
}

const Business = () => {
  // State to control which dialog is open
  const [activeDialog, setActiveDialog] = React.useState<DialogType>(DialogType.None);

  // Dialog open state handlers
  const openDemoDialog = () => setActiveDialog(DialogType.Demo);
  const openSignupDialog = () => setActiveDialog(DialogType.Signup);
  const openSalesDialog = () => setActiveDialog(DialogType.Sales);
  
  // Dialog close handler
  const closeDialog = () => setActiveDialog(DialogType.None);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-schoolier-dark">
      <Navbar />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-schoolier-dark p-4 border-t z-50">
        <button 
          onClick={openDemoDialog} 
          className="w-full py-3 bg-schoolier-blue hover:bg-schoolier-dark-blue text-white rounded-md flex items-center justify-center"
        >
          <span className="mr-2">💬</span>
          Réserver une démo gratuite
        </button>
      </div>

      <main className="flex-grow pb-24 lg:pb-0">
        <HeroSection 
          onRequestDemo={openDemoDialog} 
          onSignup={openSignupDialog} 
        />
        <ProblemsSection />
        <SolutionsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection 
          onRequestDemo={openDemoDialog} 
          onOpenSales={openSalesDialog}
        />
        <FaqSection />
        <CtaSection 
          onRequestDemo={openDemoDialog} 
          onSignup={openSignupDialog}
        />
      </main>

      <Footer />

      {/* Dialogs */}
      <DemoRequestDialog 
        open={activeDialog === DialogType.Demo} 
        onOpenChange={(open) => !open && closeDialog()} 
      />
      
      <BusinessSignupDialog 
        open={activeDialog === DialogType.Signup} 
        onOpenChange={(open) => !open && closeDialog()} 
      />
      
      <SalesContactDialog 
        open={activeDialog === DialogType.Sales} 
        onOpenChange={(open) => !open && closeDialog()} 
      />
    </div>
  );
};

export default Business;
