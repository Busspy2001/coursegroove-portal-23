
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmployeeCard } from "./EmployeeCard";
import { Employee } from "@/services/supabase-business-data";
import { Users } from "lucide-react";

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
      <div className="text-center py-16 border rounded-md">
        <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-40" />
        <h3 className="mt-4 text-lg font-medium">Aucun employé trouvé</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Aucun employé ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou d'ajouter de nouveaux employés.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          },
          hidden: {}
        }}
      >
        {employees.map((employee) => (
          <motion.div
            key={employee.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3 }}
          >
            <EmployeeCard
              employee={employee}
              onEditEmployee={onEditEmployee}
              onDeleteEmployee={onDeleteEmployee}
              onUpdateEmployeeStatus={onUpdateEmployeeStatus}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
