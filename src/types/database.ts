// These types represent the database structures we've created
// They're used as a workaround since we can't modify the auto-generated types.ts

export type UserRole = 'super_admin' | 'business_admin' | 'student' | 'instructor' | 'demo' | 'admin' | 'employee';

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
  phone: string | null;
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

// Assessment Related Types
export interface AssessmentType {
  id: string;
  name: string;
  description: string | null;
  company_id: string;
  is_mandatory: boolean;
  passing_score: number;
  created_at: string;
  created_by: string | null;
}

export interface EmployeeAssessment {
  id: string;
  assessment_type_id: string;
  title: string;
  description: string | null;
  company_id: string;
  department_id: string | null;
  due_date: string | null;
  created_at: string;
  created_by: string | null;
  is_active: boolean;
}

export interface AssessmentQuestion {
  id: string;
  assessment_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'text';
  options: any[] | null;
  correct_answer: string | null;
  points: number;
  position: number;
  created_at: string;
}

export interface AssessmentSubmission {
  id: string;
  assessment_id: string;
  employee_id: string;
  submitted_at: string;
  score: number | null;
  passed: boolean | null;
  completion_time: number | null;
  status: 'started' | 'submitted' | 'evaluated' | 'expired';
}

export interface AssessmentResponse {
  id: string;
  submission_id: string;
  question_id: string;
  response: string | null;
  is_correct: boolean | null;
  points_earned: number;
  response_time: number | null;
}

// Skills Related Types
export interface SkillCategory {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  company_id: string;
  created_at: string;
}

export interface EmployeeSkill {
  id: string;
  employee_id: string;
  skill_id: string;
  proficiency_level: number | null;
  acquired_date: string;
  verified: boolean;
  verified_by: string | null;
  source: string | null;
  source_id: string | null;
}

// Certification Related Types
export interface EmployeeCertification {
  id: string;
  employee_id: string;
  name: string;
  description: string | null;
  issue_date: string;
  expiry_date: string | null;
  issued_by: string | null;
  company_id: string;
  certification_data: any | null;
  status: 'active' | 'expired' | 'revoked';
  related_courses: any[] | null;
}
