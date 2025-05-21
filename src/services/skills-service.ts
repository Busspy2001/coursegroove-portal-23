
import { supabase } from '@/integrations/supabase/client';
import {
  SkillCategory,
  Skill,
  EmployeeSkill,
  EmployeeCertification
} from '@/types/database';
import { toast } from '@/hooks/use-toast';

/**
 * Service for managing employee skills and certifications
 */
export const skillsService = {
  /**
   * Get skill categories for a company
   */
  getSkillCategories: async (companyId: string): Promise<SkillCategory[]> => {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .eq('company_id', companyId)
        .order('name');
        
      if (error) {
        console.error("Error fetching skill categories:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getSkillCategories:", error);
      return [];
    }
  },

  /**
   * Create a new skill category
   */
  createSkillCategory: async (category: Partial<SkillCategory>): Promise<SkillCategory | null> => {
    try {
      // Ensure required fields are present
      if (!category.company_id || !category.name) {
        console.error("Missing required fields for skill category");
        return null;
      }

      const { data, error } = await supabase
        .from('skill_categories')
        .insert({
          company_id: category.company_id,
          name: category.name,
          description: category.description
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error creating skill category:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la catégorie de compétence.",
          variant: "destructive",
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createSkillCategory:", error);
      return null;
    }
  },

  /**
   * Get skills for a company
   */
  getSkills: async (companyId: string): Promise<Skill[]> => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          skill_categories(name)
        `)
        .eq('company_id', companyId)
        .order('name');
        
      if (error) {
        console.error("Error fetching skills:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getSkills:", error);
      return [];
    }
  },

  /**
   * Create a new skill
   */
  createSkill: async (skill: Partial<Skill>): Promise<Skill | null> => {
    try {
      // Ensure required fields are present
      if (!skill.company_id || !skill.name) {
        console.error("Missing required fields for skill");
        return null;
      }

      const { data, error } = await supabase
        .from('skills')
        .insert({
          company_id: skill.company_id,
          name: skill.name,
          description: skill.description,
          category_id: skill.category_id
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error creating skill:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la compétence.",
          variant: "destructive",
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createSkill:", error);
      return null;
    }
  },

  /**
   * Get employee skills
   */
  getEmployeeSkills: async (employeeId: string): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('employee_skills')
        .select(`
          *,
          skills(
            id,
            name,
            description,
            category_id,
            skill_categories(name)
          ),
          verifier:profiles_unified(full_name)
        `)
        .eq('employee_id', employeeId)
        .order('acquired_date', { ascending: false });
        
      if (error) {
        console.error("Error fetching employee skills:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getEmployeeSkills:", error);
      return [];
    }
  },

  /**
   * Add a skill to an employee
   */
  addEmployeeSkill: async (employeeSkill: Partial<EmployeeSkill>): Promise<EmployeeSkill | null> => {
    try {
      // Check if the employee already has this skill
      const { data: existingSkill, error: checkError } = await supabase
        .from('employee_skills')
        .select('id')
        .eq('employee_id', employeeSkill.employee_id)
        .eq('skill_id', employeeSkill.skill_id)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing skill:", checkError);
      }
      
      if (existingSkill) {
        // Update the existing skill
        const { data, error } = await supabase
          .from('employee_skills')
          .update({
            proficiency_level: employeeSkill.proficiency_level,
            verified: employeeSkill.verified,
            verified_by: employeeSkill.verified_by,
            source: employeeSkill.source,
            source_id: employeeSkill.source_id
          })
          .eq('id', existingSkill.id)
          .select()
          .single();
          
        if (error) {
          console.error("Error updating employee skill:", error);
          toast({
            title: "Erreur",
            description: "Impossible de mettre à jour la compétence.",
            variant: "destructive",
          });
          return null;
        }
        
        return data;
      } else {
        // Create a new skill for the employee
        const { data, error } = await supabase
          .from('employee_skills')
          .insert(employeeSkill)
          .select()
          .single();
          
        if (error) {
          console.error("Error creating employee skill:", error);
          toast({
            title: "Erreur",
            description: "Impossible d'ajouter la compétence à l'employé.",
            variant: "destructive",
          });
          return null;
        }
        
        return data;
      }
    } catch (error) {
      console.error("Error in addEmployeeSkill:", error);
      return null;
    }
  },

  /**
   * Get employee certifications
   */
  getEmployeeCertifications: async (employeeId: string): Promise<EmployeeCertification[]> => {
    try {
      const { data, error } = await supabase
        .from('employee_certifications')
        .select(`
          *,
          issuer:profiles_unified(full_name)
        `)
        .eq('employee_id', employeeId)
        .order('issue_date', { ascending: false });
        
      if (error) {
        console.error("Error fetching employee certifications:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in getEmployeeCertifications:", error);
      return [];
    }
  },

  /**
   * Create a certification for an employee
   */
  createCertification: async (certification: Partial<EmployeeCertification>): Promise<EmployeeCertification | null> => {
    try {
      const { data, error } = await supabase
        .from('employee_certifications')
        .insert(certification)
        .select()
        .single();
        
      if (error) {
        console.error("Error creating certification:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la certification.",
          variant: "destructive",
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createCertification:", error);
      return null;
    }
  },

  /**
   * Get skill matrix for a company (all employees and their skills)
   */
  getSkillMatrix: async (companyId: string, departmentId?: string): Promise<any> => {
    try {
      // Get employees in the company/department
      const query = supabase
        .from('company_employees')
        .select(`
          employee_id,
          profiles_unified(full_name, avatar_url),
          job_title,
          department_id,
          company_departments(name)
        `)
        .eq('company_id', companyId)
        .eq('status', 'active');
        
      if (departmentId) {
        query.eq('department_id', departmentId);
      }
      
      const { data: employees, error: employeesError } = await query;
      
      if (employeesError) {
        console.error("Error fetching employees:", employeesError);
        return null;
      }
      
      // Get all skills for the company
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select(`
          id,
          name,
          category_id,
          skill_categories(name)
        `)
        .eq('company_id', companyId);
        
      if (skillsError) {
        console.error("Error fetching skills:", skillsError);
        return null;
      }
      
      // Get all employee skills
      const { data: employeeSkills, error: employeeSkillsError } = await supabase
        .from('employee_skills')
        .select(`
          employee_id,
          skill_id,
          proficiency_level,
          verified
        `)
        .in('employee_id', employees?.map(e => e.employee_id) || []);
        
      if (employeeSkillsError) {
        console.error("Error fetching employee skills:", employeeSkillsError);
        return null;
      }
      
      // Create skill matrix
      const matrix = {
        employees: employees?.map(employee => ({
          id: employee.employee_id,
          name: employee.profiles_unified?.full_name,
          avatar: employee.profiles_unified?.avatar_url,
          job_title: employee.job_title,
          department: employee.company_departments?.name,
          skills: skills?.map(skill => {
            const empSkill = employeeSkills?.find(es => 
              es.employee_id === employee.employee_id && es.skill_id === skill.id);
              
            return {
              skill_id: skill.id,
              skill_name: skill.name,
              category: skill.skill_categories?.name,
              proficiency: empSkill?.proficiency_level || 0,
              verified: empSkill?.verified || false
            };
          })
        })) || [],
        skills: skills?.map(skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.skill_categories?.name,
          category_id: skill.category_id,
          employee_count: employeeSkills?.filter(es => es.skill_id === skill.id).length || 0,
          verified_count: employeeSkills?.filter(es => es.skill_id === skill.id && es.verified).length || 0,
          average_proficiency: employeeSkills?.filter(es => es.skill_id === skill.id).length > 0 
            ? Math.round(employeeSkills
                .filter(es => es.skill_id === skill.id)
                .reduce((sum, es) => sum + (es.proficiency_level || 0), 0) / 
                employeeSkills.filter(es => es.skill_id === skill.id).length
              ) 
            : 0
        })) || [],
        categories: [...new Set(skills?.map(s => ({
          id: s.category_id,
          name: s.skill_categories?.name
        })) || [])]
      };
      
      return matrix;
    } catch (error) {
      console.error("Error in getSkillMatrix:", error);
      return null;
    }
  }
};
