
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { EnrolledCourse } from '@/components/dashboard/CourseCard';

interface UserStats {
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
  unlocked: boolean;
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
      const mockCourses: EnrolledCourse[] = [
        {
          id: "enroll1",
          title: "Introduction à la Programmation",
          thumbnail: "https://example.com/programming.jpg",
          instructor: "Jean Dupont",
          progress: 75,
          lastAccessed: new Date(Date.now() - 86400000), // yesterday
        },
        {
          id: "enroll2",
          title: "Marketing Digital pour Débutants",
          thumbnail: "https://example.com/marketing.jpg",
          instructor: "Marie Durand",
          progress: 30,
          lastAccessed: new Date(),
        }
      ];

      // Mock achievements
      const mockAchievements: Achievement[] = [
        {
          name: "Première inscription",
          description: "Vous avez complété votre inscription",
          icon: "🎉",
          unlocked: true,
        },
        {
          name: "Premier cours complété",
          description: "Vous avez terminé votre premier cours",
          icon: "🏆",
          unlocked: true,
        },
        {
          name: "Premier certificat",
          description: "Vous avez obtenu votre premier certificat",
          icon: "📜",
          unlocked: true,
        },
        {
          name: "5 cours complétés",
          description: "Vous avez terminé 5 cours",
          icon: "🔥",
          unlocked: false,
        },
        {
          name: "10 heures d'apprentissage",
          description: "Vous avez passé 10 heures à apprendre",
          icon: "⏱️",
          unlocked: true,
        },
        {
          name: "Participation au forum",
          description: "Vous avez participé aux discussions",
          icon: "💬",
          unlocked: false,
        },
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
      setAchievements(mockAchievements);
      
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
        title: enrollment.course?.title || '',
        thumbnail: enrollment.course?.thumbnail_url || '',
        instructor: enrollment.course?.instructor?.profiles_unified?.full_name || 'Unknown Instructor',
        progress: enrollment.progress || 0,
        lastAccessed: enrollment.last_accessed_at ? new Date(enrollment.last_accessed_at) : new Date()
      }));

      // Sort by last accessed
      processedCourses.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
      
      // Also fetch user achievements
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
        .eq('user_id', currentUser.id);
        
      if (achievementsError) throw achievementsError;

      const processedAchievements = achievementsData.map(item => ({
        name: item.achievement?.name || '',
        description: item.achievement?.description || '',
        icon: item.achievement?.icon || '🏆',
        unlocked: true
      }));

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
      setAchievements(processedAchievements);
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
  const calculateTotalHours = (courses: EnrolledCourse[], rawEnrollments: any[]): number => {
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
    achievements,
    refetch: fetchUserData
  };
}
