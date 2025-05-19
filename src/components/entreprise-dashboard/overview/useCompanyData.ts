
import { useState, useEffect } from "react";
import { User } from "@/contexts/auth/types";
import { fetchCompanyData, fetchBusinessStatistics, BusinessStatistics } from "@/services/supabase-business-data";
import { toast } from "@/hooks/use-toast";
import { useDemoCompanyData } from "./useDemoCompanyData";
import { supabase } from "@/integrations/supabase/client";

export const useCompanyData = (currentUser: User | null) => {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<any>(null);
  const [stats, setStats] = useState<BusinessStatistics | null>(null);
  
  // Get demo data if user is a demo account
  const { demoCompanyData, demoStats } = useDemoCompanyData(currentUser);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!currentUser) {
          setLoading(false);
          return;
        }
        
        console.log("Loading company data for user:", currentUser.email, "Is demo:", currentUser.is_demo);
        
        // Pour les comptes de démonstration, nous utilisons des données fictives
        // mais nous vérifions d'abord si l'entreprise existe déjà
        if (currentUser.is_demo) {
          const { data: existingCompany } = await supabase
            .from('companies')
            .select('*')
            .eq('admin_id', currentUser.id)
            .maybeSingle();
          
          if (existingCompany) {
            console.log("Found existing demo company:", existingCompany.name);
            setCompanyData(existingCompany);
            
            const statistics = await fetchBusinessStatistics(existingCompany.id);
            setStats(statistics);
          } else {
            console.log("Creating demo company for:", currentUser.email);
            
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
              toast({
                title: "Erreur",
                description: "Impossible de créer l'entreprise de démonstration.",
                variant: "destructive",
              });
            } else if (newCompany) {
              console.log("Demo company created successfully:", newCompany);
              setCompanyData(newCompany);
              
              // Mettre à jour l'utilisateur avec l'ID de l'entreprise
              await supabase
                .from('profiles_unified')
                .update({ company_id: newCompany.id })
                .eq('id', currentUser.id);
                
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
            }
          }
          
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
