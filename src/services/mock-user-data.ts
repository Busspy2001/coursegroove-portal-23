
import { EnrolledCourse, Achievement, UserStats } from "@/types/user-data";

export const getMockEnrolledCourses = (): EnrolledCourse[] => {
  return [
    {
      id: "enroll1",
      title: "Introduction à la Programmation",
      thumbnail: "https://example.com/programming.jpg",
      instructor: "Jean Dupont",
      progress: 75,
      lastAccessed: new Date(Date.now() - 86400000), // yesterday
    },
    {
      id: "enroll2",
      title: "Marketing Digital pour Débutants",
      thumbnail: "https://example.com/marketing.jpg",
      instructor: "Marie Durand",
      progress: 30,
      lastAccessed: new Date(),
    }
  ];
};

export const getMockAchievements = (): Achievement[] => {
  return [
    {
      name: "Première inscription",
      description: "Vous avez complété votre inscription",
      icon: "🎉",
      unlocked: true,
    },
    {
      name: "Premier cours complété",
      description: "Vous avez terminé votre premier cours",
      icon: "🏆",
      unlocked: true,
    },
    {
      name: "Premier certificat",
      description: "Vous avez obtenu votre premier certificat",
      icon: "📜",
      unlocked: true,
    },
    {
      name: "5 cours complétés",
      description: "Vous avez terminé 5 cours",
      icon: "🔥",
      unlocked: false,
    },
    {
      name: "10 heures d'apprentissage",
      description: "Vous avez passé 10 heures à apprendre",
      icon: "⏱️",
      unlocked: true,
    },
    {
      name: "Participation au forum",
      description: "Vous avez participé aux discussions",
      icon: "💬",
      unlocked: false,
    },
  ];
};

export const calculateUserStats = (enrolledCourses: EnrolledCourse[]): UserStats => {
  return {
    totalCoursesEnrolled: enrolledCourses.length,
    totalCoursesCompleted: enrolledCourses.filter(course => course.progress === 100).length,
    totalHoursLearned: 12.5, // Mock data
    certificatesEarned: enrolledCourses.filter(course => course.progress === 100).length,
    averageProgress: enrolledCourses.length > 0 
      ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
      : 0,
    lastActivityDate: enrolledCourses.length > 0 
      ? new Date(Math.max(...enrolledCourses.map(course => course.lastAccessed.getTime())))
      : null
  };
};
