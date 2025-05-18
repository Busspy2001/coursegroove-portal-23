
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Employee,
  Department,
  fetchEmployees,
  fetchDepartments,
  addEmployee,
  updateEmployee,
  removeEmployee,
} from "@/services/supabase-business-data";

interface UseEmployeesResult {
  loading: boolean;
  employees: Employee[];
  departments: Department[];
  companyData: any;
  filteredEmployees: Employee[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  refreshEmployees: () => Promise<void>;
  handleAddEmployee: (employeeData: Partial<Employee>) => Promise<boolean>;
  handleUpdateEmployee: (id: string, employeeData: Partial<Employee>) => Promise<boolean>;
  handleDeleteEmployee: (id: string, name: string) => Promise<boolean>;
  handleUpdateEmployeeStatus: (employee: Employee) => Promise<void>;
  isDemo: boolean;
}

export const useEmployees = (): UseEmployeesResult => {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [isDemo, setIsDemo] = useState(false);

  // Function to load data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Loading employee data for user:", currentUser?.email);
      
      // First check if the user is a demo account
      const isUserDemo = currentUser?.is_demo === true;
      setIsDemo(isUserDemo);
      
      // Get company data - handle both regular and demo accounts
      let company;
      
      if (isUserDemo) {
        console.log("Demo user detected, checking for existing company");
        // For demo accounts, we need to make sure the company exists
        // and is correctly associated with the user
        const { data: companyDataForDemo } = await supabase
          .from('companies')
          .select('*')
          .eq('admin_id', currentUser?.id)
          .maybeSingle();
        
        if (companyDataForDemo) {
          console.log("Found existing demo company:", companyDataForDemo.name);
          company = companyDataForDemo;
        } else {
          // If no company found, create a demo company for this user
          console.log("Creating demo company for user:", currentUser?.id);
          const { data: newCompany, error: companyError } = await supabase
            .from('companies')
            .insert({
              name: `Entreprise de ${currentUser?.full_name || currentUser?.name || 'Demo'}`,
              admin_id: currentUser?.id
            })
            .select()
            .single();
            
          if (companyError) {
            console.error("Error creating company:", companyError);
            throw companyError;
          }
            
          if (newCompany) {
            console.log("Demo company created successfully:", newCompany.name);
            company = newCompany;
            
            // Update the user with the company ID
            await supabase
              .from('profiles_unified')
              .update({ company_id: newCompany.id })
              .eq('id', currentUser?.id);
              
            console.log("User updated with company ID");
              
            // Create default departments
            const deptNames = ['Marketing', 'IT', 'RH', 'Ventes'];
            console.log("Creating default departments:", deptNames.join(", "));
            
            for (const name of deptNames) {
              await supabase
                .from('company_departments')
                .insert({
                  name,
                  description: `Département ${name}`,
                  company_id: newCompany.id
                });
            }
            
            // Add some demo employees
            const demoEmployees = [
              { name: 'Sophie Martin', email: 'sophie.martin@demo.com', dept: 'Marketing', role: 'Responsable' },
              { name: 'Thomas Dubois', email: 'thomas.dubois@demo.com', dept: 'IT', role: 'Développeur' },
              { name: 'Julie Leclerc', email: 'julie.leclerc@demo.com', dept: 'Finance', role: 'Comptable' }
            ];
            
            console.log("Creating demo employees:", demoEmployees.map(e => e.name).join(", "));
            
            for (const emp of demoEmployees) {
              const { data: newProfile, error: profileError } = await supabase
                .from('profiles_unified')
                .insert({
                  id: crypto.randomUUID(),
                  full_name: emp.name,
                  email: emp.email,
                  role: 'employee' as "student" | "instructor" | "admin" | "business_admin" | "employee" | "super_admin" | "demo",
                  is_demo: true,
                  company_id: newCompany.id
                })
                .select()
                .single();
                
              if (profileError) {
                console.error("Error creating employee profile:", profileError);
                continue;
              }
                
              if (newProfile) {
                // Get department ID
                const { data: dept } = await supabase
                  .from('company_departments')
                  .select('id')
                  .eq('company_id', newCompany.id)
                  .eq('name', emp.dept)
                  .maybeSingle();
                  
                // Add to company_employees
                await supabase
                  .from('company_employees')
                  .insert({
                    company_id: newCompany.id,
                    employee_id: newProfile.id,
                    job_title: emp.role,
                    department_id: dept?.id,
                    status: 'active'
                  });
              }
            }
            
            console.log("Demo data setup completed");
          }
        }
      } else {
        // For real users, just fetch their company data
        console.log("Regular user, fetching company data");
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('admin_id', currentUser?.id)
          .maybeSingle();
          
        company = companyData;
      }
      
      setCompanyData(company);
      
      if (company) {
        console.log("Loading employees and departments for company:", company.id);
        const employeesData = await fetchEmployees(company.id);
        setEmployees(employeesData);
        
        const departmentsData = await fetchDepartments(company.id);
        setDepartments(departmentsData);
        
        console.log(`Loaded ${employeesData.length} employees and ${departmentsData.length} departments`);
      } else {
        console.log("No company found for this user");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les données des employés.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Initial data loading
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Function to refresh employees
  const refreshEmployees = async () => {
    if (companyData?.id) {
      const updatedEmployees = await fetchEmployees(companyData.id);
      setEmployees(updatedEmployees);
    }
  };

  // Function to add an employee
  const handleAddEmployee = async (employeeData: Partial<Employee>): Promise<boolean> => {
    if (!companyData) return false;
    
    try {
      if (!employeeData.full_name || !employeeData.email) {
        toast({
          title: "Information manquante",
          description: "Le nom et l'email sont requis.",
          variant: "destructive",
        });
        return false;
      }
      
      const result = await addEmployee(companyData.id, employeeData);
      
      if (result) {
        await refreshEmployees();
        
        toast({
          title: "Employé ajouté",
          description: `${employeeData.full_name} a été ajouté avec succès.`,
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: `Impossible d'ajouter l'employé.`,
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to update an employee
  const handleUpdateEmployee = async (id: string, employeeData: Partial<Employee>): Promise<boolean> => {
    if (!companyData) return false;
    
    try {
      const result = await updateEmployee(companyData.id, id, employeeData);
      
      if (result) {
        await refreshEmployees();
        
        toast({
          title: "Employé modifié",
          description: `${employeeData.full_name} a été modifié avec succès.`,
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: `Impossible de modifier l'employé.`,
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to delete an employee
  const handleDeleteEmployee = async (id: string, name: string): Promise<boolean> => {
    if (!companyData) return false;
    
    try {
      const result = await removeEmployee(companyData.id, id, name);
      
      if (result) {
        await refreshEmployees();
        
        toast({
          title: "Employé supprimé",
          description: `${name} a été supprimé avec succès.`,
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'employé.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Handle updating employee status (active/inactive)
  const handleUpdateEmployeeStatus = async (employee: Employee) => {
    if (!companyData || !employee.id) return;
    
    const newStatus = employee.status === 'active' ? 'inactive' : 'active';
    
    try {
      await updateEmployee(companyData.id, employee.id, {
        ...employee,
        status: newStatus
      });
      
      await refreshEmployees();
      
      toast({
        title: `Employé ${newStatus === 'active' ? 'activé' : 'désactivé'}`,
        description: `${employee.full_name} a été ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de la modification du statut:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'employé.",
        variant: "destructive",
      });
    }
  };

  // Filtered employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchQuery.trim() === "" || 
      (employee.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       employee.email?.toLowerCase().includes(searchQuery.toLowerCase()));
       
    const matchesDepartment = departmentFilter === "all" || 
      employee.department_id === departmentFilter;
      
    return matchesSearch && matchesDepartment;
  });

  return {
    loading,
    employees,
    departments,
    companyData,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    refreshEmployees,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleUpdateEmployeeStatus,
    isDemo
  };
};
