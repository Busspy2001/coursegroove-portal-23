
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, X, Eye, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminSystemAlerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Alertes système</h2>
          <p className="text-muted-foreground">Gérez et répondez aux alertes système</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <Button size="sm" className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <BellRing className="h-4 w-4 mr-2" />
            Configurer alertes
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <AlertTriangle className="mr-2 h-5 w-5 text-schoolier-blue" />
            Alertes système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">
                Actives
                <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">Résolues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <div className="flex items-center justify-between p-4 border-l-4 border-red-500 rounded-r-lg bg-red-50">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">URGENT</Badge>
                    <h3 className="font-medium">Problème de performance base de données</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Détecté le 13/05/2025 à 14:32 • Il y a 28 minutes</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                    <Check className="h-4 w-4 mr-1" />
                    Résoudre
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border-l-4 border-amber-500 rounded-r-lg bg-amber-50">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">MOYEN</Badge>
                    <h3 className="font-medium">Utilisation CPU élevée</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Détecté le 13/05/2025 à 14:28 • Il y a 32 minutes</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                    <Check className="h-4 w-4 mr-1" />
                    Résoudre
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border-l-4 border-blue-500 rounded-r-lg bg-blue-50">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">FAIBLE</Badge>
                    <h3 className="font-medium">Quota de stockage à 80%</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Détecté le 13/05/2025 à 13:45 • Il y a 1 heure 15 minutes</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                    <Check className="h-4 w-4 mr-1" />
                    Résoudre
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resolved">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">RÉSOLU</Badge>
                      <h3 className="font-medium">Erreur SSL temporaire</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Résolu le 12/05/2025 à 16:42</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">RÉSOLU</Badge>
                      <h3 className="font-medium">Tentatives d'authentification anormales</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Résolu le 11/05/2025 à 09:18</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
