
import { useState, useEffect } from 'react';
import { courseService } from '@/services/course-service';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching courses with options:", options);
        const { courses, count } = await courseService.getCourses(options);
        setCourses(courses);
        setTotalCount(count || 0);
        console.log(`Fetched ${courses.length} courses`);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("An error occurred while loading courses");
        toast({
          title: "Error loading courses",
          description: "We couldn't load the courses. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [options.category, options.instructorId, options.search, options.limit, options.page, toast]);
  
  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { courses, count } = await courseService.getCourses(options);
      setCourses(courses);
      setTotalCount(count || 0);
      
      toast({
        title: "Courses updated",
        description: "Course list has been refreshed.",
      });
    } catch (err) {
      console.error("Error refreshing courses:", err);
      setError("An error occurred while refreshing courses");
      toast({
        title: "Error refreshing courses",
        description: "We couldn't refresh the course list. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    courses,
    totalCount,
    isLoading,
    error,
    refresh
  };
};

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching course details:", courseId);
        const courseData = await courseService.getCourse(courseId);
        setCourse(courseData);
        console.log("Course fetched successfully:", courseData?.title);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("An error occurred while loading the course");
        toast({
          title: "Error loading course",
          description: "We couldn't load the course details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, toast]);
  
  const refresh = async () => {
    if (!courseId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const courseData = await courseService.getCourse(courseId);
      setCourse(courseData);
      
      toast({
        title: "Course updated",
        description: "Course details have been refreshed.",
      });
    } catch (err) {
      console.error("Error refreshing course:", err);
      setError("An error occurred while refreshing the course");
      toast({
        title: "Error refreshing course",
        description: "We couldn't refresh the course details. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    course,
    isLoading,
    error,
    refresh
  };
};
