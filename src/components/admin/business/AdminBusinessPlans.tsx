
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdminBusinessPlans = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Plans & Abonnements Entreprises</h2>
          <p className="text-muted-foreground">Gérez les différentes offres pour les clients B2B</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau plan
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BriefcaseBusiness className="mr-2 h-5 w-5 text-schoolier-blue" />
            Plans actifs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
            <p>La gestion des plans d'abonnements entreprises sera disponible prochainement.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
