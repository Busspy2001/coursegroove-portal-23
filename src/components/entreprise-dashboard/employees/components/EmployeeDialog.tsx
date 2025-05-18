
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department, Employee } from "@/services/supabase-business-data";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditMode: boolean;
  currentEmployee: Partial<Employee>;
  departments: Department[];
  onInputChange: (field: string, value: string) => void;
}

export const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEditMode,
  currentEmployee,
  departments,
  onInputChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Modifier un employé" : "Ajouter un employé"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Modifiez les informations de cet employé." 
              : "Ajoutez un nouvel employé à votre entreprise."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              placeholder="Nom complet"
              className="col-span-3"
              value={currentEmployee.full_name || ""}
              onChange={(e) => onInputChange("full_name", e.target.value)}
              disabled={isEditMode}
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@exemple.com"
              type="email"
              className="col-span-3"
              value={currentEmployee.email || ""}
              onChange={(e) => onInputChange("email", e.target.value)}
              disabled={isEditMode}
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Département
            </Label>
            <Select
              value={currentEmployee.department_id || ""}
              onValueChange={(value) => onInputChange("department_id", value)}
            >
              <SelectTrigger id="department" className="col-span-3">
                <SelectValue placeholder="Sélectionner un département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun département</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job-title" className="text-right">
              Titre
            </Label>
            <Input
              id="job-title"
              placeholder="Titre ou fonction"
              className="col-span-3"
              value={currentEmployee.job_title || ""}
              onChange={(e) => onInputChange("job_title", e.target.value)}
            />
          </div>
          
          {isEditMode && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select
                value={currentEmployee.status || "active"}
                onValueChange={(value) => onInputChange("status", value)}
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onSubmit}>
            {isEditMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
