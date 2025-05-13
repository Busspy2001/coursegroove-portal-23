
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, PieChart, BuildingSquare, Users, CalendarRange } from "lucide-react";

export const AdminStatisticsComparison = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Comparatif B2C vs B2B</h2>
          <p className="text-muted-foreground">Analyse comparative entre segments utilisateurs et entreprises</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarRange className="h-4 w-4 mr-2" />
            Derniers 12 mois
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-schoolier-teal" />
                B2C - Utilisateurs individuels
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Utilisateurs</p>
                <p className="text-2xl font-bold">18,742</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Revenu moyen</p>
                <p className="text-2xl font-bold">€65</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Taux conversion</p>
                <p className="text-2xl font-bold">3.8%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Rétention</p>
                <p className="text-2xl font-bold">42%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BuildingSquare className="h-5 w-5 mr-2 text-schoolier-blue" />
              B2B - Clients entreprises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Entreprises</p>
                <p className="text-2xl font-bold">284</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Revenu moyen</p>
                <p className="text-2xl font-bold">€4,250</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Taux conversion</p>
                <p className="text-2xl font-bold">12.5%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Rétention</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-schoolier-purple" />
            Répartition globale des revenus
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="retention">Rétention</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des revenus B2C</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <p>Graphique en développement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Évolution des revenus B2B</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <p>Graphique en développement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métriques d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p>Graphique en développement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse de rétention comparative</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p>Graphique en développement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indices de satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p>Graphique en développement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
