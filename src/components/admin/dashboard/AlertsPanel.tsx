
import React from 'react';
import { AdminAlert } from '@/types/admin-types';
import { AlertTriangle, CheckCircle, Info, XCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AlertsPanelProps {
  alerts: AdminAlert[];
  onMarkAsRead: (id: string) => void;
  onViewAll: () => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onMarkAsRead, onViewAll }) => {
  
  // Fonction pour afficher l'icône adaptée au statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'danger':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Fonction pour obtenir la classe adaptée à la catégorie
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'user':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'course':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'business':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'system':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'finance':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'security':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          Alertes critiques
          <Button variant="ghost" size="sm" className="text-xs" onClick={onViewAll}>
            Tout voir
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
        <CardDescription>
          {alerts.filter(a => !a.read).length} alertes non lues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={cn(
              "flex gap-3 p-3 rounded-md border",
              alert.read ? "bg-muted/40" : "bg-card hover:bg-accent/5"
            )}
          >
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(alert.status)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={cn(
                    "font-medium",
                    alert.read && "text-muted-foreground"
                  )}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                </div>
                <div className="flex gap-2 ml-2 flex-shrink-0">
                  <span className={cn("text-xs px-2 py-1 rounded whitespace-nowrap", getCategoryClass(alert.category))}>
                    {alert.category}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">
                  {alert.date}
                </span>
                
                {!alert.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7 px-2"
                    onClick={() => onMarkAsRead(alert.id)}
                  >
                    Marquer comme lu
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
