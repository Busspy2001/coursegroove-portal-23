
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminQuickStats = lazy(() => import("@/pages/admin/quick-stats"));

// Admin User Management Pages
const AdminUsers = lazy(() => import("@/pages/admin/users"));
const AdminUserActivity = lazy(() => import("@/pages/admin/user-activity"));
const AdminUserReports = lazy(() => import("@/pages/admin/user-reports"));
const AdminUserSupport = lazy(() => import("@/pages/admin/user-support"));
const AdminUserRoles = lazy(() => import("@/pages/admin/user-roles"));

// Admin Courses Pages
const AdminCourses = lazy(() => import("@/pages/admin/courses"));
const AdminReviews = lazy(() => import("@/pages/admin/reviews"));
const AdminCourseQuality = lazy(() => import("@/pages/admin/course-quality"));
const AdminCourseCategories = lazy(() => import("@/pages/admin/course-categories"));

// Admin Business Pages
const AdminBusiness = lazy(() => import("@/pages/admin/business"));
const AdminBusinessPlans = lazy(() => import("@/pages/admin/business/plans"));
const AdminBusinessLicenses = lazy(() => import("@/pages/admin/business/licenses"));
const AdminBusinessStatistics = lazy(() => import("@/pages/admin/business/statistics"));

// Admin Finance Pages
const AdminFinance = lazy(() => import("@/pages/admin/finance"));
const AdminFinanceRevenue = lazy(() => import("@/pages/admin/finance/revenue"));
const AdminFinanceReports = lazy(() => import("@/pages/admin/finance/reports"));

// Admin Statistics Pages
const AdminStatistics = lazy(() => import("@/pages/admin/statistics"));
const AdminStatisticsInstructors = lazy(() => import("@/pages/admin/statistics/instructors"));
const AdminStatisticsStudents = lazy(() => import("@/pages/admin/statistics/students"));
const AdminStatisticsComparison = lazy(() => import("@/pages/admin/statistics/comparison"));
const AdminStatisticsTrends = lazy(() => import("@/pages/admin/statistics/trends"));

// Admin Marketing Pages
const AdminMarketingEmails = lazy(() => import("@/pages/admin/marketing/emails"));
const AdminMarketingPromotions = lazy(() => import("@/pages/admin/marketing/promotions"));
const AdminMarketingAnnouncements = lazy(() => import("@/pages/admin/marketing/announcements"));
const AdminMarketingSeo = lazy(() => import("@/pages/admin/marketing/seo"));

// Admin Communication Pages
const AdminMessages = lazy(() => import("@/pages/admin/messages"));
const AdminSupport = lazy(() => import("@/pages/admin/support"));
const AdminFaq = lazy(() => import("@/pages/admin/faq"));

// Admin Notifications Pages
const AdminNotifications = lazy(() => import("@/pages/admin/notifications"));
const AdminNotificationsPreferences = lazy(() => import("@/pages/admin/notifications/preferences"));
const AdminNotificationsTemplates = lazy(() => import("@/pages/admin/notifications/templates"));

// Admin Settings Pages
const AdminSettings = lazy(() => import("@/pages/admin/settings"));
const AdminSettingsRoles = lazy(() => import("@/pages/admin/settings/roles"));
const AdminSettingsActivityLog = lazy(() => import("@/pages/admin/settings/activity-log"));
const AdminSettingsApi = lazy(() => import("@/pages/admin/settings/api"));
const AdminSettingsMobile = lazy(() => import("@/pages/admin/settings/mobile"));

