
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Clock, TrendingUp, Users, BookOpen, Star } from "lucide-react";

const AdminGlobalDashboard = () => {
  // Mock data - in a real implementation, this would come from Supabase
  const stats = {
    totalUsers: 1245,
    newUsersToday: 32,
    totalCourses: 87,
    pendingCourses: 5,
    totalRevenue: "34,950€",
    revenueGrowth: "+12.5%",
    activeUsers: 678,
    averageRating: 4.7,
  };

  const recentActivities = [
    { id: 1, type: "user_registration", name: "Marie Dupont", time: "Il y a 23 minutes" },
    { id: 2, type: "course_published", name: "Python pour débutants", author: "Jean Michel", time: "Il y a 2 heures" },
    { id: 3, type: "course_review", name: "Design UI/UX", rating: 5, author: "Sophie Martin", time: "Il y a 3 heures" },
    { id: 4, type: "payment_received", amount: "149€", course: "JavaScript Avancé", time: "Il y a 5 heures" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tableau de bord global</h2>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.newUsersToday} aujourd'hui
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cours disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.pendingCourses} en attente de modération
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenus générés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalRevenue}</div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-xs text-emerald-500 mt-1">
              {stats.revenueGrowth} ce mois-ci
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Note moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              De tous les cours
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent activities */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
          <CardDescription>
            Les dernières activités sur la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-4 p-2 rounded-md hover:bg-accent">
                <div className="mt-0.5">
                  {activity.type === "user_registration" && (
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Users className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                    </div>
                  )}
                  {activity.type === "course_published" && (
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Check className="h-4 w-4 text-green-500 dark:text-green-300" />
                    </div>
                  )}
                  {activity.type === "course_review" && (
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                      <Star className="h-4 w-4 text-amber-500 dark:text-amber-300" />
                    </div>
                  )}
                  {activity.type === "payment_received" && (
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      {activity.type === "user_registration" && (
                        <p className="text-sm font-medium">
                          Nouvel utilisateur: <span className="font-semibold">{activity.name}</span>
                        </p>
                      )}
                      {activity.type === "course_published" && (
                        <p className="text-sm font-medium">
                          Nouveau cours: <span className="font-semibold">{activity.name}</span> par {activity.author}
                        </p>
                      )}
                      {activity.type === "course_review" && (
                        <p className="text-sm font-medium">
                          Avis sur <span className="font-semibold">{activity.name}</span> ({activity.rating}/5) par {activity.author}
                        </p>
                      )}
                      {activity.type === "payment_received" && (
                        <p className="text-sm font-medium">
                          Paiement de <span className="font-semibold">{activity.amount}</span> pour {activity.course}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">{activity.time}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGlobalDashboard;
