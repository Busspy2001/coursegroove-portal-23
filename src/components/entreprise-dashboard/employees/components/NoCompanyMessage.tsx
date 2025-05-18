
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface NoCompanyMessageProps {
  onNavigate: (path: string) => void;
}

export const NoCompanyMessage: React.FC<NoCompanyMessageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-lg w-full text-center space-y-4">
        <div className="mx-auto bg-amber-100 rounded-full p-3 w-fit">
          <Briefcase className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-semibold text-amber-800">Aucune entreprise associée</h2>
        <p className="text-amber-700">
          Vous n'avez pas encore d'entreprise configurée dans votre compte.
          Veuillez contacter un administrateur pour configurer votre espace entreprise.
        </p>
        <div className="pt-4">
          <Button variant="outline" onClick={() => onNavigate("/contact")}>
            Contacter le support
          </Button>
        </div>
      </div>
    </div>
  );
};
