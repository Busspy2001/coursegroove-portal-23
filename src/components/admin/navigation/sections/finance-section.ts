
import { CreditCard, CircleDollarSign, DollarSign, FileBarChart } from "lucide-react";
import { AdminNavGroup } from "../types";

export const financeNavigation: AdminNavGroup = {
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
      title: "Rapports",
      path: "/admin/finance/reports",
      icon: FileBarChart,
      requiredRoles: ["super_admin"],
    },
  ],
  requiredRoles: ["super_admin", "admin"],
};
