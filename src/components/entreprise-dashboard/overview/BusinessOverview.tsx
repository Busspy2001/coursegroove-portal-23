import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calendar,
  GraduationCap,
  Layers,
  MoreHorizontal,
  Plus,
  Settings,
  Upload,
  User,
  Users
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { OverviewMetricCard } from "./OverviewMetricCard";
import { OverviewChart } from "./OverviewChart";
import { OverviewActivityCard } from "./OverviewActivityCard";
import { fetchCompanyData, fetchBusinessStatistics, BusinessStatistics } from "@/services/supabase-business-data";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BusinessOverview = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<any>(null);
  const [stats, setStats] = useState<BusinessStatistics | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const company = await fetchCompanyData();
        setCompanyData(company);
        
        if (company) {
          const statistics = await fetchBusinessStatistics(company.id);
          setStats(statistics);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données du tableau de bord.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }
  
  if (!companyData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-lg w-full text-center space-y-4">
          <div className="mx-auto bg-amber-100 rounded-full p-3 w-fit">
            <Briefcase className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-amber-800">Aucune entreprise associée</h2>
          <p className="text-amber-700">
            Vous n'avez pas encore d'entreprise configurée dans votre compte.
            Veuillez contacter un administrateur pour configurer votre espace entreprise.
          </p>
          <div className="pt-4">
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Contacter le support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace entreprise, {currentUser?.full_name || "Administrator"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="hidden md:flex"
            onClick={() => navigate("/entreprise/parametres")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
          <Button onClick={() => navigate("/entreprise/formations/ajouter")}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle formation
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewMetricCard
          title="Employés"
          value={String(stats?.total_employees || 0)}
          description="employés actifs"
          icon={Users}
          trend={{
            value: "+5%",
            positive: true
          }}
          onClick={() => navigate('/entreprise/employes')}
        />
        <OverviewMetricCard
          title="Départements"
          value={String(stats?.departments_count || 0)}
          description="départements"
          icon={Layers}
          trend={{
            value: "",
            positive: true
          }}
          onClick={() => navigate('/entreprise/departements')}
        />
        <OverviewMetricCard
          title="Formations"
          value={String(stats?.active_courses || 0)}
          description="formations disponibles"
          icon={GraduationCap}
          trend={{
            value: "+2",
            positive: true
          }}
          onClick={() => navigate('/entreprise/formations')}
        />
        <OverviewMetricCard
          title="Taux complétion"
          value={`${stats?.completion_rate || 0}%`}
          description="formations complétées"
          icon={BarChart3}
          trend={{
            value: "+10%",
            positive: true
          }}
          onClick={() => navigate('/entreprise/statistiques')}
        />
      </div>
      
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activité récente</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Activité récente
                  </CardTitle>
                  <Badge variant="outline" className="font-normal">
                    Dernières 24h
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {stats?.recent_activities ? (
                    stats.recent_activities.map((activity, i) => (
                      <OverviewActivityCard 
                        key={i}
                        type={activity.type}
                        message={activity.message}
                        timestamp={activity.date}
                      />
                    ))
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Aucune activité récente
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => navigate("/entreprise/employes")}>
                  <span>Voir toutes les activités</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Actions rapides
                </CardTitle>
                <CardDescription>
                  Gérez votre entreprise avec ces actions rapides
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/entreprise/employes")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Ajouter un employé</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/entreprise/formations/ajouter")}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Créer une formation</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/entreprise/formations/assigner")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Assigner une formation</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/entreprise/statistiques")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Voir les statistiques</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate("/entreprise/facturation")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Gérer l'abonnement</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Progression des formations</CardTitle>
              <CardDescription>
                Suivi des formations assignées et complétées au cours des derniers mois.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px]">
                <OverviewChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Formations à venir</CardTitle>
              <CardDescription>
                Échéances à venir pour les formations assignées dans votre entreprise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center justify-center h-20">
                    <p className="text-muted-foreground">
                      Aucune échéance prochaine pour le moment
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/entreprise/formations/assigner")}>
                Assigner une nouvelle formation
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessOverview;
