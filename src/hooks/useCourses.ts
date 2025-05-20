
import { useState, useEffect } from 'react';
import { courseService } from '@/services/course-service';

export const useCourses = (options: {
  category?: string;
  instructorId?: string;
  search?: string;
  limit?: number;
  page?: number;
} = {}) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { courses, count } = await courseService.getCourses(options);
        setCourses(courses);
        setTotalCount(count || 0);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Une erreur s'est produite lors du chargement des cours");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [options.category, options.instructorId, options.search, options.limit, options.page]);
  
  return {
    courses,
    totalCount,
    isLoading,
    error,
    refresh: async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { courses, count } = await courseService.getCourses(options);
        setCourses(courses);
        setTotalCount(count || 0);
      } catch (err) {
        console.error("Error refreshing courses:", err);
        setError("Une erreur s'est produite lors de l'actualisation des cours");
      } finally {
        setIsLoading(false);
      }
    }
  };
};

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const courseData = await courseService.getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Une erreur s'est produite lors du chargement du cours");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);
  
  return {
    course,
    isLoading,
    error,
    refresh: async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const courseData = await courseService.getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error("Error refreshing course:", err);
        setError("Une erreur s'est produite lors de l'actualisation du cours");
      } finally {
        setIsLoading(false);
      }
    }
  };
};
