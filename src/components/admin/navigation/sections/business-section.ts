
import { Building, BriefcaseBusiness, UserPlus, PieChart, List } from "lucide-react";
import { AdminNavGroup } from "../types";

export const businessNavigation: AdminNavGroup = {
  label: "Entreprises",
  items: [
    {
      title: "Liste des entreprises",
      path: "/admin/business",
      icon: List,
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
};
