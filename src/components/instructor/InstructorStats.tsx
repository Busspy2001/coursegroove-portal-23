
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const InstructorStats = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
          <p className="text-muted-foreground">
            Des statistiques détaillées et des graphiques sur l'engagement des étudiants seront bientôt disponibles pour vous aider à optimiser vos cours.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorStats;
