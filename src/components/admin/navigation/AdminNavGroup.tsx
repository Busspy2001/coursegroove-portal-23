
import React from 'react';
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu
} from '@/components/ui/sidebar';
import { 
  AdminNavGroup as AdminNavGroupType, 
  hasAccessToNavItem
} from './admin-nav-data';
import AdminNavItem from './AdminNavItem';
import { UserRole } from '@/contexts/auth/types';

interface AdminNavGroupProps {
  group: AdminNavGroupType;
  userRole?: UserRole;
  onNavigate?: (path: string) => void;
}

const AdminNavGroup: React.FC<AdminNavGroupProps> = ({ 
  group, 
  userRole, 
  onNavigate 
}) => {
  // Vérifier si l'utilisateur a accès à ce groupe
  if (!hasAccessToNavItem(userRole, group.requiredRoles)) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items
            .filter(item => hasAccessToNavItem(userRole, item.requiredRoles))
            .map(item => (
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
