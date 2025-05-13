
import { 
  LayoutDashboard, Users, Shield, BookOpen, Star, TrendingDown,
  Building, CreditCard, BarChart3, Tag, MessageSquare, Bell,
  Settings, FileWarning, Search, Activity, Headphones, PieChart,
  TrendingUp, Megaphone, Mail, Percent, Globe, User, ChevronRight,
  Calendar, FileBarChart, ListChecks, Eye, AlertTriangle,
  BarChart, FileText, FilePlus, Download, Briefcase, UserCheck,
  BriefcaseBusiness, Gauge, UsersRound, UserRound, LineChart, 
  UserPlus, LucideIcon, CircleDollarSign, DollarSign, ClipboardList,
  Heart, CheckCircle2, Ban, AlertOctagon, Lock, Cog, History,
  Timer, Network, Zap, MonitorSmartphone
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
  // Vue d'ensemble
  {
    label: "Vue d'ensemble",
    items: [
      {
        title: "Tableau de bord",
        path: "/admin",
        icon: LayoutDashboard,
        status: "success",
      },
      {
        title: "Statistiques rapides",
        path: "/admin/quick-stats",
        icon: Gauge,
      },
    ],
  },

  // Utilisateurs
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
      {
        title: "Gestion des rôles",
        path: "/admin/user-roles",
        icon: UserCheck,
        requiredRoles: ["super_admin"],
      },
    ],
  },

  // Cours
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
      {
        title: "Catégories & tags",
        path: "/admin/course-categories",
        icon: Tag,
        requiredRoles: ["super_admin", "admin"],
      },
    ],
  },

  // Entreprises
  {
    label: "Entreprises",
    items: [
      {
        title: "Liste des entreprises",
        path: "/admin/business",
        icon: Building,
      },
      {
        title: "Plans & abonnements",
        path: "/admin/business/plans",
        icon: BriefcaseBusiness,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Utilisation des licences",
        path: "/admin/business/licenses",
        icon: UserPlus,
        requiredRoles: ["super_admin", "business_admin"],
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

  // Finance
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
        icon: CircleDollarSign,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Paiements instructeurs",
        path: "/admin/finance/instructor-payments",
        icon: DollarSign,
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

  // Statistiques
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
      {
        title: "Tendances & prévisions",
        path: "/admin/statistics/trends",
        icon: LineChart,
        requiredRoles: ["super_admin"],
      },
    ],
  },

  // Marketing
  {
    label: "Marketing",
    items: [
      {
        title: "Campagnes emails",
        path: "/admin/marketing/emails",
        icon: Mail,
        badge: "Nouveau",
      },
      {
        title: "Promotions",
        path: "/admin/marketing/promotions",
        icon: Percent,
      },
      {
        title: "Annonces ciblées",
        path: "/admin/marketing/announcements",
        icon: Megaphone,
      },
      {
        title: "SEO & visibilité",
        path: "/admin/marketing/seo",
        icon: Globe,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin"],
  },

  // Communication
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
      },
      {
        title: "FAQ & Aide",
        path: "/admin/faq",
        icon: FileText,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin", "admin"],
  },

  // Notifications
  {
    label: "Notifications",
    items: [
      {
        title: "Gestion & historique",
        path: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Préférences",
        path: "/admin/notifications/preferences",
        icon: Bell,
      },
      {
        title: "Modèles d'emails",
        path: "/admin/notifications/templates",
        icon: FilePlus,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin"],
  },

  // Paramètres
  {
    label: "Paramètres",
    items: [
      {
        title: "Configuration plateforme",
        path: "/admin/settings",
        icon: Settings,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Journal d'activité",
        path: "/admin/settings/activity-log",
        icon: History,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "API & webhooks",
        path: "/admin/settings/api",
        icon: Network,
        badge: "Bientôt",
        disabled: true,
      },
      {
        title: "Adaptabilité mobile",
        path: "/admin/settings/mobile",
        icon: MonitorSmartphone,
        badge: "Bientôt",
        disabled: true,
      },
    ],
    requiredRoles: ["super_admin"],
  },

  // Système & Sécurité
  {
    label: "Système",
    items: [
      {
        title: "Système & Sécurité",
        path: "/admin/system",
        icon: Shield,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Logs",
        path: "/admin/system/logs",
        icon: FileWarning,
        requiredRoles: ["super_admin"],
      },
      {
        title: "Performance",
        path: "/admin/system/performance",
        icon: Zap,
        badge: "Bientôt",
        disabled: true,
        requiredRoles: ["super_admin"],
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
