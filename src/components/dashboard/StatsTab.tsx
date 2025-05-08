
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const StatsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Activité d'apprentissage</CardTitle>
            <CardDescription>Heures passées sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex items-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">
                Les graphiques d'activité seront disponibles prochainement.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Catégories explorées</CardTitle>
            <CardDescription>Répartition par domaine d'étude</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex items-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">
                Les graphiques de catégories seront disponibles prochainement.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsTab;
