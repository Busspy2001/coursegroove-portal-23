
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 md:py-16 bg-schoolier-blue text-white">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="heading-2 mb-4 md:mb-6 font-spartan">Prêt à transformer vos ambitions en compétences ?</h2>
        <p className="subheading text-blue-100 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
          Rejoignez des milliers d'étudiants et commencez votre parcours d'apprentissage dès aujourd'hui avec Schoolier. L'inscription est gratuite !
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/register")} 
            className="bg-white text-schoolier-blue hover:bg-blue-50 font-spartan w-full sm:w-auto"
          >
            S'inscrire gratuitement
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/courses")} 
            className="border-white text-white hover:bg-white/10 font-spartan w-full sm:w-auto"
          >
            Explorer les cours
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-100">
          Déjà plus de 10 000 étudiants nous font confiance. Rejoignez-les maintenant !
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
