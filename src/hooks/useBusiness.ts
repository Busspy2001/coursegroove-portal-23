
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
