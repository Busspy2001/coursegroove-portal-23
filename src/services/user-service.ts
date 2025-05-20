
import { supabase } from '@/integrations/supabase/client';
import { EnrolledCourse, Achievement, UserStats } from "@/types/user-data";

/**
 * Service for managing user data
 */
export const userService = {
  /**
   * Fetch courses the user is enrolled in
   */
  getEnrolledCourses: async (userId: string): Promise<EnrolledCourse[]> => {
    try {
      const { data: enrollments, error } = await supabase
        .from('course_enrollments')
        .select(`
          id,
          progress,
          last_accessed_at,
          course:course_id (
            id,
            title,
            thumbnail_url,
            instructor_id,
            instructor:instructor_id (
              id,
              full_name
            )
          )
        `)
        .eq('student_id', userId)
        .order('last_accessed_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching enrolled courses:", error);
        return [];
      }
      
      return enrollments.map(enrollment => ({
        id: enrollment.id,
        title: enrollment.course?.title || 'Cours sans titre',
        thumbnail: enrollment.course?.thumbnail_url || '',
        instructor: enrollment.course?.instructor?.full_name || 'Instructeur inconnu',
        progress: enrollment.progress || 0,
        lastAccessed: enrollment.last_accessed_at ? new Date(enrollment.last_accessed_at) : new Date()
      }));
    } catch (error) {
      console.error("Error in getEnrolledCourses:", error);
      return [];
    }
  },
  
  /**
   * Fetch user achievements
   */
  getAchievements: async (userId: string): Promise<Achievement[]> => {
    try {
      const { data: userAchievements, error } = await supabase
        .from('user_achievements')
        .select(`
          id,
          unlocked_at,
          achievement:achievement_id (
            id,
            name,
            description,
            icon
          )
        `)
        .eq('user_id', userId);
      
      if (error) {
        console.error("Error fetching user achievements:", error);
        return [];
      }
      
      // Query all achievements to include locked ones
      const { data: allAchievements, error: allAchievementsError } = await supabase
        .from('achievements')
        .select('id, name, description, icon');
        
      if (allAchievementsError) {
        console.error("Error fetching all achievements:", allAchievementsError);
        return [];
      }
      
      // Create a map of unlocked achievements
      const unlockedMap = new Map();
      userAchievements.forEach(ua => {
        if (ua.achievement) {
          unlockedMap.set(ua.achievement.id, true);
        }
      });
      
      // Process all achievements, marking which ones are unlocked
      return allAchievements.map(achievement => ({
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        unlocked: unlockedMap.has(achievement.id)
      }));
    } catch (error) {
      console.error("Error in getAchievements:", error);
      return [];
    }
  },
  
  /**
   * Calculate user statistics
   */
  calculateStats: async (userId: string): Promise<UserStats> => {
    try {
      // Get enrolled courses
      const enrolledCourses = await userService.getEnrolledCourses(userId);
      
      // Calculate total hours learned (this could be improved with actual lesson durations)
      let totalHoursLearned = 0;
      enrolledCourses.forEach(course => {
        // Assume 10 hours per course on average, scaled by progress percentage
        const courseHours = 10 * (course.progress / 100);
        totalHoursLearned += courseHours;
      });
      
      // Calculate average progress
      const averageProgress = enrolledCourses.length > 0
        ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
        : 0;
      
      // Get completed courses count
      const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
      
      // Get last activity date
      const lastActivityDate = enrolledCourses.length > 0
        ? new Date(Math.max(...enrolledCourses.map(course => course.lastAccessed.getTime())))
        : null;
      
      // Get certificates count (for now, same as completed courses)
      const certificatesEarned = completedCourses;
      
      return {
        totalCoursesEnrolled: enrolledCourses.length,
        totalCoursesCompleted: completedCourses,
        totalHoursLearned,
        certificatesEarned,
        averageProgress,
        lastActivityDate
      };
    } catch (error) {
      console.error("Error calculating user stats:", error);
      return {
        totalCoursesEnrolled: 0,
        totalCoursesCompleted: 0,
        totalHoursLearned: 0,
        certificatesEarned: 0,
        averageProgress: 0,
        lastActivityDate: null
      };
    }
  },
  
  /**
   * Update user profile
   */
  updateProfile: async (userId: string, profileData: any): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles_unified')
        .update(profileData)
        .eq('id', userId);
      
      if (error) {
        console.error("Error updating profile:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return false;
    }
  },
  
  /**
   * Get user profile by ID
   */
  getProfile: async (userId: string): Promise<any> => {
    try {
      const { data, error } = await supabase
        .from('profiles_unified')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      return null;
    }
  }
};
