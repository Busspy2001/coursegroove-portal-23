
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee, Department } from "@/services/supabase-business-data";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditMode: boolean;
  currentEmployee: Partial<Employee>;
  departments: Department[];
  onInputChange: (field: string, value: string) => void;
}

export const EmployeeDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isEditMode,
  currentEmployee,
  departments,
  onInputChange,
}: EmployeeDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Modifier un employé" : "Ajouter un employé"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifiez les informations de l'employé ci-dessous."
              : "Remplissez le formulaire pour ajouter un nouvel employé."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="col-span-1">
                Nom complet
              </Label>
              <Input
                id="name"
                value={currentEmployee.full_name || ""}
                onChange={(e) => onInputChange("full_name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="col-span-1">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={currentEmployee.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="col-span-3"
                required
                disabled={isEditMode} // Email shouldn't change for existing employees
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="col-span-1">
                Département
              </Label>
              <Select
                value={currentEmployee.department_id || ""}
                onValueChange={(value) => onInputChange("department_id", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="col-span-1">
                Titre
              </Label>
              <Input
                id="title"
                value={currentEmployee.job_title || ""}
                onChange={(e) => onInputChange("job_title", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="col-span-1">
                Statut
              </Label>
              <Select
                value={currentEmployee.status || "active"}
                onValueChange={(value) =>
                  onInputChange("status", value as "active" | "inactive")
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isEditMode ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
