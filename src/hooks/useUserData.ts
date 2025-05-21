
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { userService } from '@/services/user-service';
import { EnrolledCourse, Achievement, UserStats } from '@/types/user-data';
import { useToast } from '@/hooks/use-toast';

export const useUserData = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
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
        console.log("Fetching user data for:", currentUser.id);
        
        // Fetch user enrolled courses
        const courses = await userService.getEnrolledCourses(currentUser.id);
        setEnrolledCourses(courses);
        
        // Fetch user achievements
        const userAchievements = await userService.getAchievements(currentUser.id);
        setAchievements(userAchievements);
        
        // Calculate user stats
        const stats = await userService.calculateStats(currentUser.id);
        setUserStats(stats);
        
        console.log("User data fetched successfully:", {
          coursesCount: courses.length,
          achievementsCount: userAchievements.length
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while loading your data");
        toast({
          title: "Error loading data",
          description: "We couldn't load your course data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser, isAuthenticated, toast]);
  
  const refreshData = async () => {
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
      
      toast({
        title: "Data refreshed",
        description: "Your course data has been updated.",
      });
    } catch (err) {
      console.error("Error refreshing user data:", err);
      setError("An error occurred while refreshing your data");
      toast({
        title: "Error refreshing data",
        description: "We couldn't refresh your course data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const trackProgress = async (courseId: string, lessonId: string, completed: boolean) => {
    if (!currentUser) return;
    
    try {
      // Update progress in the database
      await userService.updateLessonProgress(currentUser.id, courseId, lessonId, completed);
      
      // Refresh the enrolled courses to get updated progress
      const courses = await userService.getEnrolledCourses(currentUser.id);
      setEnrolledCourses(courses);
      
      // Check for new achievements
      const updatedAchievements = await userService.getAchievements(currentUser.id);
      
      // If there are new achievements, show a toast
      if (updatedAchievements.length > achievements.length) {
        const newAchievements = updatedAchievements.filter(
          newAch => !achievements.some(ach => ach.name === newAch.name)
        );
        
        if (newAchievements.length > 0) {
          toast({
            title: "New Achievement Unlocked!",
            description: `Congratulations! You've earned: ${newAchievements[0].name}`,
            variant: "success"
          });
        }
        
        setAchievements(updatedAchievements);
      }
      
      // Recalculate stats
      const stats = await userService.calculateStats(currentUser.id);
      setUserStats(stats);
      
      return true;
    } catch (err) {
      console.error("Error tracking progress:", err);
      toast({
        title: "Error saving progress",
        description: "We couldn't save your progress. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    enrolledCourses,
    achievements,
    userStats,
    isLoading,
    error,
    refreshData,
    trackProgress
  };
};
