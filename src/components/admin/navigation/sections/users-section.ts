
import { Users, Activity, Headphones, UserCheck, Flag } from "lucide-react";
import { AdminNavGroup } from "../types";

export const usersNavigation: AdminNavGroup = {
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
      title: "Signalements",
      path: "/admin/user-reports",
      icon: Flag,
      status: "danger",
    },
    {
      title: "Gestion des rôles",
      path: "/admin/user-roles",
      icon: UserCheck,
      requiredRoles: ["super_admin"],
    },
  ],
};
