
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, GraduationCap, Upload, BarChart3, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BusinessStatistics } from "@/services/supabase-business-data";
import { OverviewActivityCard } from "../OverviewActivityCard";

interface ActivityTabContentProps {
  stats: BusinessStatistics | null;
}

export const ActivityTabContent: React.FC<ActivityTabContentProps> = ({ stats }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Activité récente
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              Dernières 24h
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-4">
            {stats?.recent_activities ? (
              stats.recent_activities.map((activity, i) => (
                <OverviewActivityCard 
                  key={i}
                  type={activity.type}
                  message={activity.message}
                  timestamp={activity.date}
                />
              ))
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                Aucune activité récente
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" onClick={() => navigate("/entreprise/employes")}>
            <span>Voir toutes les activités</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Actions rapides
          </CardTitle>
          <CardDescription>
            Gérez votre entreprise avec ces actions rapides
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => navigate("/entreprise/employes")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Ajouter un employé</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => navigate("/entreprise/formations/ajouter")}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Créer une formation</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => navigate("/entreprise/formations/assigner")}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span>Assigner une formation</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => navigate("/entreprise/statistiques")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Voir les statistiques</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => navigate("/entreprise/facturation")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Gérer l'abonnement</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
