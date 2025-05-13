
import React, { useState } from "react";
import { StatsGrid, RecentActivities, Activity } from "./dashboard";
import AlertsPanel from "./dashboard/AlertsPanel";
import DailyTasks from "./dashboard/DailyTasks";
import ModulesStatus from "./dashboard/ModulesStatus";
import { AdminAlert, AdminTask, AdminModule } from "@/types/admin-types";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminGlobalDashboard = () => {
  // État actif pour les onglets du dashboard
  const [activeTab, setActiveTab] = useState("today");
  
  // Données mock - dans une implémentation réelle, ces données viendraient de Supabase
  const stats = {
    totalUsers: 1245,
    newUsersToday: 32,
    totalCourses: 87,
    pendingCourses: 5,
    totalRevenue: "34,950€",
    revenueGrowth: "+12.5%",
    activeUsers: 678,
    averageRating: 4.7,
    alertsCount: 3,
    ticketsCount: 7,
    pendingReviews: 12,
    completionRate: 78,
    businessCustomers: 18,
    bizUsersTotal: 347,
    courseAbandonRate: 8.2,
  };

  const recentActivities: Activity[] = [
    { id: 1, type: "user_registration", name: "Marie Dupont", time: "Il y a 23 minutes" },
    { id: 2, type: "course_published", name: "Python pour débutants", author: "Jean Michel", time: "Il y a 2 heures" },
    { id: 3, type: "course_review", name: "Design UI/UX", rating: 5, author: "Sophie Martin", time: "Il y a 3 heures" },
    { id: 4, type: "payment_received", name: "Paiement reçu", amount: "149€", course: "JavaScript Avancé", time: "Il y a 5 heures" },
    { id: 5, type: "business_signup", name: "TechCorp SAS", time: "Il y a 8 heures" },
    { id: 6, type: "user_support", name: "Demande de remboursement", author: "Lucas Bernard", time: "Il y a 12 heures" },
    { id: 7, type: "system_alert", name: "Pic d'utilisation serveur", time: "Hier, 17:42" },
  ];

  // Données mock pour les alertes
  const [alerts, setAlerts] = useState<AdminAlert[]>([
    {
      id: "1",
      title: "Panne API paiement",
      message: "L'API de paiement Stripe est momentanément inaccessible. Les paiements pourraient être affectés.",
      status: "danger",
      date: "Aujourd'hui, 09:23",
      read: false,
      actionRequired: true,
      category: "system"
    },
    {
      id: "2",
      title: "Signalement d'abus",
      message: "Un instructeur a été signalé pour contenu inapproprié dans le cours 'Marketing Digital'",
      status: "warning",
      date: "Aujourd'hui, 10:15",
      read: false,
      actionRequired: true,
      category: "course"
    },
    {
      id: "3",
      title: "Anomalie détectée",
      message: "Taux d'abandon anormalement élevé sur le cours 'Python avancé'. Vérification requise.",
      status: "warning",
      date: "Hier, 18:42",
      read: true,
      actionRequired: false,
      category: "course"
    },
    {
      id: "4",
      title: "Nouvelle entreprise",
      message: "LearningCorp a rejoint Schoolier en tant que client business. 25 licences activées.",
      status: "success",
      date: "Aujourd'hui, 11:30",
      read: false,
      actionRequired: false,
      category: "business"
    }
  ]);

  // Données mock pour les tâches
  const [tasks, setTasks] = useState<AdminTask[]>([
    {
      id: "1",
      title: "Modérer 5 nouveaux cours",
      description: "Vérifier et approuver les cours récemment soumis",
      priority: "high",
      due: "Aujourd'hui, 17:00",
      completed: false,
      category: "moderation"
    },
    {
      id: "2",
      title: "Répondre aux tickets support",
      description: "7 tickets en attente de réponse",
      priority: "medium",
      due: "Aujourd'hui, 16:00",
      completed: false,
      category: "support"
    },
    {
      id: "3",
      title: "Valider nouvelle entreprise",
      description: "Société Acme Inc. en attente d'approbation",
      priority: "medium",
      due: "Demain, 12:00",
      completed: false,
      assignedTo: "Thomas",
      category: "business"
    },
    {
      id: "4",
      title: "Mise à jour des CGU",
      description: "Publier les nouvelles conditions d'utilisation",
      priority: "low",
      due: "Aujourd'hui, 11:00",
      completed: true,
      category: "system"
    },
    {
      id: "5",
      title: "Audit sécurité mensuel",
      description: "Vérification des logs d'accès et des vulnérabilités",
      priority: "high",
      due: "Demain, 10:00",
      completed: false,
      category: "security"
    }
  ]);

  // État des modules
  const modules: AdminModule[] = [
    { id: "users", name: "Utilisateurs", alerts: 2, status: "warning" },
    { id: "courses", name: "Cours", alerts: 5, status: "danger" },
    { id: "business", name: "Entreprises", alerts: 0, status: "success" },
    { id: "finance", name: "Finance", alerts: 1, status: "warning" },
    { id: "statistics", name: "Statistiques", alerts: 0, status: "success" },
    { id: "security", name: "Sécurité", alerts: 0, status: "success" },
    { id: "notifications", name: "Notifications", alerts: 0, status: "neutral" },
    { id: "dashboard", name: "Tableau de bord", alerts: 0, status: "neutral" },
  ];

  // Handler pour marquer une alerte comme lue
  const handleMarkAlertAsRead = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
    toast({
      title: "Alerte marquée comme lue",
      description: "L'alerte a été marquée comme lue avec succès.",
    });
  };

  // Handler pour compléter/décompléter une tâche
  const handleCompleteTask = (id: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed } : task
      )
    );
    toast({
      title: completed ? "Tâche terminée" : "Tâche réactivée",
      description: completed ? "La tâche a été marquée comme terminée." : "La tâche a été réactivée.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tableau de bord global</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="today" className="text-xs">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="week" className="text-xs">Cette semaine</TabsTrigger>
            <TabsTrigger value="month" className="text-xs">Ce mois</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Key metrics */}
      <TabsContent value="today" className="m-0">
        <StatsGrid stats={stats} />
      </TabsContent>
      
      <TabsContent value="week" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques hebdomadaires</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            Graphiques de performance sur 7 jours (non implémenté)
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="month" className="m-0">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques mensuelles</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            Graphiques de performance sur 30 jours (non implémenté)
          </CardContent>
        </Card>
      </TabsContent>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alertes critiques */}
        <AlertsPanel 
          alerts={alerts} 
          onMarkAsRead={handleMarkAlertAsRead} 
          onViewAll={() => console.log("Voir toutes les alertes")} 
        />
        
        {/* Tâches du jour */}
        <DailyTasks 
          tasks={tasks} 
          onCompleteTask={handleCompleteTask} 
          onViewAll={() => console.log("Voir toutes les tâches")} 
        />
      </div>
      
      {/* État des modules */}
      <ModulesStatus modules={modules} />
      
      {/* Recent activities */}
      <RecentActivities activities={recentActivities} />
    </div>
  );
};

export default AdminGlobalDashboard;
