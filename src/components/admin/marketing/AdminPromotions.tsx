
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent, Plus, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AdminPromotions = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Promotions</h2>
          <p className="text-muted-foreground">Gérez les offres spéciales et réductions</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle promotion
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Percent className="mr-2 h-5 w-5 text-schoolier-blue" />
            Promotions actives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Printemps 2025</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Tag className="h-3 w-3 mr-1" />
                <span className="mr-4">25% de réduction</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>Expire le 31/05/2025</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Modifier
              </Button>
              <Button variant="destructive" size="sm">
                Désactiver
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Pack Business</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Tag className="h-3 w-3 mr-1" />
                <span className="mr-4">40% sur les abonnements entreprise</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>Expire le 15/06/2025</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Modifier
              </Button>
              <Button variant="destructive" size="sm">
                Désactiver
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Certifications tech</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Tag className="h-3 w-3 mr-1" />
                <span className="mr-4">15% sur tous les cours tech</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>Expire le 30/06/2025</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Modifier
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
