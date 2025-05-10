
import React from "react";
import { Book, User, Lock } from "lucide-react";

export const LoginBenefits = () => {
  return (
    <div className="hidden md:block md:w-1/2 p-8 bg-gradient-to-r from-schoolier-blue to-schoolier-teal rounded-r-xl text-white">
      <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">Bienvenue sur Schoolier</h2>
        <p className="mb-6">
          Accédez à des milliers de cours de qualité et développez vos compétences avec des instructeurs experts.
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="rounded-full bg-white/20 p-2 mr-4">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Profil personnel</h3>
              <p className="text-sm text-blue-100">Suivez votre progression et vos certificats</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="rounded-full bg-white/20 p-2 mr-4">
              <Book className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Bibliothèque de cours</h3>
              <p className="text-sm text-blue-100">Accédez à tous vos cours en un seul endroit</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="rounded-full bg-white/20 p-2 mr-4">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Sécurité garantie</h3>
              <p className="text-sm text-blue-100">Vos données sont protégées et sécurisées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
