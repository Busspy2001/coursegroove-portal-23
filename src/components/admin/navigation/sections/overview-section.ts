
import { LayoutDashboard, Gauge } from "lucide-react";
import { AdminNavGroup } from "../types";

export const overviewNavigation: AdminNavGroup = {
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
};
