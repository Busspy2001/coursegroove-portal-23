
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Users, Building2, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminStatisticsComparison = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5 text-schoolier-blue" />
                  Revenus B2C
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">€452,328</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-schoolier-blue mr-2"></div>
                  <span>73% du revenu total</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Building2 className="mr-2 h-5 w-5 text-schoolier-teal" />
                  Revenus B2B
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">€167,454</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-schoolier-teal mr-2"></div>
                  <span>27% du revenu total</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="mr-2 h-5 w-5" />
                Comparaison des revenus
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
            <p>Les données de comparaison utilisateurs seront disponibles prochainement.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
            <p>Les données d'engagement comparatives seront disponibles prochainement.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
            <p>Les données de comparaison des cours seront disponibles prochainement.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
