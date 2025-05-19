
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface NoCompanyMessageProps {
  onNavigate: NavigateFunction;
  isDemoUser: boolean;
}

export const NoCompanyMessage: React.FC<NoCompanyMessageProps> = ({ onNavigate, isDemoUser }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="text-xl">Aucune entreprise configurée</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p className="mb-4">
            Vous n'avez pas encore configuré votre entreprise. 
            Pour gérer vos employés, vous devez d'abord créer une entreprise.
          </p>
          
          {isDemoUser && (
            <p className="text-sm bg-amber-50 text-amber-800 p-3 rounded border border-amber-200">
              Note: Votre compte de démonstration sera automatiquement configuré avec une entreprise
              lorsque vous accéderez au tableau de bord.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => onNavigate('/entreprise')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isDemoUser ? "Aller au tableau de bord" : "Créer mon entreprise"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
