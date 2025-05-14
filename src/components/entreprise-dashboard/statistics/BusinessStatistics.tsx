
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MonthlyEngagementChart,
  DepartmentComparisonChart,
  CourseCompletionChart,
  EmployeeProgressChart
} from "./StatisticsCharts";

const BusinessStatistics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques et rapports</h1>
        <p className="text-muted-foreground">Analysez les performances de formation de votre entreprise.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="departments">Par département</TabsTrigger>
          <TabsTrigger value="courses">Par formation</TabsTrigger>
          <TabsTrigger value="employees">Par employé</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement mensuel</CardTitle>
              <CardDescription>Heures de formation par mois</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <MonthlyEngagementChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison entre départements</CardTitle>
              <CardDescription>Taux de complétion par département</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <DepartmentComparisonChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complétion des formations</CardTitle>
              <CardDescription>Répartition par cours</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <CourseCompletionChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progression des employés</CardTitle>
              <CardDescription>Heures de formation par employé (top 8)</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <EmployeeProgressChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessStatistics;
