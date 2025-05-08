
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const InstructorReviews = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
          <p className="text-muted-foreground">
            Bientôt, vous pourrez consulter, répondre et gérer les avis laissés par vos étudiants sur vos cours.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorReviews;
