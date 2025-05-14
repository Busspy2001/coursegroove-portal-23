
import React from "react";
import { CheckCircle } from "lucide-react";

export const LoginBenefits = () => {
  return (
    <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-teal to-schoolier-blue rounded-l-xl text-white">
      <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">Bienvenue sur Schoolier</h2>
        <p className="mb-6">
          Connectez-vous pour accéder à votre espace d'apprentissage et continuer votre progression.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Accédez à vos cours et certifications</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Suivez votre progression</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Interagissez avec les formateurs et autres étudiants</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Obtenez des certifications reconnues</p>
          </div>
        </div>
      </div>
    </div>
  );
};
