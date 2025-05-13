
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, BookOpen, DollarSign, Activity, Star, 
  TrendingUp, BarChart, FileWarning, Building, Percent 
} from "lucide-react";
import { type AdminStats } from "@/types/admin-types";

interface StatsGridProps {
  stats: AdminStats;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const statCards = [
    {
      title: "Utilisateurs totaux",
      value: stats.totalUsers.toLocaleString(),
      description: `+${stats.newUsersToday} aujourd'hui`,
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up",
    },
    {
      title: "Cours publiés",
      value: stats.totalCourses.toLocaleString(),
      description: `${stats.pendingCourses} en attente`,
      icon: <BookOpen className="h-4 w-4 text-indigo-600" />,
      trend: "up",
    },
    {
      title: "Revenus",
      value: stats.totalRevenue,
      description: stats.revenueGrowth,
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      trend: "up",
    },
    {
      title: "Utilisateurs actifs",
      value: stats.activeUsers.toLocaleString(),
      description: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% du total`,
      icon: <Activity className="h-4 w-4 text-teal-600" />,
      trend: "up",
    },
    {
      title: "Note moyenne",
      value: stats.averageRating.toFixed(1),
      description: `Sur 5 étoiles`,
      icon: <Star className="h-4 w-4 text-amber-600" />,
      trend: "up",
    },
    {
      title: "Tickets support",
      value: stats.ticketsCount.toString(),
      description: `${stats.ticketsCount > 5 ? 'Attention requise' : 'Sous contrôle'}`,
      icon: <FileWarning className="h-4 w-4 text-red-600" />,
      trend: stats.ticketsCount > 5 ? "down" : "neutral",
    },
    {
      title: "Entreprises",
      value: stats.businessCustomers.toString(),
      description: `${stats.bizUsersTotal} utilisateurs B2B`,
      icon: <Building className="h-4 w-4 text-purple-600" />,
      trend: "up",
    },
    {
      title: "Taux de complétion",
      value: `${stats.completionRate}%`,
      description: `${100 - stats.completionRate}% d'abandon`,
      icon: <Percent className="h-4 w-4 text-cyan-600" />,
      trend: stats.completionRate > 70 ? "up" : "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {card.trend === "up" && <TrendingUp className="mr-1 h-3 w-3 text-green-500" />}
              {card.trend === "down" && <TrendingUp className="mr-1 h-3 w-3 text-red-500 rotate-180" />}
              {card.trend === "neutral" && <BarChart className="mr-1 h-3 w-3 text-gray-500" />}
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
