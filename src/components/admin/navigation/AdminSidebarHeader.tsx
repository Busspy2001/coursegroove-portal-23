
import React from 'react';
import {
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from '@/contexts/auth/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AdminSidebarHeaderProps {
  name: string;
  avatar?: string;
  role: UserRole;
}

const AdminSidebarHeader: React.FC<AdminSidebarHeaderProps> = ({ 
  name, 
  avatar,
  role 
}) => {
  // Style du badge selon le rôle
  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'admin':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'business_admin':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Obtenir les initiales pour l'Avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Formater le rôle pour l'affichage
  const formatRole = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'business_admin':
        return 'Business Admin';
      case 'admin':
        return 'Admin';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <SidebarHeader className="p-6 border-b">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-schoolier-teal text-white">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <span className="font-medium truncate max-w-[140px]">{name}</span>
          
          <Badge 
            variant="secondary"
            className={cn(
              "font-normal text-xs mt-0.5 h-5",
              getRoleBadgeClass(role)
            )}
          >
            {formatRole(role)}
          </Badge>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Schoolier Admin</span>
          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
            En ligne
          </span>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default AdminSidebarHeader;
