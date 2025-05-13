
export interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  totalCourses: number;
  pendingCourses: number;
  totalRevenue: string;
  revenueGrowth: string;
  activeUsers: number;
  averageRating: number;
  alertsCount: number;
  ticketsCount: number;
  pendingReviews: number;
  completionRate: number;
  businessCustomers: number;
  bizUsersTotal: number;
  courseAbandonRate: number;
}

export type AlertStatus = 'success' | 'warning' | 'danger' | 'neutral';

export interface AdminAlert {
  id: string;
  title: string;
  message: string;
  status: AlertStatus;
  date: string;
  read: boolean;
  actionRequired: boolean;
  category: 'system' | 'user' | 'course' | 'business' | 'finance';
}

export interface AdminTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
  completed: boolean;
  assignedTo?: string;
  category: 'moderation' | 'support' | 'business' | 'system';
}

export interface AdminModule {
  id: string;
  name: string;
  alerts: number;
  status: AlertStatus;
}
