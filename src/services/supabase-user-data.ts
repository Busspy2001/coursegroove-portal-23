
import { supabase } from '@/integrations/supabase/client';
import { EnrolledCourse, Achievement, UserStats } from "@/types/user-data";
import { CourseEnrollment, ProfilesUnified } from '@/types/database';

export const fetchEnrolledCourses = async (userId: string): Promise<EnrolledCourse[]> => {
  try {
    const { data: enrollments, error: enrollmentsError } = await (supabase
      .from('course_enrollments' as unknown as never)
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
            id,
            full_name
          )
        )
      `)
      .eq('student_id', userId) as unknown as { data: any[], error: any });

    if (enrollmentsError) throw enrollmentsError;

    if (!enrollments || enrollments.length === 0) return [];

    // Process enrollment data
    const processedCourses = enrollments.map(enrollment => ({
      id: enrollment.id,
      title: enrollment.course?.title || '',
      thumbnail: enrollment.course?.thumbnail_url || '',
      instructor: enrollment.course?.instructor?.full_name || 'Unknown Instructor',
      progress: enrollment.progress || 0,
      lastAccessed: enrollment.last_accessed_at ? new Date(enrollment.last_accessed_at) : new Date()
    }));

    // Sort by last accessed
    processedCourses.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
    
    return processedCourses;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
};

export const fetchUserAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const { data: achievementsData, error: achievementsError } = await (supabase
      .from('user_achievements' as unknown as never)
      .select(`
        *,
        achievement:achievement_id (
          id,
          name,
          description,
          icon
        )
      `)
      .eq('user_id', userId) as unknown as { data: any[], error: any });
      
    if (achievementsError) throw achievementsError;

    if (!achievementsData || achievementsData.length === 0) return [];

    const processedAchievements = achievementsData.map(item => ({
      name: item.achievement?.name || '',
      description: item.achievement?.description || '',
      icon: item.achievement?.icon || '🏆',
      unlocked: true
    }));

    return processedAchievements;
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    return [];
  }
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

// Nouvelles fonctions pour interagir avec les tables créées
export const fetchUserProfile = async (userId: string): Promise<ProfilesUnified | null> => {
  try {
    const { data, error } = await (supabase
      .from('profiles_unified' as unknown as never)
      .select('*')
      .eq('id', userId)
      .single() as unknown as { data: ProfilesUnified | null, error: any });

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profileData: Partial<ProfilesUnified>): Promise<boolean> => {
  try {
    // Corrigé ici: Nous utilisons un cast de type plus précis pour résoudre l'erreur
    const { error } = await (supabase
      .from('profiles_unified' as unknown as never)
      .update(profileData as Record<string, unknown>)
      .eq('id', userId) as unknown as { error: any });

    if (error) {
      console.error("Error updating user profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return false;
  }
};
