
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal, 
  FileUp, 
  Download,
  ChevronDown,
  Filter
} from "lucide-react";

const BusinessEmployees = () => {
  // Données fictives des employés
  const employees = [
    { id: 1, name: "Sophie Martin", email: "sophie.martin@exemple.fr", department: "Marketing", role: "Responsable", progress: 85, courses: 8 },
    { id: 2, name: "Thomas Dubois", email: "thomas.dubois@exemple.fr", department: "IT", role: "Développeur", progress: 75, courses: 12 },
    { id: 3, name: "Julie Leclerc", email: "julie.leclerc@exemple.fr", department: "Finance", role: "Comptable", progress: 92, courses: 6 },
    { id: 4, name: "Philippe Moreau", email: "philippe.moreau@exemple.fr", department: "Marketing", role: "Chargé de communication", progress: 68, courses: 4 },
    { id: 5, name: "Marie Dupont", email: "marie.dupont@exemple.fr", department: "RH", role: "Responsable", progress: 94, courses: 9 },
    { id: 6, name: "Antoine Bernard", email: "antoine.bernard@exemple.fr", department: "IT", role: "Admin système", progress: 82, courses: 10 },
    { id: 7, name: "Emma Leroy", email: "emma.leroy@exemple.fr", department: "Ventes", role: "Commerciale", progress: 77, courses: 5 },
    { id: 8, name: "Lucas Gauthier", email: "lucas.gauthier@exemple.fr", department: "Support", role: "Technicien", progress: 80, courses: 7 },
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getDepartmentClass = (dept: string) => {
    const classes: Record<string, string> = {
      "IT": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "RH": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Finance": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "Marketing": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Ventes": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Support": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };

    return classes[dept] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const getProgressClass = (progress: number) => {
    if (progress >= 90) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employés</h1>
          <p className="text-muted-foreground">Gérez les accès et suivez la progression de vos employés.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <FileUp className="mr-2 h-4 w-4" />
                Importer
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Importer CSV</DropdownMenuItem>
              <DropdownMenuItem>Importer XLSX</DropdownMenuItem>
              <DropdownMenuItem>Synchroniser depuis LDAP</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un employé
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un employé..."
            className="pl-8 w-full"
          />
        </div>
        
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
        
        <Button variant="outline" className="w-full md:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="text-center">Progression</TableHead>
              <TableHead className="text-center">Cours suivis</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getDepartmentClass(employee.department)}>{employee.department}</Badge>
                </TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                      <div
                        className={`h-full ${getProgressClass(employee.progress)}`}
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{employee.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{employee.courses}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Éditer</DropdownMenuItem>
                      <DropdownMenuItem>Assigner des cours</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Retirer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BusinessEmployees;
