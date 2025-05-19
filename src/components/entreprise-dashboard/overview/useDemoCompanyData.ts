
import { useState, useEffect } from "react";
import { User } from "@/contexts/auth/types";
import { BusinessStatistics } from "@/services/supabase-business-data";

export const useDemoCompanyData = (currentUser: User | null) => {
  const [companyData, setCompanyData] = useState<any>(null);
  const [stats, setStats] = useState<BusinessStatistics | null>(null);

  useEffect(() => {
    if (currentUser?.is_demo) {
      console.log("Chargement des données de démonstration pour:", currentUser.email);
      
      // Données fictives de l'entreprise pour les comptes de démonstration
      const demoCompany = {
        id: currentUser.company_id || "demo-company-id",
        name: `Entreprise de ${currentUser.full_name || "Démonstration"}`,
        admin_id: currentUser.id
      };
      
      // Statistiques fictives pour la démonstration
      const demoStats: BusinessStatistics = {
        total_employees: 24,
        departments_count: 3,
        active_courses: 8,
        completion_rate: 68,
        recent_activities: [
          {
            type: "Assignation",
            message: "Formation 'Sécurité informatique' assignée à 5 employés",
            date: "Il y a 2 heures"
          },
          {
            type: "Complétion",
            message: "Thomas Dubois a complété 'Leadership et gestion d'équipe'",
            date: "Il y a 3 heures"
          },
          {
            type: "Nouveau",
            message: "Nouvelle formation 'Excel avancé' ajoutée au catalogue",
            date: "Il y a 5 heures"
          }
        ]
      };
      
      setCompanyData(demoCompany);
      setStats(demoStats);
    }
  }, [currentUser]);

  return { demoCompanyData: companyData, demoStats: stats };
};
