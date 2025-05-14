
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, BookOpen, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const BusinessDepartments = () => {
  // Données fictives pour les départements
  const departments = [
    { id: 1, name: "Marketing", employees: 12, courses: 8, completion: 78, manager: "Marie Leroy" },
    { id: 2, name: "IT", employees: 24, courses: 15, completion: 92, manager: "Julien Dupont" },
    { id: 3, name: "Ressources Humaines", employees: 8, courses: 10, completion: 85, manager: "Sophie Moreau" },
    { id: 4, name: "Finance", employees: 10, courses: 7, completion: 65, manager: "Thomas Bernard" },
    { id: 5, name: "Ventes", employees: 18, courses: 6, completion: 72, manager: "Laura Petit" },
    { id: 6, name: "Support Client", employees: 15, courses: 9, completion: 80, manager: "Nicolas Martin" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Départements</h1>
          <p className="text-muted-foreground">Gérez les départements et leurs formations associées.</p>
        </div>
        <div>
          <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau département
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-schoolier-teal" />
                  {department.name}
                </CardTitle>
              </div>
              <CardDescription>Responsable: {department.manager}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{department.employees} employés</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{department.courses} formations</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Taux de complétion</span>
                  <span className="text-sm font-medium">{department.completion}%</span>
                </div>
                <Progress value={department.completion} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm">Détails</Button>
                <Button variant="outline" size="sm">Assigner formation</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessDepartments;
