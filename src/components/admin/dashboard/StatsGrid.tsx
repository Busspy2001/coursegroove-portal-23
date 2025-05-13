
import React from "react";
import DashboardStatCard from "./DashboardStatCard";
import { Users, BookOpen, TrendingUp, Star } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalCourses: number;
  pendingCourses: number;
  totalRevenue: string;
  revenueGrowth: string;
  activeUsers: number;
  averageRating: number;
}

interface StatsGridProps {
  stats: DashboardStats;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardStatCard
        title="Utilisateurs totaux"
        value={stats.totalUsers}
        icon={Users}
        subtitle={`+${stats.newUsersToday} aujourd'hui`}
      />
      
      <DashboardStatCard
        title="Cours disponibles"
        value={stats.totalCourses}
        icon={BookOpen}
        subtitle={`${stats.pendingCourses} en attente de modération`}
      />
      
      <DashboardStatCard
        title="Revenus générés"
        value={stats.totalRevenue}
        icon={TrendingUp}
        iconColor="text-emerald-500"
        subtitle={`${stats.revenueGrowth} ce mois-ci`}
        subtitleColor="text-emerald-500"
      />
      
      <DashboardStatCard
        title="Note moyenne"
        value={stats.averageRating}
        icon={Star}
        iconColor="text-amber-400"
        subtitle="De tous les cours"
      />
    </div>
  );
};

export default StatsGrid;
