
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
import { EmployeePagination } from "./components/EmployeePagination";
import { useEmployees } from "./hooks/useEmployees";
import { Employee } from "@/services/supabase-business-data";

const BusinessEmployees: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
  
  // Local state for dialogs, view, and pagination
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
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
  
  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        
        {isMobile ? (
          <Button onClick={openAddDialog} className="fixed bottom-6 right-6 rounded-full shadow-lg z-10">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        ) : (
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
        )}
      </div>

      {!isMobile && (
        <EmployeeStats 
          employees={employees} 
          departments={departments}
          onAddEmployee={openAddDialog}
        />
      )}
      
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
            <div className="rounded-md border overflow-x-auto">
              <EmployeeList 
                employees={currentEmployees} 
                onEditEmployee={openEditDialog}
                onDeleteEmployee={openDeleteDialog}
                onUpdateEmployeeStatus={handleUpdateEmployeeStatus}
                companyId={companyData.id}
              />
            </div>
          ) : (
            <EmployeeGrid 
              employees={currentEmployees}
              onEditEmployee={openEditDialog}
              onDeleteEmployee={openDeleteDialog}
              onUpdateEmployeeStatus={handleUpdateEmployeeStatus}
            />
          )}
          
          {filteredEmployees.length > itemsPerPage && (
            <div className="mt-4">
              <EmployeePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
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
