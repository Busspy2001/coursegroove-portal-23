
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserData } from "@/hooks/use-user-data";

interface DashboardHeaderProps {
  userName: string | undefined;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { stats } = useUserData();
  
  // Overall progress calculation (assuming it's the average progress of enrolled courses)
  const overallProgress = stats.averageProgress || 0;
  
  return (
    <div className="flex flex-col space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Bonjour, {userName || 'Étudiant'} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue dans votre espace personnel d'apprentissage
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate("/courses")}>
            Explorer les cours
          </Button>
        </div>
      </div>
      
      {/* Global progress bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progression globale</span>
          <span className="text-sm font-semibold">{Math.round(overallProgress)}%</span>
        </div>
        <Progress 
          value={overallProgress} 
          className="h-2 bg-schoolier-light-gray"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
