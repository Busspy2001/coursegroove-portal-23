
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { type AdminAlert, type AlertStatus } from "@/types/admin-types";

interface AlertsPanelProps {
  alerts: AdminAlert[];
  onMarkAsRead?: (id: string) => void;
  onViewAll?: () => void;
}

const AlertsPanel = ({ alerts, onMarkAsRead, onViewAll }: AlertsPanelProps) => {
  const getStatusIcon = (status: AlertStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'danger':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Résolu</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Attention</Badge>;
      case 'danger':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critique</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Info</Badge>;
    }
  };

  const getCategoryBadge = (category: AdminAlert['category']) => {
    const categoryMap = {
      system: { label: 'Système', color: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
      user: { label: 'Utilisateur', color: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      course: { label: 'Cours', color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100' },
      business: { label: 'Entreprise', color: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100' },
      finance: { label: 'Finance', color: 'bg-teal-100 text-teal-800 hover:bg-teal-100' },
    };
    
    const { label, color } = categoryMap[category];
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" />
            Alertes critiques
            {alerts.length > 0 && (
              <Badge className="ml-2 bg-red-500">{alerts.length}</Badge>
            )}
          </div>
        </CardTitle>
        <Button onClick={onViewAll} variant="ghost" size="sm" className="text-xs">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-muted-foreground">Aucune alerte critique pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`rounded-lg border p-3 ${alert.read ? 'bg-background' : 'bg-amber-50 dark:bg-amber-950/10'}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alert.status)}
                      <span className="font-medium">{alert.title}</span>
                    </div>
                    <div className="flex gap-1">
                      {getStatusBadge(alert.status)}
                      {getCategoryBadge(alert.category)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.date}
                    </div>
                    {alert.actionRequired && !alert.read && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs px-2"
                        onClick={() => onMarkAsRead && onMarkAsRead(alert.id)}
                      >
                        Marquer comme lu
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
