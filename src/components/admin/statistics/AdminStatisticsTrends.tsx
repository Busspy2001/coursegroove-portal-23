
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Download, LineChart, TrendingUp } from "lucide-react";

const AdminStatisticsTrends = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Tendances & prévisions</h2>
          <p className="text-muted-foreground">Analyse des tendances et projections futures</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            6 derniers mois
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-schoolier-teal" />
            Croissance et prévisions
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p>Graphique de tendances en développement</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="user_growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user_growth">Croissance utilisateurs</TabsTrigger>
          <TabsTrigger value="revenue_forecast">Prévisions revenus</TabsTrigger>
          <TabsTrigger value="course_completion">Taux de complétion</TabsTrigger>
          <TabsTrigger value="market_trends">Tendances marché</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user_growth" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prévision acquisition utilisateurs</CardTitle>
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
                <CardTitle>Taux de conversion</CardTitle>
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
        
        <TabsContent value="revenue_forecast" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prévisions chiffre d'affaires</CardTitle>
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
                <CardTitle>Analyse de rentabilité</CardTitle>
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
        
        <TabsContent value="course_completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendances taux de complétion</CardTitle>
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
        
        <TabsContent value="market_trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyses de marché</CardTitle>
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

export default AdminStatisticsTrends;
