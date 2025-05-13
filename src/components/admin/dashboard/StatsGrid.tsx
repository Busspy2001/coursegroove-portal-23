
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, BarChart3, DollarSign, Star, Clock, Building, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsProps {
  totalUsers: number;
  newUsersToday: number;
  totalCourses: number;
  pendingCourses: number;
  totalRevenue: string;
  revenueGrowth: string;
  activeUsers: number;
  averageRating: number;
  alertsCount: number;
  ticketsCount: number;
  pendingReviews: number;
  completionRate: number;
  businessCustomers: number;
  bizUsersTotal: number;
  courseAbandonRate: number;
}

interface StatsGridProps {
  stats: StatsProps;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  // Fonction pour obtenir la couleur de tendance
  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-green-600 dark:text-green-400';
    if (trend.startsWith('-')) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  // Statistiques principales
  const mainStats = [
    { 
      title: 'Utilisateurs totaux', 
      value: stats.totalUsers.toLocaleString(), 
      icon: <Users className="h-4 w-4" />,
      trend: `+${stats.newUsersToday} aujourd'hui`,
      trendColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    { 
      title: 'Cours disponibles', 
      value: stats.totalCourses.toLocaleString(), 
      icon: <BookOpen className="h-4 w-4" />,
      trend: `${stats.pendingCourses} en attente`,
      trendColor: stats.pendingCourses > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    { 
      title: 'Revenus totaux', 
      value: stats.totalRevenue, 
      icon: <DollarSign className="h-4 w-4" />,
      trend: stats.revenueGrowth,
      trendColor: getTrendColor(stats.revenueGrowth),
      bgColor: 'bg-green-50 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    { 
      title: 'Note moyenne', 
      value: stats.averageRating.toString(), 
      icon: <Star className="h-4 w-4" />,
      trend: `${stats.pendingReviews} avis en attente`,
      trendColor: stats.pendingReviews > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    { 
      title: 'Utilisateurs actifs', 
      value: stats.activeUsers.toLocaleString(), 
      icon: <Clock className="h-4 w-4" />,
      trend: `${stats.completionRate}% taux d'achèvement`,
      trendColor: stats.completionRate > 75 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    { 
      title: 'Clients entreprises', 
      value: stats.businessCustomers.toString(), 
      icon: <Building className="h-4 w-4" />,
      trend: `${stats.bizUsersTotal} utilisateurs B2B`,
      trendColor: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    { 
      title: 'Tickets support', 
      value: stats.ticketsCount.toString(), 
      icon: <AlertTriangle className="h-4 w-4" />,
      trend: `${stats.alertsCount} alertes système`,
      trendColor: stats.alertsCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-red-50 dark:bg-red-900',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    { 
      title: 'Taux d\'abandon', 
      value: `${stats.courseAbandonRate}%`, 
      icon: <BarChart3 className="h-4 w-4" />,
      trend: 'Nécessite attention',
      trendColor: stats.courseAbandonRate > 5 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mainStats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <p className={cn("text-xs", stat.trendColor)}>
                  {stat.trend}
                </p>
              </div>
              <div className={cn(
                "p-2 rounded-full",
                stat.bgColor, 
                stat.iconColor
              )}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
