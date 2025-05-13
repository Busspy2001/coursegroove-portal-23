
import { Settings, History, Network, MonitorSmartphone, Shield } from "lucide-react";
import { AdminNavGroup } from "../types";

export const settingsNavigation: AdminNavGroup = {
  label: "Paramètres",
  items: [
    {
      title: "Configuration plateforme",
      path: "/admin/settings",
      icon: Settings,
      requiredRoles: ["super_admin"],
    },
    {
      title: "Gestion des rôles",
      path: "/admin/settings/roles",
      icon: Shield,
      requiredRoles: ["super_admin"],
    },
    {
      title: "Journal d'activité",
      path: "/admin/settings/activity-log",
      icon: History,
    },
    {
      title: "API & webhooks",
      path: "/admin/settings/api",
      icon: Network,
    },
    {
      title: "Adaptabilité mobile",
      path: "/admin/settings/mobile",
      icon: MonitorSmartphone,
    },
  ],
  requiredRoles: ["super_admin"],
};
