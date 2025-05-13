
import { MessageSquare, Headphones, FileText } from "lucide-react";
import { AdminNavGroup } from "../types";

export const communicationNavigation: AdminNavGroup = {
  label: "Communication",
  items: [
    {
      title: "Messages internes",
      path: "/admin/messages",
      icon: MessageSquare,
    },
    {
      title: "Support client",
      path: "/admin/support",
      icon: Headphones,
    },
    {
      title: "FAQ & Aide",
      path: "/admin/faq",
      icon: FileText,
    },
  ],
  requiredRoles: ["super_admin", "admin"],
};
