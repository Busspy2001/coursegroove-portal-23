
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart, LineChart } from "lucide-react";

export const AdminBusinessStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Entreprises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Licences Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,128</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu Mensuel B2B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€42,580</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <PieChart className="mr-2 h-5 w-5 text-schoolier-blue" />
              Répartition par secteur
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LineChart className="mr-2 h-5 w-5 text-schoolier-teal" />
              Évolution des abonnements B2B
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
