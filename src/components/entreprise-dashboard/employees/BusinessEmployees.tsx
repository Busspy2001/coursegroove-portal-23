
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import {
  Card,
  CardContent,
  CardDescription,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  GraduationCap,
  MailIcon,
  ShieldCheck,
  ShieldX,
  Briefcase,
} from "lucide-react";
import { 
  fetchCompanyData, 
  fetchEmployees, 
  fetchDepartments,
  addEmployee,
  updateEmployee,
  removeEmployee,
  type Employee,
  type Department
} from "@/services/supabase-business-data";

const BusinessEmployees = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // État pour la boîte de dialogue d'ajout/modification d'employé
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee>>({});
  
  // État pour la boîte de dialogue de confirmation de suppression
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  
  // État pour le filtre de département
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const company = await fetchCompanyData();
        setCompanyData(company);
        
        if (company) {
          const employeesData = await fetchEmployees(company.id);
          setEmployees(employeesData);
          
          const departmentsData = await fetchDepartments(company.id);
          setDepartments(departmentsData);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données des employés.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
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
  
  const handleAddEmployee = async () => {
    if (!companyData) return;
    
    try {
      if (!currentEmployee.full_name || !currentEmployee.email) {
        toast({
          title: "Information manquante",
          description: "Le nom et l'email sont requis.",
          variant: "destructive",
        });
        return;
      }
      
      let result;
      if (isEditMode && currentEmployee.id) {
        result = await updateEmployee(companyData.id, currentEmployee.id, currentEmployee);
      } else {
        result = await addEmployee(companyData.id, currentEmployee);
      }
      
      if (result) {
        // Rafraîchir la liste des employés
        const updatedEmployees = await fetchEmployees(companyData.id);
        setEmployees(updatedEmployees);
        
        toast({
          title: isEditMode ? "Employé modifié" : "Employé ajouté",
          description: `${currentEmployee.full_name} a été ${isEditMode ? "modifié" : "ajouté"} avec succès.`,
        });
        
        handleDialogClose();
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: `Impossible de ${isEditMode ? "modifier" : "ajouter"} l'employé.`,
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteEmployee = async () => {
    if (!companyData || !employeeToDelete || !employeeToDelete.id) return;
    
    try {
      const result = await removeEmployee(
        companyData.id,
        employeeToDelete.id,
        employeeToDelete.full_name || "Employé"
      );
      
      if (result) {
        // Rafraîchir la liste des employés
        const updatedEmployees = await fetchEmployees(companyData.id);
        setEmployees(updatedEmployees);
        
        setIsDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'employé.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setCurrentEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Filtrer les employés en fonction de la recherche et du département
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchQuery.trim() === "" || 
      (employee.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       employee.email?.toLowerCase().includes(searchQuery.toLowerCase()));
       
    const matchesDepartment = departmentFilter === "all" || 
      employee.department_id === departmentFilter;
      
    return matchesSearch && matchesDepartment;
  });
  
  // Calculer des statistiques simples
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-40" />
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
          <h1 className="text-2xl font-bold tracking-tight">Gestion des employés</h1>
          <p className="text-muted-foreground">
            Gérez les membres de votre entreprise et leurs accès
          </p>
        </div>
        
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un employé
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total employés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalEmployees > 0 
                ? `${activeEmployees} employés actifs (${Math.round((activeEmployees/totalEmployees)*100)}%)` 
                : "Aucun employé"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Départements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {departments.length === 0 ? "Aucun département" : departments.length === 1 ? "1 département" : `${departments.length} départements`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" size="sm" onClick={openAddDialog}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              Ajouter employé
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/entreprise/formations/assigner")}>
              <GraduationCap className="mr-1 h-3.5 w-3.5" />
              Assigner formation
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/entreprise/departements")}>
              <Briefcase className="mr-1 h-3.5 w-3.5" />
              Voir départements
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des employés</CardTitle>
          <CardDescription>
            {filteredEmployees.length} employé{filteredEmployees.length !== 1 ? 's' : ''} au total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un employé..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select 
                value={departmentFilter} 
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Départements</SelectLabel>
                    <SelectItem value="all">Tous les départements</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="none">Sans département</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
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
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Aucun employé trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
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
                            <DropdownMenuItem onClick={() => openEditDialog(employee)}>
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
                            <DropdownMenuItem onClick={() => {
                              handleInputChange('status', employee.status === 'active' ? 'inactive' : 'active');
                              updateEmployee(companyData.id, employee.id, {
                                ...employee,
                                status: employee.status === 'active' ? 'inactive' : 'active'
                              }).then(async () => {
                                const updatedEmployees = await fetchEmployees(companyData.id);
                                setEmployees(updatedEmployees);
                              });
                            }}>
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
                              onClick={() => openDeleteDialog(employee)}
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
      </Card>
      
      {/* Dialogue d'ajout/modification d'employé */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                onChange={(e) => handleInputChange("full_name", e.target.value)}
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
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                onValueChange={(value) => handleInputChange("department_id", value)}
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
                onChange={(e) => handleInputChange("job_title", e.target.value)}
              />
            </div>
            
            {isEditMode && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <Select
                  value={currentEmployee.status || "active"}
                  onValueChange={(value) => handleInputChange("status", value)}
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
            <Button variant="outline" onClick={handleDialogClose}>
              Annuler
            </Button>
            <Button onClick={handleAddEmployee}>
              {isEditMode ? "Mettre à jour" : "Ajouter"}
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
              Cette action supprimera définitivement l'employé {employeeToDelete?.full_name} de votre entreprise.
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEmployee} className="bg-red-600 focus:ring-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BusinessEmployees;
