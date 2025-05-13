
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, AlertTriangle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminReports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Flag className="mr-2 h-5 w-5 text-red-500" />
            Signalements des utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                En attente
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Résolus
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>La gestion des signalements utilisateurs sera disponible prochainement.</p>
              </div>
            </TabsContent>
            <TabsContent value="resolved">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-600">
                <p>Aucun signalement résolu à afficher.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
