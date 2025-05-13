
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Search, Calendar, Eye, History } from "lucide-react";

const AdminActivityLog = () => {
  // Données de démonstration pour le journal d'activité
  const activityLogs = [
    {
      id: 1,
      user: "admin@schoolier.com",
      action: "UTILISATEUR_CRÉÉ",
      details: "Création d'un nouveau compte utilisateur: jean.dupont@example.com",
      ip: "192.168.1.101",
      timestamp: "2025-05-13 14:23:45",
      status: "success"
    },
    {
      id: 2,
      user: "admin@schoolier.com",
      action: "RÔLE_MODIFIÉ",
      details: "Modification du rôle utilisateur: marie.laurent@example.com (user → instructor)",
      ip: "192.168.1.101",
      timestamp: "2025-05-13 14:20:12",
      status: "success"
    },
    {
      id: 3,
      user: "system",
      action: "AUTHENTIFICATION_ÉCHEC",
      details: "Tentative de connexion échouée: adresse IP suspecte",
      ip: "45.86.123.45",
      timestamp: "2025-05-13 13:58:30",
      status: "warning"
    },
    {
      id: 4,
      user: "thomas.petit@schoolier.com",
      action: "COURS_APPROUVÉ",
      details: "Cours 'Introduction à React' approuvé pour publication",
      ip: "192.168.1.105",
      timestamp: "2025-05-13 13:45:22",
      status: "success"
    },
    {
      id: 5,
      user: "system",
      action: "SAUVEGARDE_CRÉÉE",
      details: "Sauvegarde automatique de la base de données",
      ip: "127.0.0.1",
      timestamp: "2025-05-13 13:00:00",
      status: "info"
    },
    {
      id: 6,
      user: "admin@schoolier.com",
      action: "CONFIGURATION_MODIFIÉE",
      details: "Modification des paramètres de notification système",
      ip: "192.168.1.101",
      timestamp: "2025-05-13 12:30:15",
      status: "success"
    },
    {
      id: 7,
      user: "system",
      action: "ERREUR_SYSTÈME",
      details: "Erreur de traitement des paiements: timeout du service externe",
      ip: "127.0.0.1",
      timestamp: "2025-05-13 11:45:18",
      status: "error"
    }
  ];

  const renderStatusBadge = (status: string) => {
    const badgeType = {
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${badgeType[status as keyof typeof badgeType]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center">
            <History className="mr-2 h-6 w-6" />
            Journal d'activité
          </h2>
          <p className="text-muted-foreground">Suivi des actions système et utilisateurs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des actions, utilisateurs..."
            className="pl-8 w-full"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtres avancés
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Détails</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {log.details}
                  </TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{renderStatusBadge(log.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir les détails</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques d'activité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Activités aujourd'hui
                </div>
                <div className="text-2xl font-bold">247</div>
                <div className="text-xs text-green-500 mt-1">+12% vs. hier</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Activités admins
                </div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-green-500 mt-1">+5% vs. moyenne</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Alertes système
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-red-500 mt-1">+3 vs. hier</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Erreurs système
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-yellow-500 mt-1">-1 vs. hier</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivityLog;
