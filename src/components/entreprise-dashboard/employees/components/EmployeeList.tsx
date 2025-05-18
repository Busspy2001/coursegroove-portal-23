
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  GraduationCap, 
  MailIcon,
  ShieldCheck, 
  ShieldX 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/services/supabase-business-data";

interface EmployeeListProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  onUpdateEmployeeStatus: (employee: Employee) => void;
  companyId: string;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ 
  employees, 
  onEditEmployee, 
  onDeleteEmployee,
  onUpdateEmployeeStatus,
  companyId
}) => {
  const navigate = useNavigate();

  if (employees.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="h-24 text-center">
          Aucun employé trouvé
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {employees.map((employee) => (
        <TableRow key={employee.id}>
          <TableCell className="font-medium">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={employee.avatar_url || undefined} alt={employee.full_name || 'Avatar'} />
                <AvatarFallback>{employee.full_name?.substring(0, 2).toUpperCase() || 'EU'}</AvatarFallback>
              </Avatar>
              <div>
                <div>{employee.full_name}</div>
                <div className="text-sm text-muted-foreground">{employee.email}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            {employee.department_name || "Non assigné"}
          </TableCell>
          <TableCell>
            {employee.job_title || "—"}
          </TableCell>
          <TableCell>
            <Badge
              variant={employee.status === 'active' ? 'default' : 'secondary'}
              className={`
                ${employee.status === 'active' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'}
              `}
            >
              {employee.status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEditEmployee(employee)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  // Dans une implémentation réelle, cela enverrait un email à l'employé
                  toast({
                    title: "Email envoyé",
                    description: `Un email a été envoyé à ${employee.full_name}.`
                  });
                }}>
                  <MailIcon className="mr-2 h-4 w-4" />
                  <span>Envoyer un email</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/entreprise/formations/assigner")}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Assigner une formation</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onUpdateEmployeeStatus(employee)}>
                  {employee.status === 'active' ? (
                    <>
                      <ShieldX className="mr-2 h-4 w-4" />
                      <span>Désactiver</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Activer</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDeleteEmployee(employee)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
