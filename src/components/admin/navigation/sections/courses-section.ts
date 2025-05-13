
import { BookOpen, Star, TrendingDown, Tag } from "lucide-react";
import { AdminNavGroup } from "../types";

export const coursesNavigation: AdminNavGroup = {
  label: "Cours",
  items: [
    {
      title: "Cours à modérer",
      path: "/admin/courses",
      icon: BookOpen,
      status: "warning",
    },
    {
      title: "Avis & notes",
      path: "/admin/reviews",
      icon: Star,
    },
    {
      title: "Qualité & anomalies",
      path: "/admin/course-quality",
      icon: TrendingDown,
    },
    {
      title: "Catégories & tags",
      path: "/admin/course-categories",
      icon: Tag,
      requiredRoles: ["super_admin", "admin"],
    },
  ],
};
