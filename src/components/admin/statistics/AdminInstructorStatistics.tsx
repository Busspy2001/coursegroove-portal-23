
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BookOpen, StarHalf, LineChart, BarChart3 } from "lucide-react";

export const AdminInstructorStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total instructeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-5 w-5 text-schoolier-blue mr-2" />
              <div className="text-2xl font-bold">248</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cours publiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-schoolier-teal mr-2" />
              <div className="text-2xl font-bold">1,457</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Note moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <StarHalf className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">4.7</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€854,782</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LineChart className="mr-2 h-5 w-5 text-schoolier-blue" />
              Évolution du nombre d'instructeurs
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
              <BarChart3 className="mr-2 h-5 w-5 text-schoolier-teal" />
              Cours par catégorie
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
