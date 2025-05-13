
import { 
  LayoutDashboard, Users, Shield, BookOpen, Star, TrendingDown,
  Building, CreditCard, BarChart3, Tag, MessageSquare, Bell,
  Settings, FileWarning, Search, Activity, Headphones, PieChart,
  TrendingUp, Megaphone, Mail, Percent, Globe, User, ChevronRight,
  Calendar, FileBarChart
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
      {
        title: "Statistiques B2B",
        path: "/admin/business/statistics",
        icon: PieChart,
        requiredRoles: ["super_admin", "business_admin"],
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
      {
        title: "Revenus & Répartition",
        path: "/admin/finance/revenue",
        icon: TrendingUp,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Rapports",
        path: "/admin/finance/reports",
        icon: FileBarChart,
        requiredRoles: ["super_admin"],
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Statistiques",
    items: [
      {
        title: "Vue globale",
        path: "/admin/statistics",
        icon: BarChart3,
      },
      {
        title: "Instructeurs",
        path: "/admin/statistics/instructors",
        icon: User,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Étudiants",
        path: "/admin/statistics/students",
        icon: Users,
        requiredRoles: ["super_admin"],
      },
      {
        title: "B2C vs B2B",
        path: "/admin/statistics/comparison",
        icon: PieChart,
        requiredRoles: ["super_admin"],
      },
    ],
  },
  {
    label: "Marketing",
    items: [
      {
        title: "Campagnes emails",
        path: "/admin/marketing/emails",
        icon: Mail,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Promotions",
        path: "/admin/marketing/promotions",
        icon: Percent,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Annonces ciblées",
        path: "/admin/marketing/announcements",
        icon: Megaphone,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Communication",
    items: [
      {
        title: "Messages internes",
        path: "/admin/messages",
        icon: MessageSquare,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Support client",
        path: "/admin/support",
        icon: Headphones,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin", "admin"],
  },
  {
    label: "Notifications",
    items: [
      {
        title: "Gestion & historique",
        path: "/admin/notifications",
        icon: Bell,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Préférences",
        path: "/admin/notifications/preferences",
        icon: Bell,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin"],
  },
  {
    label: "Système",
    items: [
      {
        title: "Paramètres",
        path: "/admin/settings",
        icon: Settings,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Système & Sécurité",
        path: "/admin/system",
        icon: Shield,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Logs",
        path: "/admin/system/logs",
        icon: FileWarning,
        badge: "Bientôt",
        disabled: true,
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
