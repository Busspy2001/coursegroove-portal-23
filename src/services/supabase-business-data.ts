
import { supabase } from "@/integrations/supabase/client";

// Types
export interface Employee {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  department_id?: string;
  department_name?: string;
  job_title?: string;
  status?: 'active' | 'inactive';
  hire_date?: string;
  created_at?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  company_id: string;
  head_id?: string;
  head_name?: string;
  manager_id?: string;
  manager_name?: string;
  employee_count?: number;
  created_at?: string;
}

export interface BusinessStatistics {
  total_employees: number;
  departments_count: number;
  active_courses: number;
  completion_rate: number;
  recent_activities: Array<{
    type: string;
    message: string;
    date: string;
  }>;
}

// Fetch company data
export const fetchCompanyData = async () => {
  try {
    // Get user ID from session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    
    if (!userId) {
      console.log("No user ID found in session");
      return null;
    }

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

    if (userData?.company_id) {
      // Fetch company using company_id
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', userData.company_id)
        .single();

      if (companyError) {
        console.error("Error fetching company:", companyError);
        return null;
      }

      return companyData;
    } else {
      // Check if user is admin of any company
      const { data: adminCompany, error: adminError } = await supabase
        .from('companies')
        .select('*')
        .eq('admin_id', userId)
        .maybeSingle();

      if (adminError) {
        console.error("Error fetching admin company:", adminError);
        return null;
      }

      return adminCompany;
    }
  } catch (error) {
    console.error("Error in fetchCompanyData:", error);
    return null;
  }
};

// Fetch business statistics
export const fetchBusinessStatistics = async (companyId: string): Promise<BusinessStatistics | null> => {
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

    // Mock data for active courses and completion rate (would be implemented with real data)
    const activeCourses = 5;
    const completionRate = 72;

    // Get some recent activities
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
      active_courses: activeCourses,
      completion_rate: completionRate,
      recent_activities: recentActivities
    };
  } catch (error) {
    console.error("Error in fetchBusinessStatistics:", error);
    return null;
  }
};

