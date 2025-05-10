import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';

// Types
export interface CourseSection {
  id: string;
  title: string;
  position: number;
  description?: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content: string;
  duration: string;
  position: number;
  is_preview: boolean;
}

export interface Course {
  id?: string;
  title: string;
  description: string;
  price: number;
  level: "débutant" | "intermédiaire" | "avancé";
  category: string;
  thumbnail_url?: string;
  status?: 'draft' | 'published' | 'archived';
}

export function useCourseEditor(courseId?: string) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Fetch course data if editing an existing course
  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    } else {
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      // Mock implementation for now
      // In a real app with Supabase, you would fetch the course data here
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Mock course data
      const mockCourse: Course = {
        id: courseId,
        title: "JavaScript Moderne: ES6 à ES12",
        description: "Maîtrisez les fonctionnalités modernes de JavaScript avec ce cours complet allant des bases d'ES6 jusqu'aux dernières nouveautés.",
        price: 49.99,
        level: "intermédiaire",
        category: "programming",
        thumbnail_url: "https://ui-avatars.com/api/?background=0D9488&color=fff&name=JavaScript+Course",
        status: "published"
      };
      
      const mockSections: CourseSection[] = [
        {
          id: "section1",
          title: "Introduction à JavaScript moderne",
          position: 1,
          lessons: [
            {
              id: "lesson1",
              title: "Bienvenue au cours",
              type: "video",
              content: "https://example.com/video1.mp4",
              duration: "5:30",
              position: 1,
              is_preview: true
            },
            {
              id: "lesson2",
              title: "Configuration de l'environnement",
              type: "text",
              content: "# Configuration \n\n Voici comment configurer votre environnement de développement...",
              duration: "10:00",
              position: 2,
              is_preview: false
            }
          ]
        },
        {
          id: "section2",
          title: "Les bases d'ES6",
          position: 2,
          lessons: [
            {
              id: "lesson3",
              title: "Let et Const",
              type: "video",
              content: "https://example.com/video2.mp4",
              duration: "15:20",
              position: 1,
              is_preview: false
            },
            {
              id: "lesson4",
              title: "Arrow Functions",
              type: "video",
              content: "https://example.com/video3.mp4",
              duration: "12:45",
              position: 2,
              is_preview: false
            }
          ]
        }
      ];
      
      setCourse(mockCourse);
      setSections(mockSections);
      setThumbnailUrl(mockCourse.thumbnail_url || null);
      
      // Once Supabase is integrated, implement real fetching logic
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données du cours',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Save course details
  const saveCourse = async (courseData: Course): Promise<void> => {
    if (!currentUser) throw new Error('Utilisateur non authentifié');
    
    try {
      // Mock implementation for now
      // In a real app with Supabase, you would save the course here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      if (courseId) {
        // Update existing course
        setCourse({ 
          ...courseData, 
          id: courseId,
          thumbnail_url: thumbnailUrl || undefined 
        });
      } else {
        // Create new course
        const newId = `course-${Date.now()}`;
        setCourse({ 
          ...courseData, 
          id: newId,
          thumbnail_url: thumbnailUrl || undefined,
          status: 'draft' 
        });
      }
      
      // Once Supabase is integrated, implement real saving logic
    } catch (error) {
      console.error('Error saving course:', error);
      throw error;
    }
  };

  // Save course content (sections & lessons)
  const saveCourseContent = async (updatedSections: CourseSection[]): Promise<void> => {
    if (!currentUser || !course?.id) throw new Error('Cours non défini');
    
    try {
      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      setSections(updatedSections);
      
      toast({
        title: 'Contenu enregistré',
        description: 'Le contenu du cours a été mis à jour avec succès.',
      });
      
      // Once Supabase is integrated, implement real saving logic
    } catch (error) {
      console.error('Error saving course content:', error);
      throw error;
    }
  };

  // Upload thumbnail image
  const uploadThumbnail = async (file: File): Promise<void> => {
    try {
      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload delay
      
      // Create a temporary URL for the uploaded file
      const tempUrl = URL.createObjectURL(file);
      setThumbnailUrl(tempUrl);
      
      toast({
        title: 'Image téléchargée',
        description: 'L\'image de couverture a été mise à jour.',
      });
      
      // Once Supabase is integrated, implement real file upload logic
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger l\'image',
        variant: 'destructive',
      });
    }
  };

  return {
    loading,
    course,
    sections,
    thumbnailUrl,
    setThumbnailUrl,
    saveCourse,
    saveCourseContent,
    uploadThumbnail,
  };
}
