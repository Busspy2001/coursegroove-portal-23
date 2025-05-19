
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X, Edit, Trash2, Mail, Phone } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14 border-2 border-primary/10">
                <AvatarImage src={employee.avatar_url || ""} alt={employee.full_name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(employee.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h3 className="font-medium text-base">{employee.full_name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  <span className="truncate max-w-[180px]">{employee.email}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  {employee.department_name && (
                    <Badge variant="outline" className={getDepartmentClass(employee.department_name)}>
                      {employee.department_name}
                    </Badge>
                  )}
                  
                  <Badge 
                    variant={employee.status === 'active' ? 'default' : 'outline'}
                    className={employee.status === 'active' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800' 
                      : 'border-gray-200 text-muted-foreground hover:bg-gray-100'}
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
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEditEmployee(employee)} className="flex items-center cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onUpdateEmployeeStatus(employee)}
                  className="flex items-center cursor-pointer"
                >
                  {employee.status === 'active' ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      <span>Désactiver</span>
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Activer</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center cursor-pointer" 
                  onClick={() => onDeleteEmployee(employee)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {employee.job_title && (
            <div className="mt-3 pt-3 border-t">
              <span className="text-sm font-medium text-muted-foreground">Poste:</span> 
              <span className="text-sm ml-1">{employee.job_title}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
