
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
</lov-code>

Now let's improve the course management system by updating the `useCourses` hook to better handle course filtering, searching, and pagination:

<lov-code>
Let's enhance the useCourses hook:

<lov-write file_path="src/hooks/useCourses.ts">
import { useState, useEffect } from 'react';
import { courseService } from '@/services/course-service';
import { useToast } from '@/hooks/use-toast';

export const useCourses = (options: {
  category?: string;
  instructorId?: string;
  search?: string;
  limit?: number;
  page?: number;
  sort?: 'newest' | 'popularity' | 'rating';
  level?: 'débutant' | 'intermédiaire' | 'avancé';
  price?: 'free' | 'paid' | 'all';
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
        console.log(`Fetched ${courses.length} courses out of ${count} total`);
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
  }, [
    options.category, 
    options.instructorId, 
    options.search, 
    options.limit, 
    options.page, 
    options.sort, 
    options.level, 
    options.price, 
    toast
  ]);
  
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
  
  const enrollInCourse = async (userId: string) => {
    if (!courseId || !userId) return false;
    
    try {
      await courseService.enrollUserInCourse(userId, courseId);
      toast({
        title: "Enrolled successfully",
        description: "You have been enrolled in this course.",
        variant: "success"
      });
      return true;
    } catch (err) {
      console.error("Error enrolling in course:", err);
      toast({
        title: "Enrollment failed",
        description: "We couldn't enroll you in this course. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    course,
    isLoading,
    error,
    refresh,
    enrollInCourse
  };
};
</lov-code>

Let's also enhance the business-related hooks to better support the business administration features:

<lov-code>
Let's update the useBusiness hook:

<lov-write file_path="src/hooks/useBusiness.ts">
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { businessService } from '@/services/business-service';
import { Employee, Department, BusinessStatistics } from '@/services/supabase-business-data';
import { useToast } from '@/hooks/use-toast';

export const useCompany = () => {
  const { currentUser } = useAuth();
  const [company, setCompany] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCompany = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const companyData = await businessService.getCompanyData(currentUser.id);
        setCompany(companyData);
        console.log("Company data fetched:", companyData?.name);
      } catch (err) {
        console.error("Error fetching company:", err);
        setError("Une erreur s'est produite lors du chargement des données de l'entreprise");
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données de votre entreprise.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompany();
  }, [currentUser, toast]);
  
  const refresh = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const companyData = await businessService.getCompanyData(currentUser.id);
      setCompany(companyData);
      toast({
        title: "Données actualisées",
        description: "Les informations de votre entreprise ont été mises à jour.",
      });
    } catch (err) {
      console.error("Error refreshing company:", err);
      setError("Une erreur s'est produite lors de l'actualisation des données de l'entreprise");
      toast({
        title: "Erreur d'actualisation",
        description: "Impossible d'actualiser les données de votre entreprise.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateCompany = async (companyData: Partial<any>) => {
    if (!company || !currentUser) return false;
    
    try {
      await businessService.updateCompany(company.id, companyData);
      setCompany({...company, ...companyData});
      toast({
        title: "Entreprise mise à jour",
        description: "Les informations de votre entreprise ont été mises à jour avec succès.",
        variant: "success"
      });
      return true;
    } catch (err) {
      console.error("Error updating company:", err);
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de mettre à jour les informations de votre entreprise.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    company,
    isLoading,
    error,
    refresh,
    updateCompany
  };
};

export const useBusinessStatistics = (companyId: string) => {
  const [statistics, setStatistics] = useState<BusinessStatistics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchStatistics = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const stats = await businessService.getBusinessStatistics(companyId);
        setStatistics(stats);
      } catch (err) {
        console.error("Error fetching business statistics:", err);
        setError("Une erreur s'est produite lors du chargement des statistiques");
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les statistiques de votre entreprise.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStatistics();
  }, [companyId, toast]);
  
  return {
    statistics,
    isLoading,
    error,
    refresh: async () => {
      if (!companyId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const stats = await businessService.getBusinessStatistics(companyId);
        setStatistics(stats);
        toast({
          title: "Statistiques actualisées",
          description: "Les statistiques de votre entreprise ont été mises à jour.",
        });
      } catch (err) {
        console.error("Error refreshing business statistics:", err);
        setError("Une erreur s'est produite lors de l'actualisation des statistiques");
        toast({
          title: "Erreur d'actualisation",
          description: "Impossible d'actualiser les statistiques de votre entreprise.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
};

export const useEmployees = (companyId: string) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const employeesData = await businessService.getEmployees(companyId);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Une erreur s'est produite lors du chargement des employés");
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger la liste des employés.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, [companyId, toast]);
  
  const addEmployee = async (employeeData: Partial<Employee>) => {
    if (!companyId) return false;
    
    try {
      const success = await businessService.addEmployee(companyId, employeeData);
      if (success) {
        // Refresh employee list
        const updatedEmployees = await businessService.getEmployees(companyId);
        setEmployees(updatedEmployees);
        toast({
          title: "Employé ajouté",
          description: "Le nouvel employé a été ajouté avec succès.",
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding employee:", err);
      toast({
        title: "Erreur d'ajout",
        description: "Impossible d'ajouter le nouvel employé.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const updateEmployee = async (employeeId: string, employeeData: Partial<Employee>) => {
    if (!companyId) return false;
    
    try {
      const success = await businessService.updateEmployee(companyId, employeeId, employeeData);
      if (success) {
        // Update local state
        setEmployees(employees.map(emp => 
          emp.id === employeeId ? {...emp, ...employeeData} : emp
        ));
        toast({
          title: "Employé mis à jour",
          description: "Les informations de l'employé ont été mises à jour avec succès.",
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating employee:", err);
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de mettre à jour les informations de l'employé.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const removeEmployee = async (employeeId: string, employeeName: string) => {
    if (!companyId) return false;
    
    try {
      const success = await businessService.removeEmployee(companyId, employeeId, employeeName);
      if (success) {
        // Update local state
        setEmployees(employees.filter(emp => emp.id !== employeeId));
        toast({
          title: "Employé supprimé",
          description: `${employeeName} a été retiré de votre entreprise.`,
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing employee:", err);
      toast({
        title: "Erreur de suppression",
        description: `Impossible de supprimer ${employeeName} de votre entreprise.`,
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    employees,
    isLoading,
    error,
    refresh: async () => {
      if (!companyId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const employeesData = await businessService.getEmployees(companyId);
        setEmployees(employeesData);
        toast({
          title: "Liste actualisée",
          description: "La liste des employés a été mise à jour.",
        });
      } catch (err) {
        console.error("Error refreshing employees:", err);
        setError("Une erreur s'est produite lors de l'actualisation des employés");
        toast({
          title: "Erreur d'actualisation",
          description: "Impossible d'actualiser la liste des employés.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    },
    addEmployee,
    updateEmployee,
    removeEmployee
  };
};

export const useDepartments = (companyId: string) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const departmentsData = await businessService.getDepartments(companyId);
        setDepartments(departmentsData);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Une erreur s'est produite lors du chargement des départements");
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les départements.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDepartments();
  }, [companyId, toast]);
  
  const addDepartment = async (departmentData: Partial<Department>) => {
    if (!companyId) return false;
    
    try {
      const success = await businessService.createDepartment(companyId, departmentData);
      if (success) {
        // Refresh department list
        const updatedDepartments = await businessService.getDepartments(companyId);
        setDepartments(updatedDepartments);
        toast({
          title: "Département ajouté",
          description: "Le nouveau département a été créé avec succès.",
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding department:", err);
      toast({
        title: "Erreur d'ajout",
        description: "Impossible de créer le nouveau département.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const updateDepartment = async (departmentId: string, departmentData: Partial<Department>) => {
    try {
      const success = await businessService.updateDepartment(departmentId, departmentData);
      if (success) {
        // Update local state
        setDepartments(departments.map(dep => 
          dep.id === departmentId ? {...dep, ...departmentData} : dep
        ));
        toast({
          title: "Département mis à jour",
          description: "Les informations du département ont été mises à jour avec succès.",
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating department:", err);
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de mettre à jour le département.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const removeDepartment = async (departmentId: string, departmentName: string) => {
    try {
      const success = await businessService.deleteDepartment(departmentId, departmentName);
      if (success) {
        // Update local state
        setDepartments(departments.filter(dep => dep.id !== departmentId));
        toast({
          title: "Département supprimé",
          description: `Le département ${departmentName} a été supprimé avec succès.`,
          variant: "success"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing department:", err);
      toast({
        title: "Erreur de suppression",
        description: `Impossible de supprimer le département ${departmentName}.`,
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    departments,
    isLoading,
    error,
    refresh: async () => {
      if (!companyId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const departmentsData = await businessService.getDepartments(companyId);
        setDepartments(departmentsData);
        toast({
          title: "Liste actualisée",
          description: "La liste des départements a été mise à jour.",
        });
      } catch (err) {
        console.error("Error refreshing departments:", err);
        setError("Une erreur s'est produite lors de l'actualisation des départements");
        toast({
          title: "Erreur d'actualisation",
          description: "Impossible d'actualiser la liste des départements.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    },
    addDepartment,
    updateDepartment,
    removeDepartment
  };
};
</lov-code>

Finally, let's enhance the user registration process to properly handle role assignments:

<lov-code>
Let's update the registration form hook to ensure proper role assignment:

<lov-write file_path="src/components/auth/register/useRegisterForm.ts">
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ProfileType = "student" | "instructor" | "business" | "employee";

export const useRegisterForm = (profileType: ProfileType = "student") => {
  const { register, isLoggingIn } = useAuth();
  const { toast } = useToast();
  
  // Form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  
  // Additional fields based on profile type
  const [company, setCompany] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  
  // Form state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  
  // Computed values
  const isPasswordMatch = password === confirmPassword;
  
  // Form validation
  const isFormValid = () => {
    // Basic validation for all profile types
    if (!name || !email || !password || !confirmPassword || !isPasswordMatch || !acceptTerms) {
      return false;
    }
    
    // Additional validation based on profile type
    if (profileType === "business" && !company) {
      return false;
    }
    
    if (profileType === "employee" && (!company || !jobTitle)) {
      return false;
    }
    
    if (profileType === "instructor" && !specialization) {
      return false;
    }
    
    return true;
  };
  
  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }
    
    if (!isPasswordMatch) {
      toast({
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log(`Starting registration for ${email} as ${profileType}`);
      
      // Prepare user metadata based on profile type
      const userMetadata: Record<string, any> = {
        name,
        full_name: name,
        profileType
      };
      
      if (profileType === "business" || profileType === "employee") {
        userMetadata.company = company;
      }
      
      if (profileType === "employee") {
        userMetadata.jobTitle = jobTitle;
      }
      
      if (profileType === "instructor") {
        userMetadata.specialization = specialization;
        if (bio) userMetadata.bio = bio;
      }
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: window.location.origin + '/auth-redirect'
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Additional role assignment based on profile type
        if (profileType === "instructor") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'instructor'
            });
          } catch (roleError) {
            console.error("Error assigning instructor role:", roleError);
            // Continue despite role assignment error
          }
        } else if (profileType === "business") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'business_admin'
            });
          } catch (roleError) {
            console.error("Error assigning business admin role:", roleError);
          }
        } else if (profileType === "employee") {
          try {
            await supabase.from('user_roles').insert({
              user_id: data.user.id,
              role: 'employee'
            });
          } catch (roleError) {
            console.error("Error assigning employee role:", roleError);
          }
        }
        
        // If the user is a business admin, create a company record
        if (profileType === "business" && company) {
          try {
            const { error: companyError } = await supabase
              .from('companies')
              .insert({
                name: company,
                admin_id: data.user.id
              });
              
            if (companyError) {
              console.error("Error creating company:", companyError);
            }
          } catch (companyError) {
            console.error("Error creating company:", companyError);
          }
        }
        
        setRegistrationSuccess(true);
        
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
          variant: "success"
        });
        
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        setCompany("");
        setJobTitle("");
        setSpecialization("");
        setBio("");
      }
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    acceptTerms,
    setAcceptTerms,
    company,
    setCompany,
    jobTitle,
    setJobTitle,
    specialization,
    setSpecialization,
    bio,
    setBio,
    isLoading: isLoading || isLoggingIn,
    isPasswordMatch,
    registrationSuccess,
    handleRegister,
    isFormValid: isFormValid()
  };
};
</lov-code>

Now let's update the PrivateRoute component to ensure proper role-based access control:

<lov-code>
Let's update the PrivateRoute component for better role-based protection:

<lov-write file_path="src/components/core/PrivateRoute.tsx">
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { isLogoutActive } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/contexts/auth/types";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  allowMultiple?: boolean;  // Allow access if the user has any of the required roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredRoles = [],
  allowMultiple = true 
}) => {
  const { currentUser, isAuthenticated, isLoading, authStateReady, hasRole } = useAuth();
  const location = useLocation();

  // Show loading screen while auth state is not ready
  if (isLoading || !authStateReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
          <div className="text-lg font-medium">Vérification de l'authentification...</div>
        </div>
      </div>
    );
  }

  // Check if the user is logged out
  if (isLogoutActive) {
    console.log("🚫 PrivateRoute: Accès à une route protégée avec déconnexion active");
    return <Navigate to="/login?logout=true" replace />;
  }

  // Check if the user is authenticated
  if (!isAuthenticated || !currentUser) {
    console.log("🚫 PrivateRoute: Utilisateur non authentifié, redirection vers /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Detect demo accounts based on email or specific flag
  const isDemoInstructor = currentUser.is_demo && 
    currentUser.email?.toLowerCase().includes('prof');
  
  const isDemoAdmin = currentUser.is_demo && 
    currentUser.email?.toLowerCase().includes('admin');
  
  // Special handling for demo accounts
  if (requiredRoles.includes('instructor') && isDemoInstructor) {
    return <>{children}</>;
  }
  
  if ((requiredRoles.includes('admin') || requiredRoles.includes('super_admin')) && isDemoAdmin) {
    return <>{children}</>;
  }

  // Check if the user has the required role(s)
  if (requiredRoles.length > 0) {
    const hasRequiredRole = allowMultiple 
      ? requiredRoles.some(role => hasRole(role))  // Any role matches
      : requiredRoles.every(role => hasRole(role)); // All roles match
    
    if (!hasRequiredRole) {
      console.log("🚫 PrivateRoute: Utilisateur n'a pas les rôles requis");
      console.log(`Required: ${requiredRoles.join(', ')}, User has: ${currentUser.roles?.join(', ') || 'none'}`);
      
      // Redirect to the appropriate dashboard based on user role
      if (hasRole('instructor') || isDemoInstructor) {
        return <Navigate to="/instructor" replace />;
      } else if (hasRole('admin') || hasRole('super_admin')) {
        return <Navigate to="/admin" replace />;
      } else if (hasRole('business_admin')) {
        return <Navigate to="/entreprise" replace />;
      } else if (hasRole('employee')) {
        return <Navigate to="/employe" replace />;
      } else {
        return <Navigate to="/student" replace />;
      }
    }
  }

  // If everything is fine, display the protected content
  return <>{children}</>;
};

export default PrivateRoute;
