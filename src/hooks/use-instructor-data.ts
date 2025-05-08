import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  monthlyRevenue: number;
  averageRating: number;
  totalEnrollments: number;
  completionRate: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
  total_students: number;
  average_rating: number;
  total_lessons: number;
  duration: string;
  price: number;
}

export function useInstructorData() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<InstructorStats>({
    totalCourses: 0,
    totalStudents: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    totalEnrollments: 0,
    completionRate: 0
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser && currentUser.role === "instructor") {
      fetchInstructorData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchInstructorData = async () => {
    setLoading(true);
    
    try {
      // This is a mock implementation
      // In a real app, this would be an API call to fetch instructor data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data for development until Supabase tables are updated
      const mockStats: InstructorStats = {
        totalCourses: 5,
        totalStudents: 256,
        monthlyRevenue: 1274,
        averageRating: 4.8,
        totalEnrollments: 305,
        completionRate: 72
      };
      
      const mockCourses: Course[] = [
        {
          id: "course1",
          title: "JavaScript Moderne: ES6 à ES12",
          description: "Maîtrisez les fonctionnalités modernes de JavaScript avec ce cours complet allant des bases d'ES6 jusqu'aux dernières nouveautés.",
          thumbnail_url: "https://ui-avatars.com/api/?background=0D9488&color=fff&name=JavaScript+Course",
          status: "published",
          created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
          updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          total_students: 125,
          average_rating: 4.7,
          total_lessons: 45,
          duration: "12h 30min",
          price: 49.99
        },
        {
          id: "course2",
          title: "Fondamentaux du développement web",
          description: "Un cours complet pour débutants sur HTML, CSS et les bases de JavaScript pour construire des sites web modernes.",
          thumbnail_url: "https://ui-avatars.com/api/?background=0284C7&color=fff&name=Web+Basics",
          status: "published",
          created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
          updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          total_students: 87,
          average_rating: 4.9,
          total_lessons: 32,
          duration: "8h 15min",
          price: 29.99
        },
        {
          id: "course3",
          title: "React pour les débutants",
          description: "Apprenez React depuis zéro et construisez des applications web modernes avec cette bibliothèque JavaScript populaire.",
          thumbnail_url: "https://ui-avatars.com/api/?background=2563EB&color=fff&name=React+Course",
          status: "draft",
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
          updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          total_students: 0,
          average_rating: 0,
          total_lessons: 18,
          duration: "6h 45min",
          price: 39.99
        },
        {
          id: "course4",
          title: "Python pour la data science",
          description: "Découvrez comment utiliser Python pour l'analyse de données et la visualisation avec pandas, numpy et matplotlib.",
          thumbnail_url: "https://ui-avatars.com/api/?background=4C1D95&color=fff&name=Python+Data",
          status: "published",
          created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
          updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          total_students: 44,
          average_rating: 4.6,
          total_lessons: 28,
          duration: "10h 20min",
          price: 59.99
        },
        {
          id: "course5",
          title: "Introduction à Git et GitHub",
          description: "Apprenez à utiliser Git et GitHub pour gérer efficacement vos projets de code et collaborer avec d'autres développeurs.",
          thumbnail_url: "https://ui-avatars.com/api/?background=0F172A&color=fff&name=Git+GitHub",
          status: "archived",
          created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days ago
          updated_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
          total_students: 0,
          average_rating: 0,
          total_lessons: 12,
          duration: "3h 45min",
          price: 19.99
        }
      ];
      
      setStats(mockStats);
      setCourses(mockCourses);
      
      // Once the Supabase tables are updated, the commented code can be enabled
      // Keep the commented code for future implementation
    } catch (error) {
      console.error('Error fetching instructor data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos données d\'instructeur.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    courses,
    refetch: fetchInstructorData
  };
}
