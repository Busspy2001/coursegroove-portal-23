
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

const AdminQuickStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard 
          title="Utilisateurs actifs"
          value="1,234"
          icon={Gauge}
          iconColor="text-blue-500"
          subtitle="+12% par rapport au mois dernier"
          subtitleColor="text-green-500"
        />
        <DashboardStatCard 
          title="Nouveaux cours"
          value="28"
          icon={Gauge}
          iconColor="text-amber-500"
          subtitle="+3 cette semaine"
          subtitleColor="text-green-500"
        />
        <DashboardStatCard 
          title="Revenus (30j)"
          value="€9,876"
          icon={Gauge}
          iconColor="text-green-500"
          subtitle="+7.8% par rapport au mois dernier"
          subtitleColor="text-green-500"
        />
        <DashboardStatCard 
          title="Entreprises"
          value="48"
          icon={Gauge}
          iconColor="text-purple-500"
          subtitle="stable"
          subtitleColor="text-gray-500"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Analyse rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <div className="text-center">
              <Gauge className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="mb-2">Les statistiques et analyses détaillées sont en cours de développement.</p>
              <p>Les graphiques interactifs et analyses prédictives seront bientôt disponibles.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuickStats;
