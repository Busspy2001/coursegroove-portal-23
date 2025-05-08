
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart2, Clock, Award, BookOpen } from "lucide-react";

interface UserStats {
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  averageProgress: number;
  lastActivityDate: Date | null;
}

interface StatsTabProps {
  stats: UserStats;
}

const StatsTab = ({ stats }: StatsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cours inscrits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCoursesEnrolled}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCoursesCompleted} complété{stats.totalCoursesCompleted > 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temps d'étude</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHoursLearned}h</div>
            <p className="text-xs text-muted-foreground">
              {stats.lastActivityDate ? `Dernière activité: ${stats.lastActivityDate.toLocaleDateString()}` : 'Aucune activité'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificats</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCoursesEnrolled - stats.certificatesEarned} cours restants
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progression moyenne</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stats.averageProgress)}%</div>
            <p className="text-xs text-muted-foreground">
              Sur tous les cours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Activité d'apprentissage</CardTitle>
            <CardDescription>Heures passées sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex items-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">
                Les graphiques d'activité seront disponibles prochainement.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Catégories explorées</CardTitle>
            <CardDescription>Répartition par domaine d'étude</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex items-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">
                Les graphiques de catégories seront disponibles prochainement.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsTab;
