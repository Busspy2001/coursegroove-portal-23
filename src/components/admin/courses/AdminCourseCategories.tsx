
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";

const AdminCourseCategories = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gestion des catégories et tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <Tag className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>L'outil de gestion des catégories et tags sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourseCategories;
