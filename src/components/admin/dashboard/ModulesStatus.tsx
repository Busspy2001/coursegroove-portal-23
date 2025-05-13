
import React from 'react';
import { AdminModule } from '@/types/admin-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, Users, BookOpen, Building, 
  CreditCard, BarChart3, Shield, MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ModulesStatusProps {
  modules: AdminModule[];
}

const ModulesStatus: React.FC<ModulesStatusProps> = ({ modules }) => {
  // Icônes par défaut pour les modules courants
  const getModuleIcon = (id: string) => {
    const icons: Record<string, React.ReactNode> = {
      'dashboard': <LayoutDashboard className="h-5 w-5" />,
      'users': <Users className="h-5 w-5" />,
      'courses': <BookOpen className="h-5 w-5" />,
      'business': <Building className="h-5 w-5" />,
      'finance': <CreditCard className="h-5 w-5" />,
      'statistics': <BarChart3 className="h-5 w-5" />,
      'security': <Shield className="h-5 w-5" />,
      'notifications': <MessageSquare className="h-5 w-5" />,
    };
    
    return icons[id] || <LayoutDashboard className="h-5 w-5" />;
  };
  
  // Classes pour les différents status
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">État des modules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((module) => (
            <div 
              key={module.id}
              className="border rounded-lg p-3 flex flex-col items-center hover:bg-accent/5 transition-colors"
            >
              <div className="flex justify-between items-center w-full mb-2">
                <div className="flex items-center gap-2">
                  {module.icon ? 
                    <module.icon className="h-5 w-5 text-muted-foreground" /> : 
                    getModuleIcon(module.id)
                  }
                  <span className="font-medium text-sm">{module.name}</span>
                </div>
                
                {module.alerts > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {module.alerts}
                  </Badge>
                )}
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className={cn("h-2 rounded-full", getStatusClasses(module.status))}
                  style={{ width: module.status === 'success' ? '100%' : 
                           module.status === 'warning' ? '70%' : 
                           module.status === 'danger' ? '40%' : '90%' }}
                ></div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 w-full text-center">
                {module.status === 'success' ? 'OK' : 
                 module.status === 'warning' ? 'Attention requise' : 
                 module.status === 'danger' ? 'Action critique' : 'Normal'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesStatus;
