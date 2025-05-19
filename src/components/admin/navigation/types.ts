
import { UserRole } from '@/contexts/auth/types';
import { LucideIcon } from "lucide-react";

export type AdminNavItemStatus = 'success' | 'warning' | 'danger' | 'neutral' | undefined;

export interface AdminNavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  tooltip?: string;
  status?: AdminNavItemStatus;
  requiredRoles?: UserRole[];
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
  requiredRoles?: UserRole[]; // Added this property to fix the error
}

// Updated to use the hasRole function from context
export function hasAccessToNavItem(hasRoleFunction: (role: UserRole) => boolean, requiredRoles?: UserRole[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  
  return requiredRoles.some(role => hasRoleFunction(role));
}
