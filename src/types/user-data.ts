
export interface UserStats {
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  averageProgress: number;
  lastActivityDate: Date | null;
}

export interface Achievement {
  name: string;
  description: string;
  icon: string;
  iconUrl?: string;
  unlocked: boolean;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  progress: number;
  lastAccessed: Date;
}
