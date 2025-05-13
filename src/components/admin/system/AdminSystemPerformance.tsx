
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const AdminSystemPerformance = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Performance système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Le moniteur de performance système sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemPerformance;
