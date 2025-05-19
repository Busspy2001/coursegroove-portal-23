
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";
import { useDemoCompanyData } from "./useDemoCompanyData";

// Type pour les statistiques de l'entreprise
export interface BusinessStats {
  total_employees: number;
  active_courses: number;
  departments_count: number;
  completion_rate: number;
  recent_activities: {
    id: string;
    type: string;
    message: string;
    date: string;
  }[];
  upcoming_trainings: {
    id: string;
    title: string;
    date: string;
    assignees: number;
  }[];
  top_performers: {
    id: string;
    name: string;
    department: string;
    completion: number;
    courses_completed: number;
  }[];
}

export const useOverviewData = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<BusinessStats | null>(null);
  
  // Utiliser les données de démo pour les utilisateurs de démonstration
  const demoData = useDemoCompanyData();

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser les données de démo si l'utilisateur est un compte de démonstration
        if (currentUser?.is_demo) {
          console.log("Utilisation des données de démonstration pour l'utilisateur:", currentUser.email);
          setStats(demoData);
          setLoading(false);
          return;
        }
        
        // Pour un vrai utilisateur, il faudrait récupérer les données depuis Supabase
        // Cette partie serait à implémenter avec l'intégration Supabase
        console.log("Données réelles non disponibles, utilisation des données de démonstration par défaut");
        setStats(demoData); // Utiliser les données de démo comme fallback
        
      } catch (err) {
        console.error("Error fetching overview data:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        
        // En cas d'erreur, utiliser quand même les données de démo pour éviter un écran vide
        setStats(demoData);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOverviewData();
    }
  }, [currentUser, demoData]);

  return { loading, error, stats };
};
