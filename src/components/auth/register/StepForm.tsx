
import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  component: ReactNode;
  isValid: boolean;
}

interface StepFormProps {
  steps: Step[];
  onComplete: () => void;  // This expects a function with no parameters
  submitLabel?: string;
}

export const StepForm: React.FC<StepFormProps> = ({ steps, onComplete, submitLabel = "Submit" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  
  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div 
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : 
                  index < currentStep ? "bg-primary/60" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
              {index < steps.length - 1 && (
                <div 
                  className={`w-8 h-0.5 mx-1 transition-colors ${
                    index < currentStep ? "bg-primary/60" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {currentStep + 1}/{steps.length}
        </span>
      </div>
      
      {/* Step title */}
      <motion.h3
        key={`title-${currentStep}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-medium text-lg text-center mb-4"
      >
        {steps[currentStep].title}
      </motion.h3>
      
      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${currentStep}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="min-h-[300px]"
        >
          {steps[currentStep].component}
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className={`${isFirstStep ? 'opacity-0 pointer-events-none' : ''} transition-opacity`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!steps[currentStep].isValid}
          className="ml-auto"
        >
          {isLastStep ? submitLabel : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepForm;
