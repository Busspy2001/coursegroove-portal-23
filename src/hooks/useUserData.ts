
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { userService } from '@/services/user-service';
import { EnrolledCourse, Achievement, UserStats } from '@/types/user-data';

export const useUserData = () => {
  const { currentUser, isAuthenticated } = useAuth();
  
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch user data when the user is authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !currentUser) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch user enrolled courses
        const courses = await userService.getEnrolledCourses(currentUser.id);
        setEnrolledCourses(courses);
        
        // Fetch user achievements
        const userAchievements = await userService.getAchievements(currentUser.id);
        setAchievements(userAchievements);
        
        // Calculate user stats
        const stats = await userService.calculateStats(currentUser.id);
        setUserStats(stats);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Une erreur s'est produite lors du chargement de vos données");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser, isAuthenticated]);
  
  return {
    enrolledCourses,
    achievements,
    userStats,
    isLoading,
    error,
    refreshData: async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch user enrolled courses
        const courses = await userService.getEnrolledCourses(currentUser.id);
        setEnrolledCourses(courses);
        
        // Fetch user achievements
        const userAchievements = await userService.getAchievements(currentUser.id);
        setAchievements(userAchievements);
        
        // Calculate user stats
        const stats = await userService.calculateStats(currentUser.id);
        setUserStats(stats);
      } catch (err) {
        console.error("Error refreshing user data:", err);
        setError("Une erreur s'est produite lors de l'actualisation de vos données");
      } finally {
        setIsLoading(false);
      }
    }
  };
};
