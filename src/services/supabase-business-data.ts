
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
  employee_count?: number;
  created_at?: string;
}

// Fetch employees for a company
export const fetchEmployees = async (companyId: string): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from('company_employees')
      .select(`
        employee_id,
        job_title,
        department_id,
        status,
        hire_date,
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
      hire_date: item.hire_date,
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
      head_id: item.head_id,
      head_name: item.profiles_unified?.full_name,
      created_at: item.created_at,
    }));

    return departments;
  } catch (error) {
    console.error("Error in fetchDepartments:", error);
    return [];
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
      // Create new user profile
      const { data: newUser, error: createError } = await supabase
        .from('profiles_unified')
        .insert({
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
