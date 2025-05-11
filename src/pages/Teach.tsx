
import React, { useState } from "react";

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

// Dialog Components
import {
  InstructorSignupDialog,
  EditorDemoDialog,
  GuideDownloadDialog,
  ProPlanDialog
} from "@/components/teach/dialogs";

const Teach = () => {
  // Dialog states
  const [isInstructorSignupOpen, setIsInstructorSignupOpen] = useState(false);
  const [isEditorDemoOpen, setIsEditorDemoOpen] = useState(false);
  const [isGuideDownloadOpen, setIsGuideDownloadOpen] = useState(false);
  const [isProPlanOpen, setIsProPlanOpen] = useState(false);
  
  // Dialog handlers
  const handleInstructorSignup = () => setIsInstructorSignupOpen(true);
  const handleEditorDemo = () => setIsEditorDemoOpen(true);
  const handleGuideDownload = () => setIsGuideDownloadOpen(true);
  const handleProPlan = () => setIsProPlanOpen(true);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-schoolier-dark">
      <Navbar />

      <main className="flex-grow">
        <HeroSection 
          onBecomeInstructor={handleInstructorSignup}
          onCreateAccount={() => window.location.href = "/register?role=instructor"}
        />
        <ProblemsSection />
        <ProcessSection onViewDemo={handleEditorDemo} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection 
          onStartFree={() => window.location.href = "/register?role=instructor"}
          onChoosePro={handleProPlan}
          onContactSales={() => window.location.href = "/contact?subject=enterprise"}
        />
        <FaqSection />
        <CtaSection 
          onBecomeInstructor={handleInstructorSignup}
          onDownloadGuide={handleGuideDownload}
        />
      </main>

      <Footer />

      {/* Dialog Components */}
      <InstructorSignupDialog 
        open={isInstructorSignupOpen} 
        onOpenChange={setIsInstructorSignupOpen} 
      />
      <EditorDemoDialog 
        open={isEditorDemoOpen} 
        onOpenChange={setIsEditorDemoOpen} 
      />
      <GuideDownloadDialog 
        open={isGuideDownloadOpen} 
        onOpenChange={setIsGuideDownloadOpen} 
      />
      <ProPlanDialog 
        open={isProPlanOpen} 
        onOpenChange={setIsProPlanOpen} 
      />
    </div>
  );
};

export default Teach;
