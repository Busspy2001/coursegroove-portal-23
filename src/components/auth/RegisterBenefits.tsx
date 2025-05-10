
import React from "react";
import { CheckCircle } from "lucide-react";

export const RegisterBenefits = () => {
  return (
    <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-teal to-schoolier-blue rounded-l-xl text-white">
      <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">Rejoignez la communauté Schoolier</h2>
        <p className="mb-6">
          Créez votre compte et commencez votre parcours d'apprentissage dès aujourd'hui avec des milliers de cours disponibles.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Accès à plus de 10 000 cours de qualité</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Certificats reconnus par les entreprises</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Communauté active d'apprenants</p>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-4" />
            <p>Satisfaction garantie pendant 30 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
};
