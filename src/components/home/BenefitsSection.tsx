
import React from "react";
import { Clock, Award, Users } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-16 container px-6 mx-auto">
      <h2 className="heading-2 text-center mb-4 font-spartan">Pourquoi choisir Schoolier</h2>
      <p className="subheading text-center mb-12 max-w-3xl mx-auto">
        Notre plateforme unique vous offre tous les outils pour réussir votre parcours d'apprentissage
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-schoolier-blue" />
          </div>
          <h3 className="text-xl font-semibold mb-2 font-spartan">🎓 Apprentissage flexible</h3>
          <p className="text-muted-foreground">
            Suivez vos cours à votre rythme, où que vous soyez et quand vous le souhaitez.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-schoolier-teal" />
          </div>
          <h3 className="text-xl font-semibold mb-2 font-spartan">🏅 Certifications reconnues</h3>
          <p className="text-muted-foreground">
            Boostez votre CV avec des certifications reconnues par les entreprises du secteur.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-schoolier-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2 font-spartan">👩‍🏫 Formateurs experts</h3>
          <p className="text-muted-foreground">
            Apprenez avec les meilleurs professionnels du secteur et bénéficiez de leur expérience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
