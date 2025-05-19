
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepFormProps {
  steps: {
    title: string;
    description?: string;
    component: React.ReactNode;
    isValid?: boolean;
  }[];
  onComplete: () => void;
  submitLabel?: string;
}

export const StepForm: React.FC<StepFormProps> = ({
  steps,
  onComplete,
  submitLabel = "Terminer",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];
  const isStepValid = currentStepData.isValid !== undefined ? currentStepData.isValid : true;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-xs font-medium ${index === currentStep ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-1 rounded-full">
          <motion.div 
            className="bg-primary h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-xs ${index === currentStep ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[200px]"
        >
          {currentStepData.description && (
            <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>
          )}
          {currentStepData.component}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={prevStep}
          className={`${currentStep === 0 ? 'invisible' : ''}`}
          size="sm"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Retour
        </Button>
        
        <Button
          type="button"
          onClick={nextStep}
          disabled={!isStepValid}
          className="ml-auto"
          size="sm"
        >
          {isLastStep ? submitLabel : (
            <>
              Suivant <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepForm;
