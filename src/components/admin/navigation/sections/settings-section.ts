
import { Settings, History, Network, MonitorSmartphone } from "lucide-react";
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
};
