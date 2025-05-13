
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, Users, BookOpen, Building2, 
  CreditCard, BarChart3, Shield, Bell 
} from "lucide-react";
import { type AdminModule, type AlertStatus } from "@/types/admin-types";

interface ModulesStatusProps {
  modules: AdminModule[];
}

const ModulesStatus = ({ modules }: ModulesStatusProps) => {
  const getModuleIcon = (id: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'users': <Users className="h-4 w-4" />,
      'courses': <BookOpen className="h-4 w-4" />,
      'business': <Building2 className="h-4 w-4" />,
      'finance': <CreditCard className="h-4 w-4" />,
      'statistics': <BarChart3 className="h-4 w-4" />,
      'security': <Shield className="h-4 w-4" />,
      'notifications': <Bell className="h-4 w-4" />,
      'dashboard': <LayoutDashboard className="h-4 w-4" />,
    };
    
    return iconMap[id] || <LayoutDashboard className="h-4 w-4" />;
  };
  
  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">État des modules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className="rounded-lg border p-3 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors dark:hover:bg-gray-800"
            >
              <div className="relative">
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  {getModuleIcon(module.id)}
                </div>
                {module.alerts > 0 && (
                  <Badge
                    className={`absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-4 rounded-full text-[10px] text-white ${getStatusColor(module.status)}`}
                  >
                    {module.alerts}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium mt-2">{module.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesStatus;
