
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  monthlyRevenue: number;
  averageRating: number;
  studentsTrend: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  status: "published" | "draft";
  price: number;
  total_students: number;
  rating: number;
  progress: number;
  thumbnail: string;
}

export interface UseInstructorDataReturn {
  loading: boolean;
  stats: InstructorStats;
  courses: InstructorCourse[];
  refetch: () => void;
}

export function useInstructorData(): UseInstructorDataReturn {
  const [loading, setLoading] = useState(true);
  const { currentUser, hasRole } = useAuth();
  const [stats, setStats] = useState<InstructorStats>({
    totalCourses: 5,
    totalStudents: 457,
    monthlyRevenue: 2850,
    averageRating: 4.8,
    studentsTrend: 12
  });
  const [courses, setCourses] = useState<InstructorCourse[]>([
    {
      id: "1",
      title: "JavaScript Moderne: ES6+ et au-delà",
      status: "published",
      price: 49.99,
      total_students: 234,
      rating: 4.9,
      progress: 100,
      thumbnail: "/images/courses/js.jpg"
    },
    {
      id: "2",
      title: "React pour les débutants",
      status: "published",
      price: 59.99,
      total_students: 187,
      rating: 4.8,
      progress: 100,
      thumbnail: "/images/courses/react.jpg"
    },
    {
      id: "3",
      title: "Fondamentaux du développement web",
      status: "published",
      price: 29.99,
      total_students: 315,
      rating: 4.7,
      progress: 100,
      thumbnail: "/images/courses/webdev.jpg"
    },
    {
      id: "4",
      title: "Python pour la data science",
      status: "published",
      price: 69.99,
      total_students: 143,
      rating: 4.8,
      progress: 100,
      thumbnail: "/images/courses/python.jpg"
    },
    {
      id: "5",
      title: "Introduction au Machine Learning",
      status: "draft",
      price: 79.99,
      total_students: 0,
      rating: 0,
      progress: 67,
      thumbnail: "/images/courses/ml.jpg"
    }
  ]);

  useEffect(() => {
    if (hasRole("instructor")) {
      // Simulate API call to fetch instructor dashboard data
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [currentUser, hasRole]);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    loading,
    stats,
    courses,
    refetch
  };
}