// Fetch employees for a company
export const fetchEmployees = async (companyId: string): Promise<Employee[]> => {
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
        profiles_unified (
          id,
          full_name,
          email,
          avatar_url
        ),
        company_departments (
          name
        )
      `)
      .eq('company_id', companyId);

    if (error) {
      console.error("Error fetching employees:", error);
      return [];
    }

    // Map to expected Employee format
    const employees: Employee[] = data.map(item => ({
      id: item.employee_id,
      full_name: item.profiles_unified?.full_name,
      email: item.profiles_unified?.email,
      avatar_url: item.profiles_unified?.avatar_url,
      department_id: item.department_id,
      department_name: item.company_departments?.name,
      job_title: item.job_title,
      status: item.status,
      hire_date: item.joined_at,
    }));

    return employees;
  } catch (error) {
    console.error("Error in fetchEmployees:", error);
    return [];
  }
};

// Fetch departments for a company
export const fetchDepartments = async (companyId: string): Promise<Department[]> => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .select(`
        *,
        profiles_unified (
          full_name
        )
      `)
      .eq('company_id', companyId);

    if (error) {
      console.error("Error fetching departments:", error);
      return [];
    }

    // Map to expected Department format
    const departments: Department[] = data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      company_id: item.company_id,
      manager_id: item.manager_id,
      manager_name: item.profiles_unified?.full_name || 'Non assigné',
      created_at: item.created_at,
    }));

    return departments;
  } catch (error) {
    console.error("Error in fetchDepartments:", error);
    return [];
  }
};

// Create a department
export const createDepartment = async (
  companyId: string, 
  departmentData: Partial<Department>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('company_departments')
      .insert({
        name: departmentData.name,
        description: departmentData.description,
        company_id: companyId,
        manager_id: departmentData.manager_id
      });

    if (error) {
      console.error("Error creating department:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in createDepartment:", error);
    return false;
  }
};

// Update a department
export const updateDepartment = async (
  departmentId: string,
  departmentData: Partial<Department>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('company_departments')
      .update({
        name: departmentData.name,
        description: departmentData.description,
        manager_id: departmentData.manager_id
      })
      .eq('id', departmentId);

    if (error) {
      console.error("Error updating department:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    return false;
  }
};

// Delete a department
export const deleteDepartment = async (
  departmentId: string,
  departmentName: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('company_departments')
      .delete()
      .eq('id', departmentId);

    if (error) {
      console.error(`Error deleting department ${departmentName}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error in deleteDepartment for ${departmentName}:`, error);
    return false;
  }
};

// Add an employee
export const addEmployee = async (companyId: string, employeeData: Partial<Employee>): Promise<boolean> => {
  try {
    // Check if user already exists
    let employeeId = '';
    const { data: existingUser, error: userError } = await supabase
      .from('profiles_unified')
      .select('id')
      .eq('email', employeeData.email)
      .maybeSingle();

    if (userError) {
      console.error("Error checking for existing user:", userError);
      return false;
    }

    if (existingUser) {
      employeeId = existingUser.id;
    } else {
      // Create new user profile with a generated UUID
      const newUserId = crypto.randomUUID();
      
      const { data: newUser, error: createError } = await supabase
        .from('profiles_unified')
        .insert({
          id: newUserId,
          full_name: employeeData.full_name,
          email: employeeData.email,
          role: 'employee',
          company_id: companyId,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating user profile:", createError);
        return false;
      }

      employeeId = newUser.id;
    }

    // Add employee to company
    const { error: empError } = await supabase
      .from('company_employees')
      .insert({
        company_id: companyId,
        employee_id: employeeId,
        department_id: employeeData.department_id,
        job_title: employeeData.job_title,
        status: employeeData.status || 'active',
      });

    if (empError) {
      console.error("Error adding employee to company:", empError);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in addEmployee:", error);
    return false;
  }
};

// Update an employee
export const updateEmployee = async (
  companyId: string,
  employeeId: string,
  employeeData: Partial<Employee>
): Promise<boolean> => {
  try {
    // Update employee profile information
    if (employeeData.full_name || employeeData.email) {
      const updateProfile: any = {};
      if (employeeData.full_name) updateProfile.full_name = employeeData.full_name;
      if (employeeData.email) updateProfile.email = employeeData.email;

      const { error: profileError } = await supabase
        .from('profiles_unified')
        .update(updateProfile)
        .eq('id', employeeId);

      if (profileError) {
        console.error("Error updating employee profile:", profileError);
        return false;
      }
    }

    // Update employee company information
    const updateData: any = {};
    if (employeeData.department_id) updateData.department_id = employeeData.department_id;
    if (employeeData.job_title) updateData.job_title = employeeData.job_title;
    if (employeeData.status) updateData.status = employeeData.status;

    if (Object.keys(updateData).length > 0) {
      const { error: empError } = await supabase
        .from('company_employees')
        .update(updateData)
        .eq('company_id', companyId)
        .eq('employee_id', employeeId);

      if (empError) {
        console.error("Error updating employee company data:", empError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    return false;
  }
};

// Remove an employee from company
export const removeEmployee = async (
  companyId: string, 
  employeeId: string,
  employeeName: string
): Promise<boolean> => {
  try {
    // Remove employee from company
    const { error } = await supabase
      .from('company_employees')
      .delete()
      .eq('company_id', companyId)
      .eq('employee_id', employeeId);

    if (error) {
      console.error(`Error removing employee ${employeeName}:`, error);
      return false;
    }

    console.log(`Employee ${employeeName} successfully removed from company`);
    return true;
  } catch (error) {
    console.error(`Error in removeEmployee for ${employeeName}:`, error);
    return false;
  }
};
