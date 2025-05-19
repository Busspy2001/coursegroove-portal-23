
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X } from "lucide-react";
import { Employee } from "@/services/supabase-business-data";
import { useIsMobile } from "@/hooks/use-mobile";

interface EmployeeListProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  onUpdateEmployeeStatus: (employee: Employee) => void;
  companyId: string;
}

export const EmployeeList = ({ 
  employees, 
  onEditEmployee, 
  onDeleteEmployee, 
  onUpdateEmployeeStatus,
  companyId 
}: EmployeeListProps) => {
  const isMobile = useIsMobile();
  
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
  
  if (employees.length === 0) {
    return (
      <table className="w-full">
        <tbody>
          <tr>
            <td colSpan={5} className="text-center py-8 text-muted-foreground">
              Aucun employé trouvé.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  
  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="p-4 text-left font-medium text-muted-foreground">Nom</th>
          {!isMobile && <th className="p-4 text-left font-medium text-muted-foreground">Département</th>}
          {!isMobile && <th className="p-4 text-left font-medium text-muted-foreground">Titre</th>}
          <th className="p-4 text-left font-medium text-muted-foreground">Statut</th>
          <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="group hover:bg-muted/50 border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">
                    {getInitials(employee.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{employee.full_name}</div>
                  <div className="text-xs text-muted-foreground">{employee.email}</div>
                  {isMobile && employee.department_name && (
                    <div className="mt-1">
                      <Badge className={`${getDepartmentClass(employee.department_name)} text-xs`}>
                        {employee.department_name}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </td>
            {!isMobile && (
              <td className="p-4">
                {employee.department_name ? (
                  <Badge className={getDepartmentClass(employee.department_name)}>
                    {employee.department_name}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-xs">Non assigné</span>
                )}
              </td>
            )}
            {!isMobile && (
              <td className="p-4">
                {employee.job_title || "-"}
              </td>
            )}
            <td className="p-4">
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
            </td>
            <td className="p-4 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditEmployee(employee)}
                    className="flex items-center cursor-pointer">
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdateEmployeeStatus(employee)}
                    className="flex items-center cursor-pointer"
                  >
                    {employee.status === 'active' ? 'Désactiver' : 'Activer'}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 flex items-center cursor-pointer" 
                    onClick={() => onDeleteEmployee(employee)}
                  >
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
