
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const EmptyCourseState = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-8 text-center">
      <div className="mb-4 flex justify-center">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Aucun cours inscrit</h3>
      <p className="text-muted-foreground mb-6">
        Vous n'êtes inscrit à aucun cours pour le moment. Explorez notre catalogue pour commencer votre parcours d'apprentissage.
      </p>
      <Button onClick={() => navigate("/courses")}>
        Découvrir les cours
      </Button>
    </Card>
  );
};

export default EmptyCourseState;
