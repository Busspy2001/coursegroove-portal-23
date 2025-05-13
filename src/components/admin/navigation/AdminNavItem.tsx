
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { AdminNavItem as AdminNavItemType } from './types';
import { toast } from '@/hooks/use-toast';

interface AdminNavItemProps {
  item: AdminNavItemType;
  onNavigate?: (path: string) => void;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ item, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = location.pathname === item.path;
  
  const handleClick = () => {
    // Suppression du test disabled puisque toutes les pages sont maintenant disponibles
    if (onNavigate) {
      onNavigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  // Obtenir le badge d'état (cercle coloré)
  const getStatusBadge = (status?: "success" | "warning" | "danger" | "neutral") => {
    if (!status) return null;
    
    const statusMap = {
      success: <Badge variant="outline" className="h-2 w-2 rounded-full bg-green-500 p-0" />,
      warning: <Badge variant="outline" className="h-2 w-2 rounded-full bg-yellow-500 p-0" />,
      danger: <Badge variant="outline" className="h-2 w-2 rounded-full bg-red-500 p-0" />,
      neutral: <Badge variant="outline" className="h-2 w-2 rounded-full bg-gray-300 p-0" />
    };
    
    return statusMap[status];
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        tooltip={item.title}
        isActive={isActive}
        onClick={handleClick}
        className="w-full justify-between text-sm"
      >
        <div className="flex items-center">
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </div>
        <div className="flex items-center ml-2">
          {item.status && getStatusBadge(item.status)}
          {item.badge && (
            <Badge variant="outline" className="ml-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AdminNavItem;
