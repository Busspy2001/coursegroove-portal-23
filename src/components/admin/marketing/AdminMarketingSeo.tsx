
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

const AdminMarketingSeo = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">SEO & visibilité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Les outils d'optimisation pour les moteurs de recherche seront bientôt disponibles.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMarketingSeo;
