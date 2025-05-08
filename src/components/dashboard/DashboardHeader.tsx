
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string | undefined;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {userName} ! Voici votre espace personnel.
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button onClick={() => navigate("/courses")}>
          Explorer les cours
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
