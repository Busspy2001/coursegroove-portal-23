
// These types represent the database structures we've created
// They're used as a workaround since we can't modify the auto-generated types.ts

export type UserRole = 'super_admin' | 'business_admin' | 'student' | 'instructor' | 'demo';

export interface ProfilesUnified {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole | null;
  avatar_url: string | null;
  company_id: string | null;
  is_demo: boolean | null;
  created_at: string | null;
  bio: string | null;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string;
  price: number | null;
  is_published: boolean;
  thumbnail_url: string | null;
  category: string | null;
  level: 'débutant' | 'intermédiaire' | 'avancé' | null;
  duration: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollment {
  id: string;
  student_id: string;
  course_id: string;
  progress: number;
  completed_lessons: any[];
  last_accessed_at: string | null;
  enrolled_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

// Nouvelles interfaces pour les tables que nous avons créées

export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  position: number;
  created_at: string;
}

export interface CourseLesson {
  id: string;
  section_id: string;
  title: string;
  type: 'video' | 'quiz' | 'text' | 'resource';
  content_url: string | null;
  duration: string | null;
  position: number;
  is_preview: boolean;
  created_at: string;
}

export interface CourseReview {
  id: string;
  course_id: string;
  student_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Purchase {
  id: string;
  student_id: string;
  course_id: string;
  purchased_at: string;
}

export interface Company {
  id: string;
  name: string;
  admin_id: string | null;
  created_at: string;
}

export interface CompanySubscription {
  id: string;
  company_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  is_active: boolean;
  started_at: string | null;
  ended_at: string | null;
}

export interface ProgressTracking {
  id: string;
  student_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'course' | 'achievement' | 'system' | 'review';
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  login_at: string;
  logout_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  details: any;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  student_id: string;
  course_id: string;
  created_at: string;
}
