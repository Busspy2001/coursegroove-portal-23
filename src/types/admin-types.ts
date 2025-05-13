
export type AdminAlertStatus = "success" | "warning" | "danger" | "neutral";
export type AdminTaskPriority = "high" | "medium" | "low";
export type AdminAlertCategory = "user" | "course" | "business" | "system" | "finance" | "security";
export type AdminTaskCategory = "moderation" | "support" | "business" | "system" | "finance" | "marketing" | "security";
export type AdminModuleStatus = "success" | "warning" | "danger" | "neutral";

export interface AdminAlert {
  id: string;
  title: string;
  message: string;
  status: AdminAlertStatus;
  date: string;
  read: boolean;
  actionRequired: boolean;
  category: AdminAlertCategory;
  link?: string;
}

export interface AdminTask {
  id: string;
  title: string;
  description: string;
  priority: AdminTaskPriority;
  due: string;
  completed: boolean;
  assignedTo?: string;
  category: AdminTaskCategory;
  link?: string;
}

export interface AdminModule {
  id: string;
  name: string;
  alerts: number;
  status: AdminModuleStatus;
  icon?: React.ElementType;
}

export interface AdminDashboardStat {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ElementType;
  trend?: "up" | "down" | "neutral";
}

export interface AdminActivity {
  id: number;
  type: "user_registration" | "course_published" | "course_review" | "payment_received" | "business_signup" | "user_support" | "system_alert";
  name: string;
  time: string;
  author?: string;
  rating?: number;
  amount?: string;
  course?: string;
}
