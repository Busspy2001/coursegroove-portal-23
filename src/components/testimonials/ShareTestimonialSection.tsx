
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareTestimonialSectionProps {
  onOpenDialog: () => void;
}

const ShareTestimonialSection: React.FC<ShareTestimonialSectionProps> = ({ onOpenDialog }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Vous avez une histoire à partager ?</h2>
          <p className="text-gray-700 mb-8">
            Si vous êtes un apprenant de Schoolier et que vous souhaitez partager votre expérience, nous serions ravis de l'entendre !
          </p>
          <Button 
            className="bg-schoolier-blue hover:bg-schoolier-blue/90"
            onClick={onOpenDialog}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Partager votre témoignage
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShareTestimonialSection;
