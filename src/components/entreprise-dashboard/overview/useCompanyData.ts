
import { useState, useEffect, useCallback } from "react";
import { User } from "@/contexts/auth/types";
import { fetchCompanyData, fetchBusinessStatistics, BusinessStatistics } from "@/services/supabase-business-data";
import { toast } from "@/hooks/use-toast";
import { useDemoCompanyData } from "./useDemoCompanyData";
import { supabase } from "@/integrations/supabase/client";

interface Company {
  id: string;
  name: string;
  admin_id: string;
  created_at?: string;
}

interface UseCompanyDataResult {
  loading: boolean;
  error: Error | null;
  companyData: Company | null;
  stats: BusinessStatistics | null;
  refetch: () => Promise<void>;
}

export const useCompanyData = (currentUser: User | null): UseCompanyDataResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [stats, setStats] = useState<BusinessStatistics | null>(null);
  
  // Get demo data if user is a demo account
  const demoStats = useDemoCompanyData();
  const demoCompanyData: Company = {
    id: "demo-company",
    name: "Entreprise de Démonstration",
    admin_id: currentUser?.id || "demo-admin"
  };
  
  // Fonction pour créer une entreprise de démonstration
  const createDemoCompany = useCallback(async () => {
    if (!currentUser) return null;
    
    try {
      console.log("Creating demo company for:", currentUser.email);
      
      // Vérifier d'abord si l'entreprise existe déjà pour cet utilisateur
      const { data: existingCompany, error: checkError } = await supabase
        .from('companies')
        .select('*')
        .eq('admin_id', currentUser.id)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking for existing company:", checkError);
        throw new Error(`Impossible de vérifier l'existence de l'entreprise: ${checkError.message}`);
      }
      
      // Si l'entreprise existe déjà, la retourner
      if (existingCompany) {
        console.log("Using existing demo company:", existingCompany.name);
        return existingCompany;
      }
      
      // Créer une entreprise de démo
      const { data: newCompany, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: `Entreprise de ${currentUser.full_name || currentUser.name || 'Démonstration'}`,
          admin_id: currentUser.id
        })
        .select()
        .single();
        
      if (companyError) {
        console.error("Error creating demo company:", companyError);
        throw new Error(`Impossible de créer l'entreprise de démonstration: ${companyError.message}`);
      }
      
      if (newCompany) {
        console.log("Demo company created successfully:", newCompany);
        
        // Mettre à jour l'utilisateur avec l'ID de l'entreprise
        const { error: updateError } = await supabase
          .from('profiles_unified')
          .update({ company_id: newCompany.id })
          .eq('id', currentUser.id);
          
        if (updateError) {
          console.error("Error updating user profile with company ID:", updateError);
        }
        
        // Créer des départements par défaut
        const departments = [
          { name: 'Marketing', description: 'Département Marketing' },
          { name: 'IT', description: 'Département Informatique' },
          { name: 'RH', description: 'Ressources Humaines' },
          { name: 'Ventes', description: 'Équipe commerciale' }
        ];
        
        for (const dept of departments) {
          await supabase
            .from('company_departments')
            .insert({
              name: dept.name,
              description: dept.description,
              company_id: newCompany.id
            });
        }
        
        console.log("Demo departments created");
        
        return newCompany;
      }
      
      return null;
    } catch (error) {
      console.error("Error in createDemoCompany:", error);
      // Retourner un faux objet d'entreprise pour les utilisateurs de démo en cas d'erreur
      if (currentUser.is_demo) {
        return demoCompanyData;
      }
      throw error;
    }
  }, [currentUser, demoCompanyData]);
  
  // Fonction principale pour charger les données
  const loadData = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    setError(null);
    
    try {
      console.log("Loading company data for user:", currentUser.email, "Is demo:", currentUser.is_demo);
      
      // Pour les comptes de démonstration
      if (currentUser.is_demo) {
        // Vérifier si l'entreprise existe déjà
        const { data: existingCompany, error: fetchError } = await supabase
          .from('companies')
          .select('*')
          .eq('admin_id', currentUser.id)
          .maybeSingle();
        
        if (fetchError) {
          console.error("Error checking for existing company:", fetchError);
          // Pour les utilisateurs de démo, on utilise des données factices en cas d'erreur
          setCompanyData(demoCompanyData);
          setStats(demoStats);
          setLoading(false);
          return;
        }
        
        // Si l'entreprise existe, l'utiliser
        if (existingCompany) {
          console.log("Found existing demo company:", existingCompany.name);
          setCompanyData(existingCompany);
          
          try {
            const statistics = await fetchBusinessStatistics(existingCompany.id);
            setStats(statistics);
          } catch (statsError) {
            console.error("Error fetching statistics:", statsError);
            // Ne pas échouer si les statistiques ne peuvent pas être récupérées
            setStats(demoStats);
          }
        } 
        // Sinon, en créer une nouvelle
        else {
          try {
            const newCompany = await createDemoCompany();
            if (newCompany) {
              setCompanyData(newCompany);
              
              // Simulation de statistiques
              const demoStatistics: BusinessStatistics = {
                total_employees: 12,
                departments_count: 4,
                active_courses: 6,
                completion_rate: 75,
                recent_activities: [
                  {
                    type: "Nouveau",
                    message: "L'employé Marie Dubois a rejoint l'équipe Marketing",
                    date: "Il y a 1 heure"
                  },
                  {
                    type: "Complétion",
                    message: "Thomas Martin a terminé sa formation sur Excel",
                    date: "Il y a 4 heures"
                  },
                  {
                    type: "Assignation",
                    message: "Formation 'Leadership' assignée au département RH",
                    date: "Il y a 2 jours"
                  }
                ]
              };
              
              setStats(demoStatistics);
            } else {
              // Fallback à des données fictives si la création échoue
              setCompanyData(demoCompanyData);
              setStats(demoStats);
            }
          } catch (createError) {
            console.error("Error creating demo company:", createError);
            // Utiliser des données fictives en cas d'erreur
            setCompanyData(demoCompanyData);
            setStats(demoStats);
          }
        }
      } 
      // Pour les utilisateurs normaux
      else {
        try {
          const company = await fetchCompanyData();
          setCompanyData(company);
          
          if (company) {
            const statistics = await fetchBusinessStatistics(company.id);
            setStats(statistics);
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
          throw new Error("Impossible de charger les données de l'entreprise");
        }
      }
    } catch (error) {
      console.error("Error in loadData:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      
      // En mode démo, on utilise des données fictives même en cas d'erreur
      if (currentUser.is_demo) {
        console.log("Using demo data as fallback after error");
        setCompanyData(demoCompanyData);
        setStats(demoStats);
      } else {
        toast({
          title: "Erreur de chargement",
          description: error instanceof Error ? error.message : "Impossible de charger les données du tableau de bord.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser, createDemoCompany, demoCompanyData, demoStats]);
  
  // Fonction pour recharger les données
  const refetch = useCallback(async () => {
    setLoading(true);
    await loadData();
  }, [loadData]);
  
  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  return { 
    loading, 
    error,
    companyData: companyData || demoCompanyData, 
    stats: stats || demoStats,
    refetch
  };
};
