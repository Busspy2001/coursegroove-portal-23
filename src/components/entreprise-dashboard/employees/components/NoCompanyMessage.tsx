
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, Plus } from "lucide-react";

interface NoCompanyMessageProps {
  onNavigate: (path: string) => void;
  isDemoUser?: boolean;
}

export const NoCompanyMessage: React.FC<NoCompanyMessageProps> = ({ 
  onNavigate,
  isDemoUser = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-lg w-full text-center space-y-4">
        <div className="mx-auto bg-amber-100 rounded-full p-3 w-fit">
          <Briefcase className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-semibold text-amber-800">Aucune entreprise associée</h2>
        <p className="text-amber-700">
          {isDemoUser 
            ? "Nous allons créer une entreprise de démonstration pour vous. Veuillez actualiser la page."
            : "Vous n'avez pas encore d'entreprise configurée dans votre compte. Veuillez contacter un administrateur pour configurer votre espace entreprise."}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          {isDemoUser ? (
            <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Créer une entreprise démo
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onNavigate("/contact")}>
                Contacter le support
              </Button>
              <Button onClick={() => onNavigate("/entreprise/parametres/entreprise")} className="w-full sm:w-auto">
                <Building2 className="mr-2 h-4 w-4" />
                Configurer mon entreprise
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
