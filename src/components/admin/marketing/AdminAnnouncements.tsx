
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Plus, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AdminAnnouncements = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Annonces ciblées</h2>
          <p className="text-muted-foreground">Créez et gérez les annonces pour des segments spécifiques</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle annonce
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Megaphone className="mr-2 h-5 w-5 text-schoolier-blue" />
            Annonces actives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Nouveaux cours design</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Target className="h-3 w-3 mr-1" />
                <span className="mr-4">Étudiants en design</span>
                <Users className="h-3 w-3 mr-1 ml-2" />
                <span>2,541 utilisateurs ciblés</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Voir
              </Button>
              <Button variant="destructive" size="sm">
                Désactiver
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Mise à jour plateforme</h3>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Programmée</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Target className="h-3 w-3 mr-1" />
                <span className="mr-4">Tous les utilisateurs</span>
                <Users className="h-3 w-3 mr-1 ml-2" />
                <span>24,856 utilisateurs ciblés</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Voir
              </Button>
              <Button variant="destructive" size="sm">
                Annuler
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Offre instructeurs</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Target className="h-3 w-3 mr-1" />
                <span className="mr-4">Instructeurs tech</span>
                <Users className="h-3 w-3 mr-1 ml-2" />
                <span>128 utilisateurs ciblés</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Voir
              </Button>
              <Button variant="destructive" size="sm">
                Désactiver
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
