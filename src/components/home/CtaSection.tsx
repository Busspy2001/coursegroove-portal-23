
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-schoolier-blue text-white">
      <div className="container px-6 mx-auto text-center">
        <h2 className="heading-2 mb-6 font-spartan">Prêt à transformer vos ambitions en compétences ?</h2>
        <p className="subheading text-blue-100 max-w-3xl mx-auto mb-8">
          Rejoignez des milliers d'étudiants et commencez votre parcours d'apprentissage dès aujourd'hui avec Schoolier. L'inscription est gratuite !
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" onClick={() => navigate("/register")} className="bg-white text-schoolier-blue hover:bg-blue-50 font-spartan">
            S'inscrire gratuitement
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/courses")} className="border-white text-white hover:bg-white/10 font-spartan">
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
