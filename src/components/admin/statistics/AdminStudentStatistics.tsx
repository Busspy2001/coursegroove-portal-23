
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Clock, PieChart, LineChart } from "lucide-react";

export const AdminStudentStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-schoolier-blue mr-2" />
              <div className="text-2xl font-bold">24,856</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Certifications obtenues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-schoolier-teal mr-2" />
              <div className="text-2xl font-bold">8,329</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temps moyen d'apprentissage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">4.2h / sem.</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LineChart className="mr-2 h-5 w-5 text-schoolier-blue" />
              Évolution des inscriptions
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
              <PieChart className="mr-2 h-5 w-5 text-schoolier-teal" />
              Répartition démographique
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
