
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, LineChart, BookOpen, Clock, Award } from "lucide-react";

export const AdminStudentStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Statistiques étudiants</h2>
          <p className="text-muted-foreground">Analyse détaillée des comportements et performances des étudiants</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <Users className="w-4 h-4 mr-2 text-schoolier-teal" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Total étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,892</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <BookOpen className="w-4 h-4 mr-2 text-schoolier-teal" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Cours par étudiant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <Clock className="w-4 h-4 mr-2 text-schoolier-teal" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Tps moyen apprentissage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <Award className="w-4 h-4 mr-2 text-schoolier-teal" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48%</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Démographie</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
          <TabsTrigger value="retention">Rétention</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement étudiant sur la plateforme</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p>Graphique en développement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Données démographiques</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <p>Graphique en développement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progression" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Courbes de progression</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
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
              <CardTitle>Analyse de rétention</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
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
