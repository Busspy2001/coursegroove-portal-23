
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth';
import { UserStats, Achievement, EnrolledCourse } from '@/types/user-data';
import { 
  getMockEnrolledCourses, 
  getMockAchievements, 
  calculateUserStats 
} from '@/services/mock-user-data';
import { 
  fetchEnrolledCourses, 
  fetchUserAchievements, 
  calculateStatsFromCourses 
} from '@/services/supabase-user-data';

// Re-export the Achievement type for backward compatibility
export type { Achievement } from '@/types/user-data';

export function useUserData() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    totalCoursesEnrolled: 0,
    totalCoursesCompleted: 0,
    totalHoursLearned: 0,
    certificatesEarned: 0,
    averageProgress: 0,
    lastActivityDate: null
  });
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      // For now, we'll use mock data until the Supabase implementation is complete
      const mockCourses = getMockEnrolledCourses();
      const mockAchievements = getMockAchievements();
      const calculatedStats = calculateUserStats(mockCourses);

      // Once Supabase types are updated, we can uncomment and use this code:
      /*
      if (currentUser.id) {
        // Fetch real data from Supabase
        const courses = await fetchEnrolledCourses(currentUser.id);
        const userAchievements = await fetchUserAchievements(currentUser.id);
        const calculatedStats = calculateStatsFromCourses(courses);
        
        setEnrolledCourses(courses);
        setAchievements(userAchievements);
        setStats(calculatedStats);
      }
      */

      setEnrolledCourses(mockCourses);
      setStats(calculatedStats);
      setAchievements(mockAchievements);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos données utilisateur.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    enrolledCourses,
    achievements,
    refetch: fetchUserData
  };
}
