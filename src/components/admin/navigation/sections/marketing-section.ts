
import { Megaphone, Percent, Mail } from "lucide-react";
import { AdminNavGroup } from "../types";

export const marketingNavigation: AdminNavGroup = {
  label: "Marketing",
  items: [
    {
      title: "Campagnes emails",
      path: "/admin/marketing/emails",
      icon: Mail,
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
  ],
  requiredRoles: ["super_admin", "admin", "marketing_manager"],
};
