
import React from "react";
import { EmployeeCard } from "./EmployeeCard";
import { Employee } from "@/services/supabase-business-data";

interface EmployeeGridProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  onUpdateEmployeeStatus: (employee: Employee) => void;
}

export const EmployeeGrid = ({
  employees,
  onEditEmployee,
  onDeleteEmployee,
  onUpdateEmployeeStatus
}: EmployeeGridProps) => {
  if (employees.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Aucun employé trouvé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEditEmployee={onEditEmployee}
          onDeleteEmployee={onDeleteEmployee}
          onUpdateEmployeeStatus={onUpdateEmployeeStatus}
        />
      ))}
    </div>
  );
};
