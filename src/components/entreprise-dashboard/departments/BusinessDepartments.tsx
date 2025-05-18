
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Building,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import {
  fetchCompanyData,
  fetchDepartments,
  fetchEmployees,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  type Department,
  type Employee
} from "@/services/supabase-business-data";

const BusinessDepartments = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // État pour la boîte de dialogue d'ajout/modification de département
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Partial<Department>>({});
  
  // État pour la boîte de dialogue de confirmation de suppression
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const company = await fetchCompanyData();
        setCompanyData(company);
        
        if (company) {
          const departmentsData = await fetchDepartments(company.id);
          setDepartments(departmentsData);
          
          const employeesData = await fetchEmployees(company.id);
          setEmployees(employeesData);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les départements.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const openAddDialog = () => {
    setCurrentDepartment({});
    setIsEditMode(false);
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (department: Department) => {
    setCurrentDepartment(department);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  const openDeleteDialog = (department: Department) => {
    setDepartmentToDelete(department);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentDepartment({});
  };
  
  const handleAddDepartment = async () => {
    if (!companyData) return;
    
    try {
      if (!currentDepartment.name) {
        toast({
          title: "Information manquante",
          description: "Le nom du département est requis.",
          variant: "destructive",
        });
        return;
      }
      
      const result = isEditMode
        ? await updateDepartment(currentDepartment.id!, currentDepartment)
        : await createDepartment(companyData.id, currentDepartment);
      
      if (result) {
        // Rafraîchir la liste des départements
        const updatedDepartments = await fetchDepartments(companyData.id);
        setDepartments(updatedDepartments);
        
        toast({
          title: isEditMode ? "Département modifié" : "Département créé",
          description: `Le département ${currentDepartment.name} a été ${isEditMode ? "modifié" : "créé"} avec succès.`,
        });
        
        handleDialogClose();
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: `Impossible de ${isEditMode ? "modifier" : "créer"} le département.`,
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteDepartment = async () => {
    if (!departmentToDelete) return;
    
    try {
      const result = await deleteDepartment(
        departmentToDelete.id,
        departmentToDelete.name
      );
      
      if (result) {
        // Rafraîchir la liste des départements
        const updatedDepartments = await fetchDepartments(companyData.id);
        setDepartments(updatedDepartments);
        
        setIsDeleteDialogOpen(false);
        setDepartmentToDelete(null);
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le département.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setCurrentDepartment(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Filtrer les départements en fonction de la recherche
  const filteredDepartments = departments.filter(department =>
    searchQuery.trim() === "" ||
    department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.manager_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculer le nombre total d'employés par département
  const getDepartmentEmployees = (departmentId: string) => {
    return employees.filter(emp => emp.department_id === departmentId);
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!companyData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-lg w-full text-center space-y-4">
          <div className="mx-auto bg-amber-100 rounded-full p-3 w-fit">
            <Briefcase className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-amber-800">Aucune entreprise associée</h2>
          <p className="text-amber-700">
            Vous n'avez pas encore d'entreprise configurée dans votre compte.
            Veuillez contacter un administrateur pour configurer votre espace entreprise.
          </p>
          <div className="pt-4">
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Contacter le support
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Départements</h1>
          <p className="text-muted-foreground">
            Gérez les départements de votre entreprise
          </p>
        </div>
        
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Créer un département
        </Button>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total départements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Employés affectés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.filter(e => e.department_id !== null).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {employees.length > 0
                ? `${Math.round((employees.filter(e => e.department_id !== null).length / employees.length) * 100)}% des employés`
                : "Aucun employé"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Employés sans département</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.filter(e => e.department_id === null).length}
            </div>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs" 
              onClick={() => navigate("/entreprise/employes")}
            >
              Voir les employés
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des départements</CardTitle>
          <CardDescription>
            {departments.length} département{departments.length !== 1 ? 's' : ''} dans votre entreprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un département..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Employés</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      {searchQuery ? "Aucun département correspondant trouvé" : "Aucun département"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div>{department.name}</div>
                            {department.description && (
                              <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                                {department.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {department.manager_name !== "Non assigné" ? (
                          <Badge variant="outline" className="font-normal">
                            {department.manager_name}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">Non assigné</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {getDepartmentEmployees(department.id).length}
                          </span>
                        </div>
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
                            <DropdownMenuItem onClick={() => openEditDialog(department)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => navigate(`/entreprise/employes?dept=${department.id}`)}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              <span>Voir les employés</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(department)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {departments.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Créer un nouveau département
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {/* Dialogue d'ajout/modification de département */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Modifier un département" : "Créer un département"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Modifiez les informations de ce département." 
                : "Créez un nouveau département pour votre entreprise."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                placeholder="Nom du département"
                className="col-span-3"
                value={currentDepartment.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Description du département"
                className="col-span-3"
                value={currentDepartment.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manager" className="text-right">
                Responsable
              </Label>
              <Select
                value={currentDepartment.manager_id || ""}
                onValueChange={(value) => handleInputChange("manager_id", value)}
              >
                <SelectTrigger id="manager" className="col-span-3">
                  <SelectValue placeholder="Choisir un responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucun responsable</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Annuler
            </Button>
            <Button onClick={handleAddDepartment}>
              {isEditMode ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement le département "{departmentToDelete?.name}".
              {getDepartmentEmployees(departmentToDelete?.id || "").length > 0 && (
                <strong className="block mt-2 text-red-600">
                  Attention: {getDepartmentEmployees(departmentToDelete?.id || "").length} employé(s) sont actuellement assignés à ce département.
                </strong>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDepartment} className="bg-red-600 focus:ring-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BusinessDepartments;
