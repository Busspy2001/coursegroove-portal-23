
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Send, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const AdminNotificationsManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestion des notifications</h2>
          <p className="text-muted-foreground">Gérez et consultez l'historique des notifications</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Send className="mr-2 h-4 w-4" />
          Nouvelle notification
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Bell className="mr-2 h-5 w-5 text-schoolier-blue" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="system">Système</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="courses">Cours</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Mise à jour système</h3>
                    <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Système</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée à tous les utilisateurs • 13/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Nouveaux cours disponibles</h3>
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">Cours</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée aux étudiants tech • 10/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Offre spéciale week-end</h3>
                    <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Marketing</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée aux utilisateurs actifs • 08/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
