
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileWarning, Search, Download, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminSystemLogs = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Logs système</h2>
          <p className="text-muted-foreground">Consultez et analysez les journaux système</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="flex items-center">
            <CalendarRange className="h-4 w-4 mr-2" />
            Aujourd'hui
          </Button>
          <Button size="sm" className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Rechercher dans les logs..." />
        </div>
        
        <div className="w-full md:w-1/2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="error">Erreurs</TabsTrigger>
              <TabsTrigger value="warning">Avertissements</TabsTrigger>
              <TabsTrigger value="info">Infos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <FileWarning className="mr-2 h-5 w-5 text-schoolier-blue" />
            Journaux système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border-l-4 border-red-500 rounded-r-lg bg-red-50">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ERREUR</Badge>
                <span className="text-xs text-muted-foreground">13/05/2025 14:32:16</span>
              </div>
              <p className="mt-1 text-sm">Échec de connexion à la base de données - Timeout après 30s</p>
              <p className="text-xs text-muted-foreground mt-1">ID: ERR-DB-CONNECTION-20250513-1432</p>
            </div>
            
            <div className="p-3 border-l-4 border-amber-500 rounded-r-lg bg-amber-50">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">AVERTISSEMENT</Badge>
                <span className="text-xs text-muted-foreground">13/05/2025 14:28:05</span>
              </div>
              <p className="mt-1 text-sm">Pic de CPU à 85% pendant 120 secondes</p>
              <p className="text-xs text-muted-foreground mt-1">ID: WARN-SYSTEM-CPU-20250513-1428</p>
            </div>
            
            <div className="p-3 border-l-4 border-blue-500 rounded-r-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">INFO</Badge>
                <span className="text-xs text-muted-foreground">13/05/2025 14:15:22</span>
              </div>
              <p className="mt-1 text-sm">Démarrage de sauvegarde hebdomadaire</p>
              <p className="text-xs text-muted-foreground mt-1">ID: INFO-BACKUP-20250513-1415</p>
            </div>
            
            <div className="p-3 border-l-4 border-green-500 rounded-r-lg bg-green-50">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">SUCCÈS</Badge>
                <span className="text-xs text-muted-foreground">13/05/2025 14:00:00</span>
              </div>
              <p className="mt-1 text-sm">Migration de base de données terminée avec succès</p>
              <p className="text-xs text-muted-foreground mt-1">ID: INFO-DB-MIGRATION-20250513-1400</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" size="sm">
              Charger plus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
