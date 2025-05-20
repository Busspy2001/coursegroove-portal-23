
import { supabase } from '@/integrations/supabase/client';
import { Employee, Department, BusinessStatistics } from '@/services/supabase-business-data';

/**
 * Service for managing business data
 */
export const businessService = {
  /**
   * Get company data for the current user
   */
  getCompanyData: async (userId: string) => {
    try {
      // First check if the user has a company_id in their profile
      const { data: userData, error: userError } = await supabase
        .from('profiles_unified')
        .select('company_id')
        .eq('id', userId)
        .single();
        
      if (userError) {
        console.error("Error fetching user profile:", userError);
        return null;
      }
      
      let companyId = userData?.company_id;
      
      // If no company_id found, check if user is admin of any company
      if (!companyId) {
        const { data: adminCompany, error: adminError } = await supabase
          .from('companies')
          .select('id')
          .eq('admin_id', userId)
          .maybeSingle();
          
        if (adminError) {
          console.error("Error fetching admin company:", adminError);
          return null;
        }
        
        companyId = adminCompany?.id;
      }
      
      if (!companyId) {
        return null;
      }
      
      // Get company details
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();
        
      if (companyError) {
        console.error("Error fetching company:", companyError);
        return null;
      }
      
      return company;
    } catch (error) {
      console.error("Error in getCompanyData:", error);
      return null;
    }
  },
  
  /**
   * Get company statistics
   */
  getBusinessStatistics: async (companyId: string): Promise<BusinessStatistics | null> => {
    try {
      // Count employees
      const { count: employeeCount, error: empError } = await supabase
        .from('company_employees')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
        
      if (empError) {
        console.error("Error counting employees:", empError);
        return null;
      }
      
      // Count departments
      const { count: deptCount, error: deptError } = await supabase
        .from('company_departments')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
        
      if (deptError) {
        console.error("Error counting departments:", deptError);
        return null;
      }
      
      // Get assignments count
      const { count: assignmentsCount, error: assignError } = await supabase
        .from('course_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
        
      if (assignError) {
        console.error("Error counting assignments:", assignError);
        return null;
      }
      
      // Calculate completion rate
      const { data: completedAssignments, error: completedError } = await supabase
        .from('course_assignments')
        .select('*', { count: 'exact' })
        .eq('company_id', companyId)
        .eq('completed', true);
        
      if (completedError) {
        console.error("Error counting completed assignments:", completedError);
        return null;
      }
      
      const completionRate = assignmentsCount > 0
        ? Math.round((completedAssignments.length / assignmentsCount) * 100)
        : 0;
      
      // Get recent activities (mock for now, to be implemented)
      const recentActivities = [
        {
          type: "Nouveau",
          message: "L'employé Jean Dupont a rejoint l'équipe Marketing",
          date: "Il y a 2 heures"
        },
        {
          type: "Complétion",
          message: "Marie Martin a terminé sa formation sur Excel",
          date: "Il y a 1 jour"
        },
        {
          type: "Assignation",
          message: "Formation 'Leadership' assignée au département RH",
          date: "Il y a 3 jours"
        }
      ];
      
      return {
        total_employees: employeeCount || 0,
        departments_count: deptCount || 0,
        active_courses: assignmentsCount || 0,
        completion_rate: completionRate,
        recent_activities: recentActivities
      };
    } catch (error) {
      console.error("Error in getBusinessStatistics:", error);
      return null;
    }
  },
  
  /**
   * Get employees for a company
   */
  getEmployees: async (companyId: string): Promise<Employee[]> => {
    try {
      const { data, error } = await supabase
        .from('company_employees')
        .select(`
          id,
          employee_id,
          job_title,
          department_id,
          status,
          joined_at,
          profiles_unified:employee_id (
            id,
            full_name,
            email,
            avatar_url
          ),
          company_departments:department_id (
            id,
            name
          )
        `)
        .eq('company_id', companyId);
        
      if (error) {
        console.error("Error fetching employees:", error);
        return [];
      }
      
      return data.map(item => ({
        id: item.employee_id,
        full_name: item.profiles_unified?.full_name,
        email: item.profiles_unified?.email,
        avatar_url: item.profiles_unified?.avatar_url,
        department_id: item.department_id,
        department_name: item.company_departments?.name,
        job_title: item.job_title,
        status: (item.status === 'active' || item.status === 'inactive') ? item.status : 'inactive',
        hire_date: item.joined_at,
      }));
    } catch (error) {
      console.error("Error in getEmployees:", error);
      return [];
    }
  },
  
  /**
   * Get departments for a company
   */
  getDepartments: async (companyId: string): Promise<Department[]> => {
    try {
      const { data, error } = await supabase
        .from('company_departments')
        .select(`
          id,
          name,
          description,
          company_id,
          manager_id,
          created_at,
          manager:manager_id (
            id,
            full_name
          )
        `)
        .eq('company_id', companyId);
        
      if (error) {
        console.error("Error fetching departments:", error);
        return [];
      }
      
      return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        company_id: item.company_id,
        manager_id: item.manager_id,
        manager_name: item.manager?.full_name || 'Non assigné',
        created_at: item.created_at,
      }));
    } catch (error) {
      console.error("Error in getDepartments:", error);
      return [];
    }
  },
  
  /**
   * Get course assignments for a company
   */
  getCourseAssignments: async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from('course_assignments')
        .select(`
          id,
          employee_id,
          course_id,
          assigned_by,
          due_date,
          completed,
          completed_at,
          department_id,
          created_at,
          employee:employee_id (
            id,
            full_name,
            avatar_url
          ),
          course:course_id (
            id,
            title,
            thumbnail_url,
            duration
          ),
          department:department_id (
            id,
            name
          ),
          assigner:assigned_by (
            id,
            full_name
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching course assignments:", error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("Error in getCourseAssignments:", error);
      return [];
    }
  }
};
