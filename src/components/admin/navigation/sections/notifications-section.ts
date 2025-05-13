
import { Bell, FilePlus } from "lucide-react";
import { AdminNavGroup } from "../types";

export const notificationsNavigation: AdminNavGroup = {
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
};
