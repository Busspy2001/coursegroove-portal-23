
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, DollarSign, Star } from "lucide-react";

export const AdminInstructorStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Statistiques instructeurs</h2>
          <p className="text-muted-foreground">Analyse détaillée des performances des instructeurs</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <User className="w-4 h-4 mr-2 text-schoolier-blue" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Total instructeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">428</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <BookOpen className="w-4 h-4 mr-2 text-schoolier-blue" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Cours par instructeur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <DollarSign className="w-4 h-4 mr-2 text-schoolier-blue" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus moyens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2,845</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center space-y-0">
            <Star className="w-4 h-4 mr-2 text-schoolier-blue" />
            <CardTitle className="text-sm font-medium text-muted-foreground">Note moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quality">Qualité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Classement des instructeurs par performance</CardTitle>
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
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des revenus</CardTitle>
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
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mesures d'engagement</CardTitle>
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
        
        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métriques de qualité</CardTitle>
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
