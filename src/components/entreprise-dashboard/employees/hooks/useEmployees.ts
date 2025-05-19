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

// Données de démonstration par défaut
const demoCompanyData = {
  id: "demo-company",
  name: "Entreprise de Démonstration",
  admin_id: "demo-admin",
  created_at: new Date().toISOString()
};

const demoDepartments: Department[] = [
  { id: "dept-1", name: "Marketing", description: "Département Marketing", company_id: "demo-company" },
  { id: "dept-2", name: "IT", description: "Département Informatique", company_id: "demo-company" },
  { id: "dept-3", name: "RH", description: "Ressources Humaines", company_id: "demo-company" },
  { id: "dept-4", name: "Ventes", description: "Équipe commerciale", company_id: "demo-company" },
];

const demoEmployees: Employee[] = [
  { id: "emp-1", full_name: "Sophie Martin", email: "sophie.martin@demo.com", department_id: "dept-1", department_name: "Marketing", job_title: "Responsable Marketing", status: "active" },
  { id: "emp-2", full_name: "Thomas Dubois", email: "thomas.dubois@demo.com", department_id: "dept-2", department_name: "IT", job_title: "Développeur", status: "active" },
  { id: "emp-3", full_name: "Julie Leclerc", email: "julie.leclerc@demo.com", department_id: "dept-1", department_name: "Marketing", job_title: "Chargée de communication", status: "active" },
  { id: "emp-4", full_name: "Antoine Bernard", email: "antoine.bernard@demo.com", department_id: "dept-3", department_name: "RH", job_title: "Responsable RH", status: "inactive" },
  { id: "emp-5", full_name: "Marie Dupont", email: "marie.dupont@demo.com", department_id: "dept-4", department_name: "Ventes", job_title: "Commerciale", status: "active" },
];

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
        const { data: companyDataForDemo, error: companyCheckError } = await supabase
          .from('companies')
          .select('*')
          .eq('admin_id', currentUser?.id)
          .maybeSingle();
        
        if (companyCheckError) {
          console.error("Error checking for existing demo company:", companyCheckError);
          // Fallback to demo data
          setCompanyData(demoCompanyData);
          setDepartments(demoDepartments);
          setEmployees(demoEmployees);
          setLoading(false);
          return;
        }
        
        if (companyDataForDemo) {
          console.log("Found existing demo company:", companyDataForDemo.name);
          company = companyDataForDemo;
        } else {
          // Si on ne trouve pas l'entreprise, fournir des données de démo au lieu d'essayer d'en créer une
          // car les erreurs de RLS peuvent empêcher la création
          console.log("No company found, using demo data");
          setCompanyData(demoCompanyData);
          setDepartments(demoDepartments);
          setEmployees(demoEmployees);
          setLoading(false);
          return;
        }
      } else {
        // For real users, just fetch their company data
        console.log("Regular user, fetching company data");
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('admin_id', currentUser?.id)
          .maybeSingle();
          
        if (companyError) {
          console.error("Error fetching company data:", companyError);
          setCompanyData(null);
          setLoading(false);
          return;
        }
          
        company = companyData;
      }
      
      setCompanyData(company);
      
      if (company) {
        console.log("Loading employees and departments for company:", company.id);
        
        try {
          const employeesData = await fetchEmployees(company.id);
          setEmployees(employeesData);
          
          const departmentsData = await fetchDepartments(company.id);
          setDepartments(departmentsData);
          
          console.log(`Loaded ${employeesData.length} employees and ${departmentsData.length} departments`);
        } catch (fetchError) {
          console.error("Error fetching employees or departments:", fetchError);
          
          // For demo accounts, use demo data as fallback in case of fetch error
          if (isUserDemo) {
            setDepartments(demoDepartments);
            setEmployees(demoEmployees);
          }
        }
      } else {
        console.log("No company found for this user");
        
        // For demo accounts, use demo data as fallback
        if (isUserDemo) {
          setCompanyData(demoCompanyData);
          setDepartments(demoDepartments);
          setEmployees(demoEmployees);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      
      // Use demo data for demo users, even if there's an error
      if (currentUser?.is_demo) {
        console.log("Using demo data after error for demo user");
        setCompanyData(demoCompanyData);
        setDepartments(demoDepartments);
        setEmployees(demoEmployees);
      } else {
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données des employés.",
          variant: "destructive",
        });
      }
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
