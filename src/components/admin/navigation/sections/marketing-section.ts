
import { Mail, Percent, Megaphone, Globe } from "lucide-react";
import { AdminNavGroup } from "../types";

export const marketingNavigation: AdminNavGroup = {
  label: "Marketing",
  items: [
    {
      title: "Campagnes emails",
      path: "/admin/marketing/emails",
      icon: Mail,
      badge: "Nouveau",
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
    {
      title: "SEO & visibilité",
      path: "/admin/marketing/seo",
      icon: Globe,
      badge: "Bientôt",
      disabled: true,
    },
  ],
  requiredRoles: ["super_admin"],
};
