
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FaqContact = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-3 mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="subheading mb-8">
            Notre équipe de support est disponible pour répondre à toutes vos questions
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/contact")} 
            className="bg-schoolier-teal hover:bg-schoolier-teal/90"
          >
            Contacter le support
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Temps de réponse moyen : moins de 24 heures
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqContact;
