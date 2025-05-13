
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const AdminCourseReviews = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Avis et évaluations des cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <StarIcon className="h-12 w-12 mx-auto mb-4 text-amber-400" />
              <p className="mb-2">Cette fonctionnalité est en cours de développement.</p>
              <p>La gestion des avis et évaluations sera bientôt disponible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourseReviews;
