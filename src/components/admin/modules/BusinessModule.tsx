
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from 'lucide-react';

const BusinessModule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Gestion des Entreprises</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Entreprises clientes
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en développement. Cette section permettra de gérer les entreprises clientes, leurs abonnements et utilisateurs.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModule;
