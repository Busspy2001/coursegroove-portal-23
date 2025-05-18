
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee, Department } from "@/services/supabase-business-data";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmployeeStatsProps {
  employees: Employee[];
  departments: Department[];
  onAddEmployee: () => void;
}

export const EmployeeStats: React.FC<EmployeeStatsProps> = ({ 
  employees, 
  departments,
  onAddEmployee
}) => {
  const navigate = useNavigate();
  
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total employés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalEmployees > 0 
              ? `${activeEmployees} employés actifs (${Math.round((activeEmployees/totalEmployees)*100)}%)` 
              : "Aucun employé"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Départements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{departments.length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {departments.length === 0 ? "Aucun département" : departments.length === 1 ? "1 département" : `${departments.length} départements`}
          </p>
        </CardContent>
      </Card>
      
      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onAddEmployee}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Ajouter employé
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/entreprise/formations/assigner")}>
            <GraduationCap className="mr-1 h-3.5 w-3.5" />
            Assigner formation
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/entreprise/departements")}>
            <Briefcase className="mr-1 h-3.5 w-3.5" />
            Voir départements
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
