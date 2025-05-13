
import { Shield, FileWarning, Zap } from "lucide-react";
import { AdminNavGroup } from "../types";

export const systemNavigation: AdminNavGroup = {
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
};
