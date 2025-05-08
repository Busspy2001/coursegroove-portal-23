
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor_name?: string;
  category: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  price: number;
  thumbnail_url: string;
  duration: string;
  created_at: string;
  updated_at: string;
  total_students?: number;
  average_rating?: number;
  total_reviews?: number;
}

export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  position: number;
  duration: string;
  lessons?: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  section_id: string;
  title: string;
  type: 'video' | 'quiz' | 'document' | 'practice';
  content_url: string;
  duration: string;
  position: number;
  is_preview: boolean;
}

export function useCourseData(courseId?: string) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId);
    } else {
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourseData = async (id: string) => {
    setLoading(true);
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:instructor_id (
            id,
            profiles_unified:profiles_unified!inner (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single();

      if (courseError) throw courseError;

      // Fetch course sections and lessons
      const { data: sectionData, error: sectionError } = await supabase
        .from('course_sections')
        .select(`
          *,
          lessons:course_lessons (
            *
          )
        `)
        .eq('course_id', id)
        .order('position', { ascending: true });

      if (sectionError) throw sectionError;

      // Fetch course reviews
      const { data: reviewData, error: reviewError } = await supabase
        .from('course_reviews')
        .select(`
          *,
          reviewer:user_id (
            profiles_unified!inner (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('course_id', id)
        .order('created_at', { ascending: false });

      if (reviewError) throw reviewError;

      // Calculate total students
      const { count: studentCount, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .select('id', { count: 'exact', head: true })
        .eq('course_id', id);

      if (enrollmentError) throw enrollmentError;

      // Process the course data
      const processedCourse = {
        ...courseData,
        instructor_name: courseData.instructor?.profiles_unified?.full_name || 'Unknown Instructor',
        instructor_avatar: courseData.instructor?.profiles_unified?.avatar_url,
        total_students: studentCount || 0,
        average_rating: reviewData.length > 0 
          ? reviewData.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewData.length
          : 0,
        total_reviews: reviewData.length
      };
      
      // Sort lessons within sections by position
      const processedSections = sectionData.map((section: any) => ({
        ...section,
        lessons: section.lessons?.sort((a: any, b: any) => a.position - b.position) || []
      }));

      // Process reviews to include reviewer name and avatar
      const processedReviews = reviewData.map((review: any) => ({
        ...review,
        reviewer_name: review.reviewer?.profiles_unified?.full_name || 'Anonymous',
        reviewer_avatar: review.reviewer?.profiles_unified?.avatar_url,
      }));

      setCourse(processedCourse);
      setSections(processedSections);
      setReviews(processedReviews);
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les détails du cours.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    course,
    sections,
    reviews,
    refetch: courseId ? () => fetchCourseData(courseId) : () => {},
  };
}

export function useCourseList() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const { toast } = useToast();

  const fetchCourses = async ({
    page = 1,
    pageSize = 10,
    category = null,
    level = null,
    search = '',
    minPrice = null,
    maxPrice = null,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = {}) => {
    setLoading(true);
    
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          instructor:instructor_id (
            profiles_unified!inner (
              full_name,
              avatar_url
            )
          ),
          enrollments:course_enrollments!course_id (count),
          reviews:course_reviews!course_id (
            rating
          )
        `, { count: 'exact' });
      
      // Apply filters
      if (category) query = query.eq('category', category);
      if (level) query = query.eq('level', level);
      if (search) query = query.ilike('title', `%${search}%`);
      if (minPrice !== null) query = query.gte('price', minPrice);
      if (maxPrice !== null) query = query.lte('price', maxPrice);
      
      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
      
      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      
      const { data, count, error } = await query;
      
      if (error) throw error;
      
      // Process the course data
      const processedCourses = data.map((course) => {
        // Calculate average rating
        const ratings = course.reviews.map((review: any) => review.rating);
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length
          : 0;
        
        return {
          ...course,
          instructor_name: course.instructor?.profiles_unified?.full_name || 'Unknown Instructor',
          instructor_avatar: course.instructor?.profiles_unified?.avatar_url,
          total_students: course.enrollments?.length || 0,
          average_rating: averageRating,
          total_reviews: course.reviews?.length || 0
        };
      });
      
      setCourses(processedCourses);
      if (count !== null) setTotalCourses(count);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les cours. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  return {
    loading,
    courses,
    totalCourses,
    fetchCourses
  };
}
