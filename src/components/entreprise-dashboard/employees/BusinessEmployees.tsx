
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, FileSpreadsheet, Filter } from "lucide-react";

const BusinessEmployees = () => {
  // Données fictives pour les employés
  const employees = [
    { id: 1, name: "Sophie Martin", email: "sophie.martin@example.com", department: "IT", role: "Développeur", coursesCompleted: 7, coursesInProgress: 2, status: "Actif" },
    { id: 2, name: "Thomas Dubois", email: "thomas.dubois@example.com", department: "RH", role: "Manager", coursesCompleted: 5, coursesInProgress: 1, status: "Actif" },
    { id: 3, name: "Julie Leclerc", email: "julie.leclerc@example.com", department: "Finance", role: "Comptable", coursesCompleted: 4, coursesInProgress: 3, status: "Actif" },
    { id: 4, name: "Philippe Moreau", email: "philippe.moreau@example.com", department: "Marketing", role: "Designer", coursesCompleted: 6, coursesInProgress: 0, status: "Inactif" },
    { id: 5, name: "Emma Blanc", email: "emma.blanc@example.com", department: "Ventes", role: "Commercial", coursesCompleted: 8, coursesInProgress: 1, status: "Actif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des employés</h1>
          <p className="text-muted-foreground">Gérez votre personnel et leurs formations.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un employé
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Importer CSV
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Liste des employés</span>
          </CardTitle>
          <CardDescription>Total: {employees.length} employés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead className="text-center">Formations complétées</TableHead>
                  <TableHead className="text-center">En cours</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell className="text-center">{employee.coursesCompleted}</TableCell>
                    <TableCell className="text-center">{employee.coursesInProgress}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        employee.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Actions</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEmployees;
