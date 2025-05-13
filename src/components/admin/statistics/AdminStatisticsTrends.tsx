
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

const AdminStatisticsTrends = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Tendances & prévisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <LineChart className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Le module d'analyse des tendances et prévisions sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsTrends;
