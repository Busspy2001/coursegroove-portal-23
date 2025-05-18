
import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Layers, GraduationCap, BarChart3 } from "lucide-react";
import { OverviewMetricCard } from "../OverviewMetricCard";
import { BusinessStatistics } from "@/services/supabase-business-data";

interface MetricsGridProps {
  stats: BusinessStatistics | null;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ stats }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewMetricCard
        title="Employés"
        value={String(stats?.total_employees || 0)}
        description="employés actifs"
        icon={Users}
        trend={{
          value: "+5%",
          positive: true
        }}
        onClick={() => navigate('/entreprise/employes')}
      />
      <OverviewMetricCard
        title="Départements"
        value={String(stats?.departments_count || 0)}
        description="départements"
        icon={Layers}
        trend={{
          value: "",
          positive: true
        }}
        onClick={() => navigate('/entreprise/departements')}
      />
      <OverviewMetricCard
        title="Formations"
        value={String(stats?.active_courses || 0)}
        description="formations disponibles"
        icon={GraduationCap}
        trend={{
          value: "+2",
          positive: true
        }}
        onClick={() => navigate('/entreprise/formations')}
      />
      <OverviewMetricCard
        title="Taux complétion"
        value={`${stats?.completion_rate || 0}%`}
        description="formations complétées"
        icon={BarChart3}
        trend={{
          value: "+10%",
          positive: true
        }}
        onClick={() => navigate('/entreprise/statistiques')}
      />
    </div>
  );
};
