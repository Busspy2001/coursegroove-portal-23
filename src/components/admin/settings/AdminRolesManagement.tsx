
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const AdminRolesManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gestion des rôles et permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Le système de gestion des rôles et permissions sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRolesManagement;
