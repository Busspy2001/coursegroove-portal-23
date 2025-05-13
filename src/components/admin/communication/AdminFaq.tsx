
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const AdminFaq = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">FAQ & Centre d'aide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>Le système de gestion de la FAQ et du centre d'aide sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFaq;
