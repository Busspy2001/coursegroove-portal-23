
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Users, Award } from "lucide-react";

const BusinessDepartments = () => {
  // Données fictives des départements
  const departments = [
    { 
      id: 1, 
      name: "Marketing",
      employeeCount: 28,
      manager: "Sophie Martin",
      progress: 85,
      badges: ["Top performer", "Most improved"],
      activeCoursesCount: 12,
      completedCoursesCount: 45,
      certifications: 18
    },
    { 
      id: 2, 
      name: "Technologie",
      employeeCount: 32,
      manager: "Thomas Dubois",
      progress: 92,
      badges: ["Top performer"],
      activeCoursesCount: 15,
      completedCoursesCount: 67,
      certifications: 25
    },
    { 
      id: 3, 
      name: "Ressources Humaines",
      employeeCount: 15,
      manager: "Marie Dupont",
      progress: 78,
      badges: [],
      activeCoursesCount: 8,
      completedCoursesCount: 23,
      certifications: 12
    },
    { 
      id: 4, 
      name: "Finance",
      employeeCount: 18,
      manager: "Julie Leclerc",
      progress: 81,
      badges: ["Most participation"],
      activeCoursesCount: 9,
      completedCoursesCount: 31,
      certifications: 14
    },
    { 
      id: 5, 
      name: "Ventes",
      employeeCount: 24,
      manager: "Emma Leroy",
      progress: 76,
      badges: [],
      activeCoursesCount: 11,
      completedCoursesCount: 29,
      certifications: 11
    },
    { 
      id: 6, 
      name: "Support Client",
      employeeCount: 20,
      manager: "Lucas Gauthier",
      progress: 88,
      badges: ["Most improved"],
      activeCoursesCount: 10,
      completedCoursesCount: 35,
      certifications: 15
    }
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getDepartmentColor = (id: number) => {
    const colors = [
      "from-purple-500 to-indigo-600",
      "from-blue-500 to-cyan-600",
      "from-green-500 to-emerald-600",
      "from-yellow-500 to-amber-600",
      "from-pink-500 to-rose-600",
      "from-orange-500 to-red-600"
    ];
    return colors[(id - 1) % colors.length];
  };

  const getBadgeColor = (badge: string) => {
    if (badge === "Top performer") return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (badge === "Most improved") return "bg-green-100 text-green-800 border-green-300";
    if (badge === "Most participation") return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Départements</h1>
          <p className="text-muted-foreground">Gérez vos équipes et suivez leur progression collective.</p>
        </div>
        
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Créer un département
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getDepartmentColor(department.id)}`}></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{department.name}</CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{department.employeeCount} employés</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">{getInitials(department.manager)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{department.manager}</p>
                    <p className="text-xs text-muted-foreground">Responsable</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {department.badges.map((badge, idx) => (
                    <Badge key={idx} className={`${getBadgeColor(badge)} border`}>{badge}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progression globale</span>
                  <span className="font-medium">{department.progress}%</span>
                </div>
                <Progress value={department.progress} />
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="space-y-1 text-center p-2 bg-gray-50 rounded-md">
                  <p className="text-xl font-semibold">{department.activeCoursesCount}</p>
                  <p className="text-xs text-muted-foreground">Cours actifs</p>
                </div>
                <div className="space-y-1 text-center p-2 bg-gray-50 rounded-md">
                  <p className="text-xl font-semibold">{department.completedCoursesCount}</p>
                  <p className="text-xs text-muted-foreground">Cours terminés</p>
                </div>
                <div className="space-y-1 text-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-center">
                    <Award className="h-4 w-4 mr-1 text-amber-500" />
                    <p className="text-xl font-semibold">{department.certifications}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Certifications</p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Gérer le département
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessDepartments;
