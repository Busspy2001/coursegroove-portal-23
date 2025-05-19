
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/services/supabase-business-data";

interface EmployeeCardProps {
  employee: Employee;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  onUpdateEmployeeStatus: (employee: Employee) => void;
}

export const EmployeeCard = ({ 
  employee, 
  onEditEmployee, 
  onDeleteEmployee, 
  onUpdateEmployeeStatus 
}: EmployeeCardProps) => {
  // Helper for initials
  const getInitials = (name: string = "") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  // Get department badge style
  const getDepartmentClass = (dept: string = "") => {
    const deptMap: Record<string, string> = {
      "Marketing": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "IT": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "RH": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Finance": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "Ventes": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Support": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };
    
    return deptMap[dept] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={employee.avatar_url || ""} alt={employee.full_name} />
              <AvatarFallback className="bg-primary/10">
                {getInitials(employee.full_name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h3 className="font-medium">{employee.full_name}</h3>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {employee.department_name && (
                  <Badge className={getDepartmentClass(employee.department_name)}>
                    {employee.department_name}
                  </Badge>
                )}
                
                <Badge 
                  variant={employee.status === 'active' ? 'default' : 'outline'}
                  className={employee.status === 'active' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'text-muted-foreground'}
                >
                  {employee.status === 'active' ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <X className="mr-1 h-3 w-3" />
                  )}
                  {employee.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditEmployee(employee)}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateEmployeeStatus(employee)}>
                {employee.status === 'active' ? 'Désactiver' : 'Activer'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600" 
                onClick={() => onDeleteEmployee(employee)}
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {employee.job_title && (
          <div className="mt-2 pt-2 border-t">
            <span className="text-sm font-medium">Titre:</span> {employee.job_title}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
