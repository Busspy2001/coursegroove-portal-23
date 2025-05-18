
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import { UserRole } from '@/contexts/auth/types';

// Define types
export interface Company {
  id: string;
  name: string;
  admin_id: string;
  created_at?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  company_id: string;
  manager_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  department_id?: string;
  department_name?: string;
  job_title?: string;
  status?: string;
}

export interface RecentActivity {
  type: string;
  message: string;
  date: string;
}

export interface BusinessStatistics {
  total_employees: number;
  departments_count: number;
  active_courses: number;
  completion_rate: number;
  recent_activities?: RecentActivity[];
}

// Fetch company data for the current user
export const fetchCompanyData = async (): Promise<Company | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // First, check if user is company admin
    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('admin_id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which just means user is not a company admin
      console.error('Error fetching company data:', error);
      throw error;
    }
    
    if (company) {
      return company;
    }
    
    // If not a company admin, check if user is an employee
    const { data: employeeRelation, error: employeeError } = await supabase
      .from('company_employees')
      .select('company_id')
      .eq('employee_id', user.id)
      .single();
      
    if (employeeError && employeeError.code !== 'PGRST116') {
      console.error('Error checking if user is an employee:', employeeError);
      throw employeeError;
    }
    
    if (employeeRelation) {
      const { data: employeeCompany, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', employeeRelation.company_id)
        .single();
        
      if (companyError) {
        console.error('Error fetching company as employee:', companyError);
        throw companyError;
      }
      
      return employeeCompany;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch company data:', error);
    throw error;
  }
};

// Fetch business statistics
export const fetchBusinessStatistics = async (companyId: string): Promise<BusinessStatistics> => {
  try {
    // Get total employees count
    const { count: totalEmployees, error: employeesError } = await supabase
      .from('company_employees')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
      
    if (employeesError) {
      throw employeesError;
    }
    
    // Get departments count
    const { count: departmentsCount, error: departmentsError } = await supabase
      .from('company_departments')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
      
    if (departmentsError) {
      throw departmentsError;
    }
    
    // Get active courses count
    const { count: activeCourses, error: coursesError } = await supabase
      .from('company_courses')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
      
    if (coursesError) {
      throw coursesError;
    }
    
    // Calculate completion rate
    const { data: assignments, error: assignmentsError } = await supabase
      .from('course_assignments')
      .select('completed')
      .eq('company_id', companyId);
      
    if (assignmentsError) {
      throw assignmentsError;
    }
    
    let completionRate = 0;
    
    if (assignments && assignments.length > 0) {
      const completed = assignments.filter(a => a.completed).length;
      completionRate = Math.round((completed / assignments.length) * 100);
    }
    
    // Get recent activities (mock data for now)
    // In a real implementation, you'd query a dedicated activities table
    const recentActivities: RecentActivity[] = [
      {
        type: "Assignation",
        message: "Formation 'Sécurité informatique' assignée à 5 employés",
        date: "Il y a 2 heures"
      },
      {
        type: "Complétion",
        message: "Thomas Dubois a complété 'Leadership et gestion d'équipe'",
        date: "Il y a 3 heures"
      },
      {
        type: "Nouveau",
        message: "Nouvelle formation 'Excel avancé' ajoutée au catalogue",
        date: "Il y a 5 heures"
      }
    ];
    
    return {
      total_employees: totalEmployees || 0,
      departments_count: departmentsCount || 0,
      active_courses: activeCourses || 0,
      completion_rate: completionRate,
      recent_activities: recentActivities
    };
  } catch (error) {
    console.error('Failed to fetch business statistics:', error);
    throw error;
  }
};

// Fetch departments
export const fetchDepartments = async (companyId: string): Promise<Department[]> => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .select('*')
      .eq('company_id', companyId);
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    throw error;
  }
};

// Fetch employees
export const fetchEmployees = async (companyId: string): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from('company_employees')
      .select(`
        employee_id,
        job_title,
        status,
        profiles_unified!employee_id (
          id,
          full_name,
          email,
          avatar_url,
          role
        ),
        company_departments!department_id (
          id,
          name
        )
      `)
      .eq('company_id', companyId);
      
    if (error) {
      throw error;
    }
    
    // Map the joined data to our Employee interface
    const employees: Employee[] = data?.map(item => ({
      id: item.profiles_unified.id,
      full_name: item.profiles_unified.full_name,
      email: item.profiles_unified.email,
      avatar_url: item.profiles_unified.avatar_url,
      role: item.profiles_unified.role,
      job_title: item.job_title,
      status: item.status,
      department_id: item.company_departments?.id,
      department_name: item.company_departments?.name
    })) || [];
    
    return employees;
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    throw error;
  }
};

// Create a department
export const createDepartment = async (department: Omit<Department, 'id' | 'created_at' | 'updated_at'>): Promise<Department> => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .insert(department)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to create department:', error);
    throw error;
  }
};

// Bulk add employees
export const addEmployees = async (employees: Array<{
  full_name: string; 
  email: string; 
  role: UserRole;
  company_id: string;
  id: string; // Ensure id is included
}>): Promise<void> => {
  try {
    // Insert into profiles_unified first
    const { error: profilesError } = await supabase
      .from('profiles_unified')
      .insert(employees);
      
    if (profilesError) {
      throw profilesError;
    }
    
    // Then add the company-employee relationships
    const companyEmployees = employees.map(emp => ({
      company_id: emp.company_id,
      employee_id: emp.id
    }));
    
    const { error: relationError } = await supabase
      .from('company_employees')
      .insert(companyEmployees);
      
    if (relationError) {
      throw relationError;
    }
  } catch (error) {
    console.error('Failed to add employees:', error);
    throw error;
  }
};

// Get recent assignments with employee and course info
export const getRecentAssignments = async (companyId: string, limit = 5): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('course_assignments')
      .select(`
        id,
        created_at,
        completed,
        due_date,
        profiles_unified!employee_id (
          full_name
        ),
        company_courses!course_id (
          title
        )
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      throw error;
    }
    
    return data.map(item => ({
      id: item.id,
      employee_name: item.profiles_unified?.full_name,
      course_title: item.company_courses?.title,
      created_at: item.created_at,
      due_date: item.due_date,
      completed: item.completed
    })) || [];
  } catch (error) {
    console.error('Failed to fetch recent assignments:', error);
    return [];
  }
};
