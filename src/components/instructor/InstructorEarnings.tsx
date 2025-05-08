
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const InstructorEarnings = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
          <p className="text-muted-foreground">
            Suivez vos revenus, établissez des rapports financiers et gérez vos paiements depuis cette interface qui sera bientôt disponible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorEarnings;
