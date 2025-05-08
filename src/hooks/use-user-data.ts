
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
      // For now, we'll use mock data until the Supabase types are updated
      const mockCourses = [
        {
          id: "enroll1",
          courseId: "course1",
          title: "Introduction à la Programmation",
          thumbnail: "https://example.com/programming.jpg",
          instructorName: "Jean Dupont",
          progress: 75,
          lastAccessed: new Date(Date.now() - 86400000), // yesterday
          category: "Programmation",
          completedLessons: ["lesson1", "lesson2", "lesson3"]
        },
        {
          id: "enroll2",
          courseId: "course2",
          title: "Marketing Digital pour Débutants",
          thumbnail: "https://example.com/marketing.jpg",
          instructorName: "Marie Durand",
          progress: 30,
          lastAccessed: new Date(),
          category: "Marketing",
          completedLessons: ["lesson1"]
        }
      ];

      // Calculate user stats from mock data
      const calculatedStats = {
        totalCoursesEnrolled: mockCourses.length,
        totalCoursesCompleted: mockCourses.filter(course => course.progress === 100).length,
        totalHoursLearned: 12.5, // Mock data
        certificatesEarned: mockCourses.filter(course => course.progress === 100).length,
        averageProgress: mockCourses.length > 0 
          ? mockCourses.reduce((sum, course) => sum + course.progress, 0) / mockCourses.length
          : 0,
        lastActivityDate: mockCourses.length > 0 
          ? new Date(Math.max(...mockCourses.map(course => course.lastAccessed.getTime())))
          : null
      };

      setEnrolledCourses(mockCourses);
      setStats(calculatedStats);
      
      // Once Supabase types are updated, we can uncomment and use this code:
      /*
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
      */
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
      // Use mock data for now
      const courseDuration = Math.random() * 10 + 1; // Random duration between 1-10 hours
      const completedHours = courseDuration * (course.progress / 100);
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
