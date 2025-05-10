
import { supabase } from '@/integrations/supabase/client';
import { EnrolledCourse, Achievement, UserStats } from "@/types/user-data";

export const fetchEnrolledCourses = async (userId: string): Promise<EnrolledCourse[]> => {
  // Future implementation with Supabase
  /*
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('course_enrollments')
    .select(`
      *,
      course:course_id (
        id,
        title,
        thumbnail_url,
        category,
        duration,
        instructor_id,
        instructor:instructor_id (
          profiles_unified!inner (
            full_name
          )
        )
      )
    `)
    .eq('user_id', userId);

  if (enrollmentsError) throw enrollmentsError;

  // Process enrollment data
  const processedCourses = enrollments.map(enrollment => ({
    id: enrollment.id,
    title: enrollment.course?.title || '',
    thumbnail: enrollment.course?.thumbnail_url || '',
    instructor: enrollment.course?.instructor?.profiles_unified?.full_name || 'Unknown Instructor',
    progress: enrollment.progress || 0,
    lastAccessed: enrollment.last_accessed_at ? new Date(enrollment.last_accessed_at) : new Date()
  }));

  // Sort by last accessed
  processedCourses.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
  
  return processedCourses;
  */
  
  // For now, return an empty array until Supabase integration is complete
  return [];
};

export const fetchUserAchievements = async (userId: string): Promise<Achievement[]> => {
  // Future implementation with Supabase
  /*
  const { data: achievementsData, error: achievementsError } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievement_id (
        name,
        description,
        icon
      )
    `)
    .eq('user_id', userId);
    
  if (achievementsError) throw achievementsError;

  const processedAchievements = achievementsData.map(item => ({
    name: item.achievement?.name || '',
    description: item.achievement?.description || '',
    icon: item.achievement?.icon || '🏆',
    unlocked: true
  }));

  return processedAchievements;
  */
  
  // For now, return an empty array until Supabase integration is complete
  return [];
};

export const calculateTotalHours = (courses: EnrolledCourse[]): number => {
  let totalHours = 0;
  
  courses.forEach(course => {
    // Use estimated duration for now
    const courseDuration = Math.random() * 10 + 1; // Random duration between 1-10 hours
    const completedHours = courseDuration * (course.progress / 100);
    totalHours += completedHours;
  });
  
  return Number(totalHours.toFixed(1));
};

export const calculateStatsFromCourses = (courses: EnrolledCourse[]): UserStats => {
  return {
    totalCoursesEnrolled: courses.length,
    totalCoursesCompleted: courses.filter(course => course.progress === 100).length,
    totalHoursLearned: calculateTotalHours(courses),
    certificatesEarned: courses.filter(course => course.progress === 100).length,
    averageProgress: courses.length > 0 
      ? courses.reduce((sum, course) => sum + course.progress, 0) / courses.length
      : 0,
    lastActivityDate: courses.length > 0 
      ? new Date(Math.max(...courses.map(course => course.lastAccessed.getTime())))
      : null
  };
};
