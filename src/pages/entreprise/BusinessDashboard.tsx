
import React from "react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

// Components
import { LoadingMessage } from "@/components/entreprise-dashboard/shared/LoadingMessage";
import { OverviewMetricCard } from "@/components/entreprise-dashboard/overview/OverviewMetricCard";
import { OverviewActivityCard } from "@/components/entreprise-dashboard/overview/OverviewActivityCard";
import { OverviewChart } from "@/components/entreprise-dashboard/overview/OverviewChart";
import { OverviewUpcomingTable } from "@/components/entreprise-dashboard/overview/OverviewUpcomingTable";
import { OverviewTopPerformers } from "@/components/entreprise-dashboard/overview/OverviewTopPerformers";

// Icons
import { Users, BookOpen, Building2, Award } from "lucide-react";

// Custom hook
import { useOverviewData } from "@/components/entreprise-dashboard/overview/useOverviewData";
import { NoCompanyMessage } from "@/components/entreprise-dashboard/employees/components/NoCompanyMessage";

const BusinessDashboard = () => {
  const { currentUser } = useAuth();
  const { loading, stats } = useOverviewData();
  const navigate = useNavigate();

  console.log("Rendering BusinessDashboard component", { currentUser, loading, stats });

  if (loading) {
    return <LoadingMessage message="Chargement du tableau de bord..." />;
  }

  // Nous utilisons toujours des données de démo comme fallback, donc pas besoin de vérifier si stats est null
  // Si on veut quand même afficher un message pour les utilisateurs réels sans entreprise:
  if (!currentUser?.is_demo && !stats) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={false} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace entreprise, {currentUser?.full_name || currentUser?.name || ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewMetricCard
          title="Employés actifs"
          value={stats.total_employees.toString()}
          description="Membres de l'équipe"
          icon={Users}
          trend={{
            value: "+2 ce mois",
            positive: true
          }}
        />
        <OverviewMetricCard
          title="Formations en cours"
          value={stats.active_courses.toString()}
          description="Cours suivis"
          icon={BookOpen}
          trend={{
            value: "+1 cette semaine",
            positive: true
          }}
        />
        <OverviewMetricCard
          title="Départements"
          value={stats.departments_count.toString()}
          description="Entités"
          icon={Building2}
        />
        <OverviewMetricCard
          title="Taux de complétion"
          value={`${stats.completion_rate}%`}
          description="Progression globale"
          icon={Award}
          trend={{
            value: "+5% ce mois",
            positive: true
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
            <CardDescription>Suivi des formations assignées et complétées</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">Formations à venir</CardTitle>
              <CardDescription>Planification des prochaines formations</CardDescription>
            </div>
            <Button size="sm" variant="ghost">
              <PlusCircle className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent>
            <OverviewUpcomingTable trainings={stats.upcoming_trainings} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top performers</CardTitle>
            <CardDescription>Employés les plus actifs en formation</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewTopPerformers performers={stats.top_performers} />
          </CardContent>
        </Card>
      </div>

      {stats.recent_activities && stats.recent_activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les dernières actions de vos employés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {stats.recent_activities.map((activity) => (
                <OverviewActivityCard
                  key={activity.id}
                  type={activity.type}
                  message={activity.message}
                  timestamp={activity.date}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessDashboard;
