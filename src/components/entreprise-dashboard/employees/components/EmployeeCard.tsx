
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, X } from "lucide-react";
import { Employee } from "@/services/supabase-business-data";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2 relative">
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditEmployee(employee)} className="cursor-pointer">
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateEmployeeStatus(employee)} className="cursor-pointer">
                  {employee.status === 'active' ? 'Désactiver' : 'Activer'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteEmployee(employee)} className="text-red-600 focus:text-red-600 cursor-pointer">
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-col items-center pt-2">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarFallback className="text-xl bg-primary/10">
                {getInitials(employee.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{employee.full_name || 'Sans nom'}</h3>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Département:</span>
              {employee.department_name ? (
                <Badge className={getDepartmentClass(employee.department_name)}>
                  {employee.department_name}
                </Badge>
              ) : (
                <span className="text-xs text-muted-foreground">Non assigné</span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Poste:</span>
              <span className="text-sm">{employee.job_title || '-'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Statut:</span>
              <Badge 
                variant={employee.status === 'active' ? 'default' : 'outline'}
                className={`${employee.status === 'active' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'text-muted-foreground'} flex items-center gap-1`}
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
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            variant="outline" 
            className="w-full text-sm" 
            onClick={() => onEditEmployee(employee)}
          >
            Voir le profil
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
