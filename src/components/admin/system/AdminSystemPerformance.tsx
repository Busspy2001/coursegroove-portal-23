
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Activity, Server, Database, Clock, Download } from "lucide-react";

const AdminSystemPerformance = () => {
  // Échantillons de données pour les graphiques de performances
  const perfData = [
    { name: "00:00", cpu: 30, memory: 45, responses: 120 },
    { name: "04:00", cpu: 25, memory: 40, responses: 90 },
    { name: "08:00", cpu: 55, memory: 60, responses: 380 },
    { name: "12:00", cpu: 75, memory: 80, responses: 580 },
    { name: "16:00", cpu: 85, memory: 85, responses: 620 },
    { name: "20:00", cpu: 60, memory: 70, responses: 420 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Performance système</h2>
          <p className="text-muted-foreground">Surveillance et optimisation des performances</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6h">6 heures</SelectItem>
              <SelectItem value="24h">24 heures</SelectItem>
              <SelectItem value="7d">7 jours</SelectItem>
              <SelectItem value="30d">30 jours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">Moyenne sur 24h</p>
            <div className="mt-4 h-[80px]">
              {/* Placeholder pour le graphique de CPU */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-500" />
              Mémoire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground">3.2 GB / 5 GB</p>
            <div className="mt-4 h-[80px]">
              {/* Placeholder pour le graphique de mémoire */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-green-500" />
              Base de données
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">420ms</div>
            <p className="text-xs text-muted-foreground">Temps de réponse moyen</p>
            <div className="mt-4 h-[80px]">
              {/* Placeholder pour le graphique de DB */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance sur 24h</CardTitle>
          <CardDescription>
            Mesure des performances système sur les dernières 24 heures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="cpu">CPU</TabsTrigger>
              <TabsTrigger value="memory">Mémoire</TabsTrigger>
              <TabsTrigger value="response">Temps de réponse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="h-[300px] relative">
              {/* Placeholder pour le graphique principal */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-center justify-center">
                <Activity className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground">Vue d'ensemble des performances</p>
              </div>
            </TabsContent>
            
            <TabsContent value="cpu" className="h-[300px] relative">
              {/* Placeholder pour le graphique CPU */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-center justify-center">
                <Zap className="h-12 w-12 text-amber-500 mb-2" />
                <p className="text-sm text-muted-foreground">Utilisation CPU</p>
              </div>
            </TabsContent>
            
            <TabsContent value="memory" className="h-[300px] relative">
              {/* Placeholder pour le graphique mémoire */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-center justify-center">
                <Server className="h-12 w-12 text-blue-500 mb-2" />
                <p className="text-sm text-muted-foreground">Utilisation mémoire</p>
              </div>
            </TabsContent>
            
            <TabsContent value="response" className="h-[300px] relative">
              {/* Placeholder pour le graphique temps de réponse */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-center justify-center">
                <Clock className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">Temps de réponse</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Requêtes par minute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {/* Placeholder pour le graphique de requêtes */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribution des ressources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {/* Placeholder pour le graphique de distribution */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemPerformance;
