
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

interface Instructor {
  id: string;
  full_name: string;
  avatar_url?: string;
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
      // Mock data for development until Supabase tables are created
      const mockCourse: Course = {
        id,
        title: "Introduction to Programming",
        description: "Learn the basics of programming with this comprehensive course",
        instructor_id: "123",
        instructor_name: "John Doe",
        category: "Programming",
        level: "débutant",
        price: 49.99,
        thumbnail_url: "https://example.com/thumbnail.jpg",
        duration: "10 hours",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        total_students: 120,
        average_rating: 4.7,
        total_reviews: 45
      };

      const mockSections: CourseSection[] = [
        {
          id: "section1",
          course_id: id,
          title: "Getting Started",
          position: 1,
          duration: "2 hours",
          lessons: [
            {
              id: "lesson1",
              section_id: "section1",
              title: "Introduction to the Course",
              type: "video",
              content_url: "https://example.com/video1.mp4",
              duration: "10 min",
              position: 1,
              is_preview: true
            },
            {
              id: "lesson2",
              section_id: "section1",
              title: "Setting Up Your Environment",
              type: "document",
              content_url: "https://example.com/doc1.pdf",
              duration: "15 min",
              position: 2,
              is_preview: false
            }
          ]
        },
        {
          id: "section2",
          course_id: id,
          title: "Basic Concepts",
          position: 2,
          duration: "3 hours",
          lessons: [
            {
              id: "lesson3",
              section_id: "section2",
              title: "Variables and Data Types",
              type: "video",
              content_url: "https://example.com/video2.mp4",
              duration: "20 min",
              position: 1,
              is_preview: false
            }
          ]
        }
      ];

      const mockReviews = [
        {
          id: "review1",
          course_id: id,
          user_id: "user1",
          rating: 5,
          comment: "Excellent course, very informative!",
          created_at: new Date().toISOString(),
          reviewer_name: "Jane Smith",
          reviewer_avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D9488&color=fff"
        },
        {
          id: "review2",
          course_id: id,
          user_id: "user2",
          rating: 4,
          comment: "Great content, but could use more examples.",
          created_at: new Date().toISOString(),
          reviewer_name: "Mike Johnson",
          reviewer_avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=0D9488&color=fff"
        }
      ];

      setCourse(mockCourse);
      setSections(mockSections);
      setReviews(mockReviews);

      // Once the Supabase tables are created, use the commented code below:
      /*
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (courseError) throw courseError;

      // Fetch instructor details
      const { data: instructorData, error: instructorError } = await supabase
        .from('profiles_unified')
        .select('full_name, avatar_url')
        .eq('id', courseData.instructor_id)
        .single();

      if (instructorError) throw instructorError;

      // Fetch course sections and lessons
      const { data: sectionData, error: sectionError } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', id)
        .order('position', { ascending: true });

      if (sectionError) throw sectionError;

      for (const section of sectionData) {
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('section_id', section.id)
          .order('position', { ascending: true });
        
        if (lessonsError) throw lessonsError;
        section.lessons = lessonsData;
      }

      // Fetch course reviews
      const { data: reviewData, error: reviewError } = await supabase
        .from('course_reviews')
        .select('*')
        .eq('course_id', id)
        .order('created_at', { ascending: false });

      if (reviewError) throw reviewError;

      // Add reviewer information to reviews
      const enhancedReviews = [];
      for (const review of reviewData) {
        const { data: reviewerData, error: reviewerError } = await supabase
          .from('profiles_unified')
          .select('full_name, avatar_url')
          .eq('id', review.user_id)
          .single();
        
        if (!reviewerError && reviewerData) {
          enhancedReviews.push({
            ...review,
            reviewer_name: reviewerData.full_name || 'Anonymous',
            reviewer_avatar: reviewerData.avatar_url
          });
        }
      }

      // Calculate total students
      const { count: studentCount, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .select('id', { count: 'exact', head: true })
        .eq('course_id', id);

      if (enrollmentError) throw enrollmentError;

      // Calculate average rating
      const avgRating = reviewData.length > 0 
        ? reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewData.length
        : 0;
      
      // Process the course data
      const processedCourse = {
        ...courseData,
        instructor_name: instructorData?.full_name || 'Unknown Instructor',
        instructor_avatar: instructorData?.avatar_url,
        total_students: studentCount || 0,
        average_rating: avgRating,
        total_reviews: reviewData.length
      };
      
      setCourse(processedCourse);
      setSections(sectionData);
      setReviews(enhancedReviews);
      */

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
      // Mock data for development until Supabase tables are created
      const mockCourses: Course[] = [
        {
          id: "course1",
          title: "Introduction to Programming",
          description: "Learn the basics of programming with this comprehensive course",
          instructor_id: "123",
          instructor_name: "John Doe",
          category: "Programming",
          level: "débutant",
          price: 49.99,
          thumbnail_url: "https://example.com/thumbnail1.jpg",
          duration: "10 hours",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          total_students: 120,
          average_rating: 4.7,
          total_reviews: 45
        },
        {
          id: "course2",
          title: "Advanced Web Development",
          description: "Master modern web development techniques",
          instructor_id: "456",
          instructor_name: "Jane Smith",
          category: "Web Development",
          level: "avancé",
          price: 79.99,
          thumbnail_url: "https://example.com/thumbnail2.jpg",
          duration: "15 hours",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          total_students: 85,
          average_rating: 4.5,
          total_reviews: 32
        },
        {
          id: "course3",
          title: "Digital Marketing Fundamentals",
          description: "Learn the essentials of digital marketing",
          instructor_id: "789",
          instructor_name: "Alex Brown",
          category: "Marketing",
          level: "intermédiaire",
          price: 59.99,
          thumbnail_url: "https://example.com/thumbnail3.jpg",
          duration: "12 hours",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          total_students: 150,
          average_rating: 4.8,
          total_reviews: 60
        }
      ];
      
      setCourses(mockCourses);
      setTotalCourses(mockCourses.length);

      // Once the Supabase tables are created, use the commented code below:
      /*
      let query = supabase.from('courses').select('*', { count: 'exact' });
      
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
      
      // Enhance course data with additional information
      const enhancedCourses = [];
      for (const course of data) {
        // Get instructor information
        const { data: instructorData, error: instructorError } = await supabase
          .from('profiles_unified')
          .select('full_name, avatar_url')
          .eq('id', course.instructor_id)
          .single();
        
        // Get student count
        const { count: studentCount, error: countError } = await supabase
          .from('course_enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        // Get ratings
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('course_reviews')
          .select('rating')
          .eq('course_id', course.id);
        
        // Calculate average rating
        const ratings = reviewsData || [];
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length
          : 0;
        
        enhancedCourses.push({
          ...course,
          instructor_name: instructorData?.full_name || 'Unknown Instructor',
          instructor_avatar: instructorData?.avatar_url,
          total_students: studentCount || 0,
          average_rating: averageRating,
          total_reviews: ratings.length || 0
        });
      }
      
      setCourses(enhancedCourses);
      if (count !== null) setTotalCourses(count);
      */
      
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
