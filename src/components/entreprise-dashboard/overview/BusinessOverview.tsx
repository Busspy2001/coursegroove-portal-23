
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, BookOpen, Award, Building2 } from "lucide-react";
import { OverviewMetricCard } from "./OverviewMetricCard";
import { OverviewActivityCard } from "./OverviewActivityCard";
import { OverviewChart } from "./OverviewChart";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
}

const BusinessOverview = () => {
  // Données fictives pour l'affichage
  const metrics: MetricCardProps[] = [
    {
      title: "Employés formés",
      value: "124",
      change: "+12%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Heures de formation",
      value: "1,420",
      change: "+5%",
      changeType: "positive",
      icon: Clock
    },
    {
      title: "Formations actives",
      value: "32",
      change: "-3",
      changeType: "negative",
      icon: BookOpen
    },
    {
      title: "Certifications obtenues",
      value: "87",
      change: "+15",
      changeType: "positive",
      icon: Award
    }
  ];

  // Activités récentes (fictives)
  const recentActivities = [
    {
      id: "1",
      user: "Sophie Martin",
      action: "a terminé",
      target: "Introduction à la cybersécurité",
      department: "IT",
      time: "Il y a 2 heures"
    },
    {
      id: "2",
      user: "Thomas Dubois",
      action: "s'est inscrit à",
      target: "Leadership et management d'équipe",
      department: "RH",
      time: "Il y a 3 heures"
    },
    {
      id: "3",
      user: "Julie Leclerc",
      action: "a obtenu la certification",
      target: "Excel avancé",
      department: "Finance",
      time: "Il y a 5 heures"
    },
    {
      id: "4",
      user: "Philippe Moreau",
      action: "a commencé",
      target: "Communication efficace en entreprise",
      department: "Marketing",
      time: "Il y a 8 heures"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue sur votre espace entreprise.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <OverviewMetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Progression mensuelle</CardTitle>
            <CardDescription>Taux de complétion des formations par département</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>Les dernières actions de vos employés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <OverviewActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Départements les plus actifs</CardTitle>
          <CardDescription>Performance des départements ce mois-ci</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Marketing", "IT", "RH", "Finance", "Ventes", "Support"].map((dept, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                <div className={`rounded-full p-2 ${
                  ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-purple-100", "bg-pink-100", "bg-orange-100"][i % 6]
                }`}>
                  <Building2 className={`h-4 w-4 ${
                    ["text-blue-600", "text-green-600", "text-yellow-600", "text-purple-600", "text-pink-600", "text-orange-600"][i % 6]
                  }`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{dept}</p>
                  <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 50}% de complétion</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOverview;
