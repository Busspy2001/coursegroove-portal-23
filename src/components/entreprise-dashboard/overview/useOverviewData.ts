
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";

export interface OverviewStats {
  total_employees: number;
  active_courses: number;
  departments_count: number;
  completion_rate: number;
  recent_activities: Array<{
    id: string;
    type: string;
    message: string;
    date: string;
  }>;
  upcoming_trainings: Array<{
    id: string;
    title: string;
    date: string;
    assignees: number;
  }>;
  top_performers: Array<{
    id: string;
    name: string;
    department: string;
    completion: number;
    courses_completed: number;
  }>;
}

export const useOverviewData = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<OverviewStats | null>(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // Fetch company ID for the current user
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('id')
          .eq('admin_id', currentUser.id)
          .single();
          
        if (companyError) throw companyError;
        
        if (!companyData) {
          // Create demo data if the user doesn't have a company
          return createDemoData();
        }
        
        const companyId = companyData.id;
        
        // Fetch employees count
        const { count: employeesCount, error: employeesError } = await supabase
          .from('company_employees')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', companyId);
          
        if (employeesError) throw employeesError;
        
        // Fetch active courses count
        const { count: coursesCount, error: coursesError } = await supabase
          .from('company_courses')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', companyId);
          
        if (coursesError) throw coursesError;
        
        // Fetch departments count
        const { count: departmentsCount, error: departmentsError } = await supabase
          .from('company_departments')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', companyId);
          
        if (departmentsError) throw departmentsError;
        
        // Fetch course assignments for completion rate
        const { data: assignments, error: assignmentsError } = await supabase
          .from('course_assignments')
          .select('completed')
          .eq('company_id', companyId);
          
        if (assignmentsError) throw assignmentsError;
        
        const completedAssignments = assignments?.filter(a => a.completed).length || 0;
        const totalAssignments = assignments?.length || 1; // Prevent division by zero
        const completionRate = Math.round((completedAssignments / totalAssignments) * 100);
        
        // Real data for overview stats
        setStats({
          total_employees: employeesCount || 0,
          active_courses: coursesCount || 0,
          departments_count: departmentsCount || 0,
          completion_rate: completionRate,
          recent_activities: generateRecentActivities(),
          upcoming_trainings: generateUpcomingTrainings(),
          top_performers: generateTopPerformers()
        });
        
      } catch (err: any) {
        console.error("Error fetching overview data:", err);
        setError(err.message);
        createDemoData(); // Fallback to demo data
      } finally {
        setLoading(false);
      }
    };
    
    const createDemoData = () => {
      // Demo data for overview stats
      setStats({
        total_employees: 124,
        active_courses: 32,
        departments_count: 8,
        completion_rate: 78,
        recent_activities: generateRecentActivities(),
        upcoming_trainings: generateUpcomingTrainings(),
        top_performers: generateTopPerformers()
      });
    };
    
    const generateRecentActivities = () => [
      {
        id: '1',
        type: 'course_completion',
        message: 'Sophie Martin a terminé "Introduction à la cybersécurité"',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        id: '2',
        type: 'user_registration',
        message: 'Thomas Dubois a rejoint l\'équipe IT',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
      },
      {
        id: '3',
        type: 'course_enrollment',
        message: 'Julie Leclerc s\'est inscrite à "Leadership et management d\'équipe"',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8 hours ago
      },
      {
        id: '4',
        type: 'course_completion',
        message: 'Antoine Bernard a obtenu la certification "Excel avancé"',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];
    
    const generateUpcomingTrainings = () => [
      {
        id: '1',
        title: 'Cybersécurité - Niveau intermédiaire',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // in 2 days
        assignees: 15
      },
      {
        id: '2',
        title: 'Leadership et gestion de conflits',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // in 5 days
        assignees: 8
      },
      {
        id: '3',
        title: 'Analyse de données avec Power BI',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // in 7 days
        assignees: 12
      }
    ];
    
    const generateTopPerformers = () => [
      {
        id: '1',
        name: 'Sophie Martin',
        department: 'Marketing',
        completion: 95,
        courses_completed: 12
      },
      {
        id: '2',
        name: 'Thomas Dubois',
        department: 'IT',
        completion: 92,
        courses_completed: 15
      },
      {
        id: '3',
        name: 'Julie Leclerc',
        department: 'Finance',
        completion: 88,
        courses_completed: 10
      },
      {
        id: '4',
        name: 'Antoine Bernard',
        department: 'RH',
        completion: 85,
        courses_completed: 9
      }
    ];
    
    fetchOverviewData();
  }, [currentUser]);

  return { loading, error, stats };
};
