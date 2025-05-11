
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import TestimonialForm from "./dialog/TestimonialForm";
import type { TestimonialFormData } from "./dialog/TestimonialForm";

interface TestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialDialog: React.FC<TestimonialDialogProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  const handleSubmit = async (data: TestimonialFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Testimonial data:", data);
      
      toast({
        title: "Merci pour votre témoignage !",
        description: "Votre témoignage a été envoyé avec succès et sera examiné par notre équipe.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Partagez votre expérience</DialogTitle>
          <DialogDescription>
            Racontez-nous comment Schoolier vous a aidé dans votre parcours d'apprentissage.
            Votre témoignage inspirera d'autres apprenants.
          </DialogDescription>
        </DialogHeader>
        
        <TestimonialForm 
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialDialog;
