
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserStats {
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  averageProgress: number;
  lastActivityDate: Date | null;
}

interface UserCourse {
  id: string;
  courseId: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  progress: number;
  lastAccessed: Date;
  category: string;
  completedLessons: string[];
}

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
  const [enrolledCourses, setEnrolledCourses] = useState<UserCourse[]>([]);
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
      // Fetch user enrollments with course details
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
        .eq('user_id', currentUser.id);

      if (enrollmentsError) throw enrollmentsError;

      // Process enrollment data
      const processedCourses = enrollments.map(enrollment => ({
        id: enrollment.id,
        courseId: enrollment.course_id,
        title: enrollment.course?.title || '',
        thumbnail: enrollment.course?.thumbnail_url || '',
        instructorName: enrollment.course?.instructor?.profiles_unified?.full_name || 'Unknown Instructor',
        progress: enrollment.progress || 0,
        lastAccessed: enrollment.last_accessed_at ? new Date(enrollment.last_accessed_at) : new Date(),
        category: enrollment.course?.category || '',
        completedLessons: enrollment.completed_lessons || []
      }));

      // Sort by last accessed
      processedCourses.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());

      // Calculate user stats
      const calculatedStats = {
        totalCoursesEnrolled: processedCourses.length,
        totalCoursesCompleted: processedCourses.filter(course => course.progress === 100).length,
        totalHoursLearned: calculateTotalHours(processedCourses, enrollments),
        certificatesEarned: processedCourses.filter(course => course.progress === 100).length,
        averageProgress: processedCourses.length > 0 
          ? processedCourses.reduce((sum, course) => sum + course.progress, 0) / processedCourses.length
          : 0,
        lastActivityDate: processedCourses.length > 0 
          ? new Date(Math.max(...processedCourses.map(course => course.lastAccessed.getTime())))
          : null
      };

      setEnrolledCourses(processedCourses);
      setStats(calculatedStats);
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

  // Helper function to calculate total hours learned
  const calculateTotalHours = (courses: UserCourse[], rawEnrollments: any[]): number => {
    // This is a simplified calculation
    // In a real app, you would calculate based on the actual time spent or video duration watched
    let totalHours = 0;
    
    courses.forEach(course => {
      const enrollment = rawEnrollments.find(e => e.course_id === course.courseId);
      const courseDuration = enrollment?.course?.duration || '';
      
      // Parse duration strings like "2h 30min" or "45min"
      const hourMatch = courseDuration.match(/(\d+)h/);
      const minuteMatch = courseDuration.match(/(\d+)min/);
      
      const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
      const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
      
      // Calculate the portion of the course completed
      const totalCourseHours = hours + minutes / 60;
      const completedHours = totalCourseHours * (course.progress / 100);
      
      totalHours += completedHours;
    });
    
    return Number(totalHours.toFixed(1));
  };

  return {
    loading,
    stats,
    enrolledCourses,
    refetch: fetchUserData
  };
}
