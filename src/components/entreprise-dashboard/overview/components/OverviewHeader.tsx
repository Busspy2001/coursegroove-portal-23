
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OverviewHeaderProps {
  userName: string | undefined;
}

export const OverviewHeader: React.FC<OverviewHeaderProps> = ({ userName }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace entreprise, {userName || "Administrator"}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline"
          className="hidden md:flex"
          onClick={() => navigate("/entreprise/parametres")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Button>
        <Button onClick={() => navigate("/entreprise/formations/ajouter")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle formation
        </Button>
      </div>
    </div>
  );
};
