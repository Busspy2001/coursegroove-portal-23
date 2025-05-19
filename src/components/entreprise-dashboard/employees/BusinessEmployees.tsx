import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";

// Import custom components
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeGrid } from "./components/EmployeeGrid";
import { EmployeeFilters } from "./components/EmployeeFilters";
import { EmployeeDialog } from "./components/EmployeeDialog";
import { EmployeeDeleteDialog } from "./components/EmployeeDeleteDialog";
import { EmployeeStats } from "./components/EmployeeStats";
import { ViewToggle } from "./components/ViewToggle";
import { NoCompanyMessage } from "./components/NoCompanyMessage";
import { EmployeeSkeleton } from "./components/EmployeeSkeleton";
import { useEmployees } from "./hooks/useEmployees";
import { Employee } from "@/services/supabase-business-data";

const BusinessEmployees: React.FC = () => {
  const navigate = useNavigate();
  
  // Custom hook to handle all employee data and operations
  const { 
    loading, 
    employees, 
    departments, 
    companyData,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleUpdateEmployeeStatus,
    isDemo
  } = useEmployees();
  
  // Local state for dialogs and view
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Dialog handlers
  const openAddDialog = () => {
    setCurrentEmployee({});
    setIsEditMode(false);
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  const openDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentEmployee({});
  };

  const handleInputChange = (field: string, value: string) => {
    setCurrentEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Form submission
  const handleSubmit = async () => {
    if (isEditMode && currentEmployee.id) {
      const success = await handleUpdateEmployee(currentEmployee.id, currentEmployee);
      if (success) handleDialogClose();
    } else {
      const success = await handleAddEmployee(currentEmployee);
      if (success) handleDialogClose();
    }
  };
  
  // Delete confirmation
  const handleConfirmDelete = async () => {
    if (!employeeToDelete || !employeeToDelete.id) return;
    
    const success = await handleDeleteEmployee(
      employeeToDelete.id, 
      employeeToDelete.full_name || "Employé"
    );
    
    if (success) {
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };
  
  // Loading state
  if (loading) {
    return <EmployeeSkeleton />;
  }
  
  // No company state
  if (!companyData) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={isDemo} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des employés</h1>
          <p className="text-muted-foreground">
            Gérez les membres de votre entreprise et leurs accès
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button onClick={openAddDialog} className="flex-1 md:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>

      <EmployeeStats 
        employees={employees} 
        departments={departments}
        onAddEmployee={openAddDialog}
      />
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <CardTitle>Liste des employés</CardTitle>
            <CardDescription>
              {filteredEmployees.length} employé{filteredEmployees.length !== 1 ? 's' : ''} au total
            </CardDescription>
          </div>
          <ViewToggle view={viewMode} onToggleView={setViewMode} />
        </CardHeader>
        <CardContent>
          <EmployeeFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            departments={departments}
          />
          
          {viewMode === "list" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <EmployeeList
                    employees={filteredEmployees} 
                    onEditEmployee={openEditDialog}
                    onDeleteEmployee={openDeleteDialog}
                    onUpdateEmployeeStatus={handleUpdateEmployeeStatus}
                    companyId={companyData.id}
                  />
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmployeeGrid 
              employees={filteredEmployees}
              onEditEmployee={openEditDialog}
              onDeleteEmployee={openDeleteDialog}
              onUpdateEmployeeStatus={handleUpdateEmployeeStatus}
            />
          )}
        </CardContent>
      </Card>
      
      {/* Employee add/edit dialog */}
      <EmployeeDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        currentEmployee={currentEmployee}
        departments={departments}
        onInputChange={handleInputChange}
      />
      
      {/* Delete confirmation dialog */}
      <EmployeeDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        employee={employeeToDelete}
      />
    </div>
  );
};

export default BusinessEmployees;
