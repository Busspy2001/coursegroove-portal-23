
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, X, Eye, BellRing, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Types pour les alertes
interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: 'urgent' | 'medium' | 'low';
  status: 'active' | 'resolved';
  detectedAt: string;
  resolvedAt?: string;
  details?: Record<string, any>;
}

export const AdminSystemAlerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  // Données simulées pour les alertes système
  const activeAlerts: SystemAlert[] = [
    {
      id: "1",
      title: "Problème de performance base de données",
      description: "Temps de réponse élevé sur les requêtes principales.",
      severity: "urgent",
      status: "active",
      detectedAt: "13/05/2025 à 14:32",
      details: {
        metrics: {
          responseTime: "850ms",
          normalResponseTime: "120ms",
          affectedTables: ["users", "courses", "enrollments"],
          affectedUsers: 120,
        },
        recommendations: [
          "Vérifier les index de la base de données",
          "Optimiser les requêtes fréquentes",
          "Augmenter temporairement les ressources du serveur"
        ]
      }
    },
    {
      id: "2",
      title: "Utilisation CPU élevée",
      description: "Le serveur web principal montre une utilisation CPU anormalement élevée.",
      severity: "medium",
      status: "active",
      detectedAt: "13/05/2025 à 14:28",
      details: {
        metrics: {
          cpuUsage: "87%",
          normalCpuUsage: "45%",
          serverName: "web-prod-03",
          duration: "32 minutes"
        },
        recommendations: [
          "Vérifier les processus actifs",
          "Surveiller les logs d'erreur",
          "Redémarrer le serveur si nécessaire"
        ]
      }
    },
    {
      id: "3",
      title: "Quota de stockage à 80%",
      description: "L'espace de stockage approche la limite sur le serveur de médias.",
      severity: "low",
      status: "active",
      detectedAt: "13/05/2025 à 13:45",
      details: {
        metrics: {
          storageUsed: "820GB",
          storageTotal: "1TB",
          growthRate: "~15GB/jour",
          estimatedTimeToFull: "12 jours"
        },
        recommendations: [
          "Nettoyer les fichiers temporaires",
          "Archiver les médias anciens",
          "Planifier une augmentation de capacité"
        ]
      }
    }
  ];

  const resolvedAlerts: SystemAlert[] = [
    {
      id: "4",
      title: "Erreur SSL temporaire",
      description: "Problème temporaire avec le certificat SSL.",
      severity: "medium",
      status: "resolved",
      detectedAt: "12/05/2025 à 10:15",
      resolvedAt: "12/05/2025 à 16:42",
    },
    {
      id: "5",
      title: "Tentatives d'authentification anormales",
      description: "Nombre élevé de tentatives d'authentification échouées.",
      severity: "urgent",
      status: "resolved",
      detectedAt: "10/05/2025 à 22:30",
      resolvedAt: "11/05/2025 à 09:18",
    }
  ];

  const handleResolveAlert = (alertId: string) => {
    // Dans un environnement réel, vous mettriez à jour l'état de l'alerte dans la base de données
    console.log(`Résolution de l'alerte ${alertId}`);
    toast({
      title: "Alerte résolue",
      description: "L'alerte a été marquée comme résolue.",
      variant: "success",
    });
    
    if (selectedAlert && selectedAlert.id === alertId) {
      setShowDetails(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">URGENT</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">MOYEN</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">FAIBLE</Badge>;
      default:
        return <Badge variant="outline">INFO</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return "border-red-500 bg-red-50";
      case 'medium':
        return "border-amber-500 bg-amber-50";
      case 'low':
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Alertes système</h2>
          <p className="text-muted-foreground">Gérez et répondez aux alertes système</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <Button size="sm" className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <BellRing className="h-4 w-4 mr-2" />
            Configurer alertes
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <AlertTriangle className="mr-2 h-5 w-5 text-schoolier-blue" />
            Alertes système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">
                Actives
                <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                  {activeAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">Résolues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              {activeAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`flex items-center justify-between p-4 border-l-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(alert.severity)}
                      <h3 className="font-medium">{alert.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Détecté le {alert.detectedAt} • Il y a 28 minutes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Résoudre
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="resolved">
              <div className="space-y-4">
                {resolvedAlerts.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">RÉSOLU</Badge>
                        <h3 className="font-medium">{alert.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Résolu le {alert.resolvedAt}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog pour afficher les détails d'une alerte */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && getSeverityBadge(selectedAlert.severity)}
              {selectedAlert?.title}
            </DialogTitle>
            <DialogDescription>
              Détecté le {selectedAlert?.detectedAt}
              {selectedAlert?.resolvedAt && ` • Résolu le ${selectedAlert.resolvedAt}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert variant="default" className={selectedAlert?.severity === 'urgent' ? 'border-red-500 bg-red-50' : selectedAlert?.severity === 'medium' ? 'border-amber-500 bg-amber-50' : 'border-blue-500 bg-blue-50'}>
              <AlertTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Description
              </AlertTitle>
              <AlertDescription>
                {selectedAlert?.description}
              </AlertDescription>
            </Alert>
            
            {selectedAlert?.details && (
              <>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Métriques</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedAlert.details.metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-md">
                        <span className="text-xs text-muted-foreground block">{key}</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedAlert.details.recommendations && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Recommandations</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedAlert.details.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            {selectedAlert?.status === 'active' && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Diagnostic système en cours...</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Mise à jour il y a 3 minutes
                  </span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            )}
          </div>
          
          <DialogFooter>
            {selectedAlert?.status === 'active' ? (
              <>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Fermer
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleResolveAlert(selectedAlert.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Marquer comme résolu
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Fermer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
