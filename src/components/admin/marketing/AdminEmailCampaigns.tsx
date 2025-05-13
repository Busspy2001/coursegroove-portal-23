
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Plus, Send, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const AdminEmailCampaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Campagnes emails</h2>
          <p className="text-muted-foreground">Créez et gérez vos campagnes marketing</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle campagne
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Mail className="mr-2 h-5 w-5 text-schoolier-blue" />
            Campagnes emails
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active" className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Actives
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Programmées
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Terminées
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Promotion de printemps</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée à 12,458 utilisateurs • Taux d'ouverture: 32%</p>
                </div>
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Nouveaux cours tech</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée à 8,721 utilisateurs • Taux d'ouverture: 28%</p>
                </div>
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>La programmation de campagnes sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>L'historique des campagnes sera disponible prochainement.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
