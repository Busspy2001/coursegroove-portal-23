
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
