
import { UserRole } from "@/contexts/auth/types";
import { AdminNavGroup, hasAccessToNavItem } from "./types";

// Import des sections de navigation
import { overviewNavigation } from "./sections/overview-section";
import { usersNavigation } from "./sections/users-section";
import { coursesNavigation } from "./sections/courses-section";
import { businessNavigation } from "./sections/business-section";
import { financeNavigation } from "./sections/finance-section";
import { statisticsNavigation } from "./sections/statistics-section";
import { marketingNavigation } from "./sections/marketing-section";
import { communicationNavigation } from "./sections/communication-section";
import { notificationsNavigation } from "./sections/notifications-section";
import { settingsNavigation } from "./sections/settings-section";
import { systemNavigation } from "./sections/system-section";

// Assemblage de toutes les sections de navigation
export const adminNavigation: AdminNavGroup[] = [
  overviewNavigation,
  usersNavigation,
  coursesNavigation,
  businessNavigation,
  financeNavigation,
  statisticsNavigation,
  marketingNavigation,
  communicationNavigation,
  notificationsNavigation,
  settingsNavigation,
  systemNavigation
];

// Re-export des types et utilitaires
export { hasAccessToNavItem };
export type { AdminNavGroup, AdminNavItemStatus } from "./types";
