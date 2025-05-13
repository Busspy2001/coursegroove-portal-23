
import { 
  LayoutDashboard, Users, Shield, BookOpen, Star, TrendingDown,
  Building, CreditCard, BarChart3, Tag, MessageSquare, Bell,
  Settings, FileWarning, Search, Activity, Headphones
} from "lucide-react";
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

export const adminNavigation: AdminNavGroup[] = [
  {
    label: "Vue d'ensemble",
    items: [
      {
        title: "Tableau de bord",
        path: "/admin",
        icon: LayoutDashboard,
        status: "success",
      },
    ],
  },
  {
    label: "Utilisateurs",
    items: [
      {
        title: "Comptes",
        path: "/admin/users",
        icon: Users,
        status: "warning",
      },
      {
        title: "Activité utilisateur",
        path: "/admin/user-activity",
        icon: Activity,
      },
      {
        title: "Support & signalements",
        path: "/admin/user-support",
        icon: Headphones,
        status: "danger",
      },
    ],
  },
  {
    label: "Cours",
    items: [
      {
        title: "Cours à modérer",
        path: "/admin/courses",
        icon: BookOpen,
        status: "warning",
      },
      {
        title: "Avis & notes",
        path: "/admin/reviews",
        icon: Star,
      },
      {
        title: "Qualité & anomalies",
        path: "/admin/course-quality",
        icon: TrendingDown,
      },
    ],
  },
  {
    label: "Business",
    items: [
      {
        title: "Entreprises clientes",
        path: "/admin/business",
        icon: Building,
      },
      {
        title: "Plans & abonnements",
        path: "/admin/business/plans",
        icon: CreditCard,
        requiredRoles: ["super_admin"],
      },
    ],
    requiredRoles: ["super_admin", "business_admin"],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Transactions",
        path: "/admin/finance",
        icon: CreditCard,
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Statistiques",
    items: [
      {
        title: "Statistiques",
        path: "/admin/statistics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Marketing",
    items: [
      {
        title: "Marketing",
        path: "/admin/marketing",
        icon: Tag,
        badge: "Beta",
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Communication",
    items: [
      {
        title: "Messages",
        path: "/admin/messages",
        icon: MessageSquare,
        badge: "Bientôt",
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Système",
    items: [
      {
        title: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
        badge: "Bientôt",
      },
      {
        title: "Paramètres",
        path: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Système & Sécurité",
        path: "/admin/system",
        icon: Shield,
        badge: "Bientôt",
      },
    ],
    requiredRoles: ["super_admin"],
  },
];

// Fonction utilitaire pour vérifier si un utilisateur a accès à un élément de navigation
export const hasAccessToNavItem = (
  userRole: UserRole | undefined,
  requiredRoles?: UserRole[]
): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (!userRole) return false;
  
  return requiredRoles.includes(userRole);
};
