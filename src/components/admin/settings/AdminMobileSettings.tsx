
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone } from "lucide-react";

const AdminMobileSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Adaptabilité mobile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <MonitorSmartphone className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Les paramètres d'adaptabilité mobile seront bientôt disponibles.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMobileSettings;
