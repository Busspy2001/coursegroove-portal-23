
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Calendar,
  BarChart2, 
  LineChart, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight
} from "lucide-react";
import { 
  EmployeeProgressChart,
  DepartmentComparisonChart,
  CourseCompletionChart,
  MonthlyEngagementChart
} from "./StatisticsCharts";

const BusinessStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistiques & Rapports</h1>
          <p className="text-muted-foreground">Analysez les performances de formation de votre entreprise.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Période: Ce mois
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter les données
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cartes de statistiques principales */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Temps de formation</p>
                <p className="text-2xl font-bold">425h</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <BarChart2 className="h-4 w-4 text-green-700" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+12% vs mois précédent</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Taux de complétion</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <LineChart className="h-4 w-4 text-blue-700" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+5% vs mois précédent</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Engagement moyen</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <PieChart className="h-4 w-4 text-purple-700" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-purple-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+8% vs mois précédent</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Certifications</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <ArrowDownRight className="h-4 w-4 text-amber-700" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-amber-600">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>-3 vs mois précédent</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="employees">Par employé</TabsTrigger>
          <TabsTrigger value="departments">Par département</TabsTrigger>
          <TabsTrigger value="courses">Par cours</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement mensuel</CardTitle>
                <CardDescription>Heures de formation suivies par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyEngagementChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Comparaison par département</CardTitle>
                <CardDescription>Taux de complétion moyen par département</CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentComparisonChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top cours par complétion</CardTitle>
                <CardDescription>Cours avec les meilleurs taux de complétion</CardDescription>
              </CardHeader>
              <CardContent>
                <CourseCompletionChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progression des employés</CardTitle>
                <CardDescription>Temps de formation par employé (top 10)</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeProgressChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques détaillées par employé</CardTitle>
              <CardDescription>Cette section sera disponible prochainement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Fonctionnalité en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques détaillées par département</CardTitle>
              <CardDescription>Cette section sera disponible prochainement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Fonctionnalité en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques détaillées par cours</CardTitle>
              <CardDescription>Cette section sera disponible prochainement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Fonctionnalité en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessStatistics;
