
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Building } from "lucide-react";
import { Employee, Department } from "@/services/supabase-business-data";

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
  // Count active employees
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total d'employés</span>
              <span className="text-2xl font-bold">{employees.length}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {activeEmployees} actifs
              </span>
            </div>
            <div className="h-12 w-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Départements</span>
              <span className="text-2xl font-bold">{departments.length}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {departments.length > 0 ? departments[0].name : "Aucun département"}
              </span>
            </div>
            <div className="h-12 w-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <CardContent className="p-6 flex items-center">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Ajouter un employé</span>
              <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <Button 
              onClick={onAddEmployee}
              className="w-full bg-white hover:bg-gray-100 text-green-600 border border-green-200"
              variant="outline"
            >
              Nouveau
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
