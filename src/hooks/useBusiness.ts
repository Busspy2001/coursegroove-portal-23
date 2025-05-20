
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { businessService } from '@/services/business-service';
import { Employee, Department, BusinessStatistics } from '@/services/supabase-business-data';

export const useCompany = () => {
  const { currentUser } = useAuth();
  const [company, setCompany] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
      } catch (err) {
        console.error("Error fetching company:", err);
        setError("Une erreur s'est produite lors du chargement des données de l'entreprise");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompany();
  }, [currentUser]);
  
  return {
    company,
    isLoading,
    error,
    refresh: async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const companyData = await businessService.getCompanyData(currentUser.id);
        setCompany(companyData);
      } catch (err) {
        console.error("Error refreshing company:", err);
        setError("Une erreur s'est produite lors de l'actualisation des données de l'entreprise");
      } finally {
        setIsLoading(false);
      }
    }
  };
};

export const useBusinessStatistics = (companyId: string) => {
  const [statistics, setStatistics] = useState<BusinessStatistics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStatistics();
  }, [companyId]);
  
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
      } catch (err) {
        console.error("Error refreshing business statistics:", err);
        setError("Une erreur s'est produite lors de l'actualisation des statistiques");
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, [companyId]);
  
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
      } catch (err) {
        console.error("Error refreshing employees:", err);
        setError("Une erreur s'est produite lors de l'actualisation des employés");
      } finally {
        setIsLoading(false);
      }
    }
  };
};

export const useDepartments = (companyId: string) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDepartments();
  }, [companyId]);
  
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
      } catch (err) {
        console.error("Error refreshing departments:", err);
        setError("Une erreur s'est produite lors de l'actualisation des départements");
      } finally {
        setIsLoading(false);
      }
    }
  };
};
