import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth';

interface CourseProgressData {
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: string[]; // array of lesson IDs
  lastAccessedAt: string;
  createdAt: string;
}

export function useCourse(courseId: string) {
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastAccessedAt, setLastAccessedAt] = useState<Date | null>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // If user is logged in and courseId is provided, check enrollment and progress
    if (currentUser && courseId) {
      fetchCourseProgress();
    } else {
      setLoading(false);
    }
  }, [currentUser, courseId]);

  const fetchCourseProgress = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    
    try {
      // Since the Supabase types don't include our course tables yet,
      // we'll use a temporary mock implementation
      const mockEnrollmentData = {
        enrolled: Math.random() > 0.5, // randomly determine if enrolled for demo
        progress: Math.floor(Math.random() * 100), // random progress percentage
        completedLessons: ["lesson1", "lesson2"], // mock completed lessons
        lastAccessedAt: new Date().toISOString() // current timestamp
      };
      
      setEnrolled(mockEnrollmentData.enrolled);
      
      if (mockEnrollmentData.enrolled) {
        setProgress(mockEnrollmentData.progress);
        setCompletedLessons(mockEnrollmentData.completedLessons);
        setLastAccessedAt(new Date(mockEnrollmentData.lastAccessedAt));
      }
      
      // Once Supabase types are updated, we can uncomment and use this code:
      /*
      // Check if the user is enrolled in this course
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('course_id', courseId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw error;
      }

      if (data) {
        setEnrolled(true);
        setProgress(data.progress || 0);
        setCompletedLessons(data.completed_lessons || []);
        setLastAccessedAt(data.last_accessed_at ? new Date(data.last_accessed_at) : null);
      } else {
        setEnrolled(false);
      }
      */
    } catch (error) {
      console.error('Error fetching course progress:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer votre progression pour ce cours.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async () => {
    if (!currentUser) {
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour vous inscrire à ce cours.',
        variant: 'destructive',
      });
      return false;
    }

    setLoading(true);
    try {
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate network request
      
      setEnrolled(true);
      setProgress(0);
      setCompletedLessons([]);
      setLastAccessedAt(new Date());
      
      toast({
        title: 'Inscription réussie',
        description: 'Vous êtes maintenant inscrit à ce cours.',
      });
      
      return true;
      
      // Once Supabase types are updated, we can uncomment and use this code:
      /*
      const now = new Date().toISOString();
      const { error } = await supabase.from('course_enrollments').insert({
        user_id: currentUser.id,
        course_id: courseId,
        progress: 0,
        completed_lessons: [],
        enrolled_at: now,
        last_accessed_at: now,
      });

      if (error) throw error;

      setEnrolled(true);
      setProgress(0);
      setCompletedLessons([]);
      setLastAccessedAt(new Date());
      
      toast({
        title: 'Inscription réussie',
        description: 'Vous êtes maintenant inscrit à ce cours.',
      });
      
      return true;
      */
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: 'Erreur d\'inscription',
        description: 'Impossible de vous inscrire à ce cours. Veuillez réessayer.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!currentUser || !enrolled) return false;

    try {
      // Check if the lesson isn't already marked as complete
      if (!completedLessons.includes(lessonId)) {
        const updatedCompletedLessons = [...completedLessons, lessonId];
        
        // Mock progress calculation
        const mockTotalLessons = 10;
        const newProgress = Math.round((updatedCompletedLessons.length / mockTotalLessons) * 100);
        
        // Simulate a successful update
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setCompletedLessons(updatedCompletedLessons);
        setProgress(newProgress);
        setLastAccessedAt(new Date());
        
        return true;
      }
      return false;
      
      // Once Supabase types are updated, we can uncomment and use this code:
      /*
      // Check if the lesson isn't already marked as complete
      if (!completedLessons.includes(lessonId)) {
        const updatedCompletedLessons = [...completedLessons, lessonId];
        
        // Calculate new progress percentage based on total lessons in the course
        const mockTotalLessons = 10; // Replace with actual total lessons count
        const newProgress = Math.round((updatedCompletedLessons.length / mockTotalLessons) * 100);
        
        const { error } = await supabase
          .from('course_enrollments')
          .update({
            completed_lessons: updatedCompletedLessons,
            progress: newProgress,
            last_accessed_at: new Date().toISOString()
          })
          .eq('user_id', currentUser.id)
          .eq('course_id', courseId);

        if (error) throw error;

        setCompletedLessons(updatedCompletedLessons);
        setProgress(newProgress);
        setLastAccessedAt(new Date());
        
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de marquer cette leçon comme terminée. Veuillez réessayer.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    loading,
    enrolled,
    progress,
    completedLessons,
    lastAccessedAt,
    enrollInCourse,
    markLessonComplete,
  };
}
