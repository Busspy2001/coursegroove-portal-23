
import React from "react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyData } from "@/components/entreprise-dashboard/overview/useCompanyData";
import { useNavigate } from "react-router-dom";
import { NoCompanyMessage } from "@/components/entreprise-dashboard/employees/components/NoCompanyMessage";
import { OverviewMetricCard } from "@/components/entreprise-dashboard/overview/OverviewMetricCard";
import { OverviewActivityCard } from "@/components/entreprise-dashboard/overview/OverviewActivityCard";

const BusinessDashboard = () => {
  const { currentUser } = useAuth();
  const { companyData, stats, loading } = useCompanyData(currentUser);
  const navigate = useNavigate();

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  // No company state
  if (!companyData) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={currentUser?.is_demo === true} />;
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
          value={stats?.total_employees?.toString() || "0"}
          icon="users"
          trend={"+2 ce mois"}
          trendUp={true}
        />
        <OverviewMetricCard
          title="Formations en cours"
          value={stats?.active_courses?.toString() || "0"}
          icon="book"
          trend={"+1 cette semaine"}
          trendUp={true}
        />
        <OverviewMetricCard
          title="Départements"
          value={stats?.departments_count?.toString() || "0"}
          icon="building"
        />
        <OverviewMetricCard
          title="Taux de complétion"
          value={`${stats?.completion_rate || 0}%`}
          icon="award"
          trend={"+5% ce mois"}
          trendUp={true}
        />
      </div>

      {stats?.recent_activities && stats.recent_activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recent_activities.map((activity, i) => (
                <OverviewActivityCard
                  key={i}
                  type={activity.type}
                  message={activity.message}
                  date={activity.date}
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
