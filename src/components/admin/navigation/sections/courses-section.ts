
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
    }
  ],
};
