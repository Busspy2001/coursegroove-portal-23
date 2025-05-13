
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

const StatisticsModule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Statistiques</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Statistiques de la plateforme
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en développement. Cette section affichera des statistiques détaillées sur l'utilisation de la plateforme.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsModule;