// Admin System Pages
const AdminSystem = lazy(() => import("@/pages/admin/system"));
const AdminSystemLogs = lazy(() => import("@/pages/admin/system/logs"));
const AdminSystemAlerts = lazy(() => import("@/pages/admin/system/alerts"));
const AdminSystemPerformance = lazy(() => import("@/pages/admin/system/performance"));

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminDashboard />
  },
  {
    path: "/admin/quick-stats",
    element: <AdminQuickStats />
  },

  // Admin Users Routes
  {
    path: "/admin/users",
    element: <AdminUsers />
  },
  {
    path: "/admin/user-activity",
    element: <AdminUserActivity />
  },
  {
    path: "/admin/user-reports",
    element: <AdminUserReports />
  },
  {
    path: "/admin/user-support",
    element: <AdminUserSupport />
  },
  {
    path: "/admin/user-roles",
    element: <AdminUserRoles />
  },

  // Admin Courses Routes
  {
    path: "/admin/courses",
    element: <AdminCourses />
  },
  {
    path: "/admin/reviews",
    element: <AdminReviews />
  },
  {
    path: "/admin/course-quality",
    element: <AdminCourseQuality />
  },
  {
    path: "/admin/course-categories",
    element: <AdminCourseCategories />
  },

  // Admin Business Routes
  {
    path: "/admin/business",
    element: <AdminBusiness />
  },
  {
    path: "/admin/business/plans",
    element: <AdminBusinessPlans />
  },
  {
    path: "/admin/business/licenses",
    element: <AdminBusinessLicenses />
  },
  {
    path: "/admin/business/statistics",
    element: <AdminBusinessStatistics />
  },

  // Admin Finance Routes
  {
    path: "/admin/finance",
    element: <AdminFinance />
  },
  {
    path: "/admin/finance/revenue",
    element: <AdminFinanceRevenue />
  },
  {
    path: "/admin/finance/reports",
    element: <AdminFinanceReports />
  },

  // Admin Statistics Routes
  {
    path: "/admin/statistics",
    element: <AdminStatistics />
  },
  {
    path: "/admin/statistics/instructors",
    element: <AdminStatisticsInstructors />
  },
  {
    path: "/admin/statistics/students",
    element: <AdminStatisticsStudents />
  },
  {
    path: "/admin/statistics/comparison",
    element: <AdminStatisticsComparison />
  },
  {
    path: "/admin/statistics/trends",
    element: <AdminStatisticsTrends />
  },

  // Admin Marketing Routes
  {
    path: "/admin/marketing/emails",
    element: <AdminMarketingEmails />
  },
  {
    path: "/admin/marketing/promotions",
    element: <AdminMarketingPromotions />
  },
  {
    path: "/admin/marketing/announcements",
    element: <AdminMarketingAnnouncements />
  },
  {
    path: "/admin/marketing/seo",
    element: <AdminMarketingSeo />
  },

  // Admin Communication Routes
  {
    path: "/admin/messages",
    element: <AdminMessages />
  },
  {
    path: "/admin/support",
    element: <AdminSupport />
  },
  {
    path: "/admin/faq",
    element: <AdminFaq />
  },

  // Admin Notifications Routes
  {
    path: "/admin/notifications",
    element: <AdminNotifications />
  },
  {
    path: "/admin/notifications/preferences",
    element: <AdminNotificationsPreferences />
  },
  {
    path: "/admin/notifications/templates",
    element: <AdminNotificationsTemplates />
  },

  // Admin Settings Routes
  {
    path: "/admin/settings",
    element: <AdminSettings />
  },
  {
    path: "/admin/settings/roles",
    element: <AdminSettingsRoles />
  },
  {
    path: "/admin/settings/activity-log",
    element: <AdminSettingsActivityLog />
  },
  {
    path: "/admin/settings/api",
    element: <AdminSettingsApi />
  },
  {
    path: "/admin/settings/mobile",
    element: <AdminSettingsMobile />
  },

  // Admin System Routes
  {
    path: "/admin/system",
    element: <AdminSystem />
  },
  {
    path: "/admin/system/logs",
    element: <AdminSystemLogs />
  },
  {
    path: "/admin/system/alerts",
    element: <AdminSystemAlerts />
  },
  {
    path: "/admin/system/performance",
    element: <AdminSystemPerformance />
  }
];
