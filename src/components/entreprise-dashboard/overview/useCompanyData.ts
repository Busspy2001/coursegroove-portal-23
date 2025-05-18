
import { useState, useEffect } from "react";
import { User } from "@/contexts/auth/types";
import { fetchCompanyData, fetchBusinessStatistics, BusinessStatistics } from "@/services/supabase-business-data";
import { toast } from "@/hooks/use-toast";
import { useDemoCompanyData } from "./useDemoCompanyData";

export const useCompanyData = (currentUser: User | null) => {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<any>(null);
  const [stats, setStats] = useState<BusinessStatistics | null>(null);
  
  // Get demo data if user is a demo account
  const { demoCompanyData, demoStats } = useDemoCompanyData(currentUser);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!currentUser) return;
        
        // Pour les comptes de démonstration, nous utilisons des données fictives
        if (currentUser.is_demo) {
          setLoading(false);
          return;
        }
        
        // Pour les utilisateurs normaux, nous chargeons les données réelles
        const company = await fetchCompanyData();
        setCompanyData(company);
        
        if (company) {
          const statistics = await fetchBusinessStatistics(company.id);
          setStats(statistics);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données du tableau de bord.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);

  // Merge real data with demo data if needed
  const finalCompanyData = companyData || demoCompanyData;
  const finalStats = stats || demoStats;
  
  return { loading, companyData: finalCompanyData, stats: finalStats };
};
