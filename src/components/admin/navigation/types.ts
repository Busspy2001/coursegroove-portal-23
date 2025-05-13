
import { LucideIcon } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";

export type AdminNavItemStatus = "success" | "warning" | "danger" | "neutral";

export interface AdminNavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  disabled?: boolean;
  status?: AdminNavItemStatus;
  badge?: string;
  requiredRoles?: UserRole[];
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
  requiredRoles?: UserRole[];
}

// Fonction utilitaire pour vérifier si un utilisateur a accès à un élément de navigation
export const hasAccessToNavItem = (
  userRole: UserRole | undefined,
  requiredRoles?: UserRole[]
): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (!userRole) return false;
  
  return requiredRoles.includes(userRole);
};
