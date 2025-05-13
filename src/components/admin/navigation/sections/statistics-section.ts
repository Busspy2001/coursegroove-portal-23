
import { BarChart3, User, Users, PieChart, LineChart, Eye } from "lucide-react";
import { AdminNavGroup } from "../types";

export const statisticsNavigation: AdminNavGroup = {
  label: "Statistiques",
  items: [
    {
      title: "Vue globale",
      path: "/admin/statistics",
      icon: Eye,
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
};
