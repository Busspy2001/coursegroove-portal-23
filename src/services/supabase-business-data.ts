
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
  manager_name?: string; // Added to handle manager name display
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
    // First get all departments
    const { data: departments, error } = await supabase
      .from('company_departments')
      .select('*')
      .eq('company_id', companyId);
      
    if (error) {
      throw error;
    }
    
    // For each department with a manager, fetch the manager details
    const departmentsWithManagerNames = await Promise.all(
      (departments || []).map(async (dept) => {
        if (dept.manager_id) {
          const { data: managerData } = await supabase
            .from('profiles_unified')
            .select('full_name')
            .eq('id', dept.manager_id)
            .single();
            
          return {
            ...dept,
            manager_name: managerData?.full_name || 'Non assigné'
          };
        }
        return {
          ...dept,
          manager_name: 'Non assigné'
        };
      })
    );
    
    return departmentsWithManagerNames || [];
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
        department_id,
        profiles_unified!employee_id (
          id,
          full_name,
          email,
          avatar_url,
          role
        ),
        company_departments!department_id (
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
      department_id: item.department_id,
      department_name: item.company_departments?.name,
      job_title: item.job_title,
      status: item.status
    })) || [];
    
    return employees;
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    throw error;
  }
};

// Create a department
export const createDepartment = async (companyId: string, department: Partial<Department>): Promise<Department> => {
  try {
    const newDepartment = {
      company_id: companyId,
      name: department.name,
      description: department.description,
      manager_id: department.manager_id
    };
    
    const { data, error } = await supabase
      .from('company_departments')
      .insert(newDepartment)
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

// Update a department
export const updateDepartment = async (departmentId: string, department: Partial<Department>): Promise<Department> => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .update({
        name: department.name,
        description: department.description,
        manager_id: department.manager_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', departmentId)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to update department:', error);
    throw error;
  }
};

// Delete a department
export const deleteDepartment = async (departmentId: string, departmentName: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('company_departments')
      .delete()
      .eq('id', departmentId);
      
    if (error) {
      throw error;
    }
    
    console.log(`Department ${departmentName} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Failed to delete department:', error);
    throw error;
  }
};

// Add a single employee
export const addEmployee = async (companyId: string, employee: Partial<Employee>): Promise<Employee> => {
  try {
    // Generate a UUID for the new user
    const userId = crypto.randomUUID();
    
    // Insert into profiles_unified first
    const { error: profilesError } = await supabase
      .from('profiles_unified')
      .insert({
        id: userId,
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role || 'student'
      });
      
    if (profilesError) {
      throw profilesError;
    }
    
    // Then add the company-employee relationship
    const { error: relationError } = await supabase
      .from('company_employees')
      .insert({
        company_id: companyId,
        employee_id: userId,
        department_id: employee.department_id,
        job_title: employee.job_title,
        status: employee.status || 'active'
      });
      
    if (relationError) {
      throw relationError;
    }
    
    // Return the combined employee data
    return {
      id: userId,
      full_name: employee.full_name || '',
      email: employee.email || '',
      role: employee.role || 'student',
      department_id: employee.department_id,
      job_title: employee.job_title,
      status: employee.status || 'active'
    };
  } catch (error) {
    console.error('Failed to add employee:', error);
    throw error;
  }
};

// Bulk add employees
export const addEmployees = async (employees: Array<{
  full_name: string; 
  email: string; 
  role: UserRole;
  company_id: string;
  id?: string; // Make id optional
}>): Promise<void> => {
  try {
    // Prepare employees data with generated IDs if not provided
    const employeesWithIds = employees.map(emp => ({
      ...emp,
      id: emp.id || crypto.randomUUID()
    }));
    
    // Insert into profiles_unified first
    const profilesData = employeesWithIds.map(emp => ({
      id: emp.id,
      full_name: emp.full_name,
      email: emp.email,
      role: emp.role
    }));
    
    const { error: profilesError } = await supabase
      .from('profiles_unified')
      .insert(profilesData);
      
    if (profilesError) {
      throw profilesError;
    }
    
    // Then add the company-employee relationships
    const companyEmployees = employeesWithIds.map(emp => ({
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

// Update an employee
export const updateEmployee = async (
  companyId: string, 
  employeeId: string, 
  employee: Partial<Employee>
): Promise<Employee> => {
  try {
    // Update employee relation if department/job/status changes
    if (employee.department_id !== undefined || employee.job_title !== undefined || employee.status !== undefined) {
      const { error: relationError } = await supabase
        .from('company_employees')
        .update({
          department_id: employee.department_id,
          job_title: employee.job_title,
          status: employee.status,
          updated_at: new Date().toISOString()
        })
        .eq('company_id', companyId)
        .eq('employee_id', employeeId);
        
      if (relationError) {
        throw relationError;
      }
    }
    
    // Return the updated employee data
    return {
      id: employeeId,
      full_name: employee.full_name || '',
      email: employee.email || '',
      role: employee.role || 'student',
      department_id: employee.department_id,
      job_title: employee.job_title,
      status: employee.status
    };
  } catch (error) {
    console.error('Failed to update employee:', error);
    throw error;
  }
};

// Remove an employee
export const removeEmployee = async (
  companyId: string, 
  employeeId: string,
  employeeName: string
): Promise<boolean> => {
  try {
    // Remove from company_employees
    const { error } = await supabase
      .from('company_employees')
      .delete()
      .eq('company_id', companyId)
      .eq('employee_id', employeeId);
      
    if (error) {
      throw error;
    }
    
    console.log(`Employee ${employeeName} removed successfully from company`);
    return true;
  } catch (error) {
    console.error('Failed to remove employee:', error);
    throw error;
  }
};

// Get recent assignments with employee and course info
export const getRecentAssignments = async (companyId: string, limit = 5): Promise<any[]> => {
  try {
    // We need to query separately since we're having an issue with the join relationship
    const { data: assignments, error } = await supabase
      .from('course_assignments')
      .select(`
        id,
        created_at,
        completed,
        due_date,
        employee_id,
        course_id
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      throw error;
    }
    
    // If we have assignments, fetch the additional data for each
    const enrichedAssignments = await Promise.all((assignments || []).map(async (assignment) => {
      // Get employee info
      const { data: employeeData } = await supabase
        .from('profiles_unified')
        .select('full_name')
        .eq('id', assignment.employee_id)
        .single();
      
      // Get course info
      const { data: courseData } = await supabase
        .from('company_courses')
        .select('title')
        .eq('id', assignment.course_id)
        .single();
        
      return {
        id: assignment.id,
        employee_name: employeeData?.full_name || 'Unknown',
        course_title: courseData?.title || 'Unknown Course',
        created_at: assignment.created_at,
        due_date: assignment.due_date,
        completed: assignment.completed
      };
    }));
    
    return enrichedAssignments;
  } catch (error) {
    console.error('Failed to fetch recent assignments:', error);
    return [];
  }
};
