
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';

const UsersModule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Gestion des Utilisateurs</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Utilisateurs de la plateforme
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en développement. Cette section permettra de gérer les utilisateurs, leurs rôles, et leurs activités.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersModule;
