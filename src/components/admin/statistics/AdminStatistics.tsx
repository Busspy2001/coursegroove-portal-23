
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, User, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AdminStatistics = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Vue d'ensemble des statistiques</h2>
          <p className="text-muted-foreground">Analysez les performances globales de la plateforme</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Utilisateurs actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">5,247</div>
              <div className="ml-2 text-sm text-green-500">+12.5%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cours publiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">432</div>
              <div className="ml-2 text-sm text-green-500">+8.3%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">€48,294</div>
              <div className="ml-2 text-sm text-green-500">+15.2%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">68%</div>
              <div className="ml-2 text-sm text-green-500">+5.1%</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="growth">Croissance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Croissance utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mesures d'engagement</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu des revenus</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sections spécifiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2" 
                onClick={() => navigate("/admin/statistics/instructors")}
              >
                <User className="h-6 w-6 text-schoolier-blue" />
                <span>Statistiques instructeurs</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/admin/statistics/students")}
              >
                <Users className="h-6 w-6 text-schoolier-teal" />
                <span>Statistiques étudiants</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/admin/statistics/comparison")}
              >
                <PieChart className="h-6 w-6 text-schoolier-red" />
                <span>B2C vs B2B</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate("/admin/statistics/trends")}
              >
                <LineChart className="h-6 w-6 text-schoolier-purple" />
                <span>Tendances & prévisions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
