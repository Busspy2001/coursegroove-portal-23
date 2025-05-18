
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const UpcomingTabContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Formations à venir</CardTitle>
        <CardDescription>
          Échéances à venir pour les formations assignées dans votre entreprise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="p-4">
            <div className="flex items-center justify-center h-20">
              <p className="text-muted-foreground">
                Aucune échéance prochaine pour le moment
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/entreprise/formations/assigner")}>
          Assigner une nouvelle formation
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
