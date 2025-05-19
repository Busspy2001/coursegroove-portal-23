
import React from 'react';
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu
} from '@/components/ui/sidebar';
import { 
  AdminNavGroup as AdminNavGroupType
} from './types';
import AdminNavItem from './AdminNavItem';
import { UserRole } from '@/contexts/auth/types';
import { useAuth } from '@/contexts/auth';

interface AdminNavGroupProps {
  group: AdminNavGroupType;
  onNavigate?: (path: string) => void;
}

const AdminNavGroup: React.FC<AdminNavGroupProps> = ({ 
  group, 
  onNavigate 
}) => {
  const { hasRole } = useAuth();
  
  // Filter accessible items according to user roles
  const accessibleItems = group.items
    .filter(item => !item.requiredRoles || 
           item.requiredRoles.some(role => hasRole(role as UserRole)));
    
  // Don't show the group if no items are accessible
  if (accessibleItems.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {accessibleItems.map(item => (
            <AdminNavItem
              key={item.path}
              item={item}
              onNavigate={onNavigate}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AdminNavGroup;
