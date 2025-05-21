
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for managing courses
 */
export const courseService = {
  /**
   * Get all published courses with optional filtering
   */
  getCourses: async (options: {
    category?: string;
    instructorId?: string;
    search?: string;
    limit?: number;
    page?: number;
    sort?: 'newest' | 'popularity' | 'rating';
    level?: 'débutant' | 'intermédiaire' | 'avancé';
    price?: 'free' | 'paid' | 'all';
  } = {}) => {
    try {
      let query = supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          category,
          level,
          thumbnail_url,
          price,
          duration,
          created_at,
          instructor:instructor_id (
            id,
            full_name,
            avatar_url
          ),
          avg_rating:course_reviews(rating)
        `)
        .eq('is_published', true);
      
      // Add category filter if provided
      if (options.category) {
        query = query.eq('category', options.category);
      }
      
      // Add instructor filter if provided
      if (options.instructorId) {
        query = query.eq('instructor_id', options.instructorId);
      }
      
      // Add search filter if provided
      if (options.search) {
        query = query.ilike('title', `%${options.search}%`);
      }
      
      // Add pagination
      const page = options.page || 1;
      const limit = options.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit - 1;
      
      query = query.range(start, end);
      
      // Execute query
      const { data, error, count } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching courses:", error);
        return { courses: [], count: 0 };
      }
      
      // Process courses data
      const processedCourses = data.map(course => ({
        ...course,
        // Calculate average rating
        avg_rating: course.avg_rating?.length > 0
          ? course.avg_rating.reduce((sum: number, item: any) => sum + (item.rating || 0), 0) / course.avg_rating.length
          : null
      }));
      
      return { 
        courses: processedCourses,
        count
      };
    } catch (error) {
      console.error("Error in getCourses:", error);
      return { courses: [], count: 0 };
    }
  },
  
  /**
   * Get a specific course with its sections and lessons
   */
  getCourse: async (courseId: string) => {
    try {
      // Get course details
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          category,
          level,
          thumbnail_url,
          price,
          duration,
          created_at,
          instructor:instructor_id (
            id,
            full_name,
            avatar_url,
            bio
          )
        `)
        .eq('id', courseId)
        .single();
      
      if (courseError) {
        console.error("Error fetching course:", courseError);
        return null;
      }
      
      // Get course sections
      const { data: sections, error: sectionsError } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseId)
        .order('position', { ascending: true });
      
      if (sectionsError) {
        console.error("Error fetching course sections:", sectionsError);
        return course;
      }
      
      // Get lessons for each section
      const sectionsWithLessons = await Promise.all(sections.map(async (section) => {
        const { data: lessons, error: lessonsError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('section_id', section.id)
          .order('position', { ascending: true });
        
        if (lessonsError) {
          console.error(`Error fetching lessons for section ${section.id}:`, lessonsError);
          return { ...section, lessons: [] };
        }
        
        return { ...section, lessons };
      }));
      
      // Get course reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from('course_reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          student:student_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });
      
      if (reviewsError) {
        console.error("Error fetching course reviews:", reviewsError);
      }
      
      // Calculate average rating
      const avgRating = reviews?.length > 0
        ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
        : null;
      
      return {
        ...course,
        sections: sectionsWithLessons,
        reviews: reviews || [],
        avgRating
      };
    } catch (error) {
      console.error("Error in getCourse:", error);
      return null;
    }
  },
  
  /**
   * Get courses created by an instructor
   */
  getInstructorCourses: async (instructorId: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          category,
          level,
          thumbnail_url,
          price,
          is_published,
          created_at,
          updated_at,
          enrollments:course_enrollments(count)
        `)
        .eq('instructor_id', instructorId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching instructor courses:", error);
        return [];
      }
      
      return data.map(course => ({
        ...course,
        enrollments_count: course.enrollments?.length || 0
      }));
    } catch (error) {
      console.error("Error in getInstructorCourses:", error);
      return [];
    }
  },
  
  /**
   * Enroll a student in a course
   */
  enrollUserInCourse: async (userId: string, courseId: string) => {
    try {
      // Check if already enrolled
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('student_id', userId)
        .eq('course_id', courseId)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking enrollment:", checkError);
        return false;
      }
      
      if (existingEnrollment) {
        // Already enrolled
        return true;
      }
      
      // Create new enrollment
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          student_id: userId,
          course_id: courseId,
          progress: 0,
          last_accessed_at: new Date().toISOString()
        });
        
      if (error) {
        console.error("Error enrolling user:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in enrollUserInCourse:", error);
      return false;
    }
  },
  
  /**
   * Enroll a student in a course
   */
  enrollStudent: async (courseId: string, studentId: string) => {
    try {
      // Check if already enrolled
      const { data: existing, error: checkError } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('course_id', courseId)
        .eq('student_id', studentId)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking enrollment:", checkError);
        return { success: false, message: "Erreur lors de la vérification de l'inscription" };
      }
      
      if (existing) {
        return { success: true, message: "Déjà inscrit à ce cours", enrollmentId: existing.id };
      }
      
      // Create enrollment
      const { data, error } = await supabase
        .from('course_enrollments')
        .insert({
          course_id: courseId,
          student_id: studentId,
          progress: 0,
          completed_lessons: [],
          last_accessed_at: new Date().toISOString()
        })
        .select('id')
        .single();
      
      if (error) {
        console.error("Error enrolling student:", error);
        return { success: false, message: "Erreur lors de l'inscription au cours" };
      }
      
      return { 
        success: true, 
        message: "Inscription au cours réussie", 
        enrollmentId: data.id 
      };
    } catch (error) {
      console.error("Error in enrollStudent:", error);
      return { success: false, message: "Une erreur s'est produite" };
    }
  },
  
  /**
   * Update student progress in a course
   */
  updateProgress: async (enrollmentId: string, progress: number, lastAccessedAt: Date = new Date()) => {
    try {
      const { error } = await supabase
        .from('course_enrollments')
        .update({
          progress,
          last_accessed_at: lastAccessedAt.toISOString()
        })
        .eq('id', enrollmentId);
      
      if (error) {
        console.error("Error updating progress:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in updateProgress:", error);
      return false;
    }
  }
};
