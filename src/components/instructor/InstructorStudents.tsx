
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

const InstructorStudents = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
          <p className="text-muted-foreground">
            Bientôt, vous pourrez gérer vos étudiants, voir leurs progressions et interagir avec eux directement depuis cette interface.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorStudents;
