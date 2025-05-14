
import React from "react";
import EmployeeLayout from "@/components/employee-dashboard/EmployeeLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Calendar } from "lucide-react";

const EmployeeCourses = () => {
  // Mock data - To be replaced with actual data from Supabase
  const assignedCourses = [
    {
      id: "1",
      title: "Introduction à la cybersécurité",
      description: "Les fondamentaux de la sécurité informatique pour entreprises",
      instructor: "Marie Dupont",
      deadline: "2025-06-30",
      progress: 65,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=cybersecurity",
      status: "in_progress"
    },
    {
      id: "2",
      title: "Communication efficace en entreprise",
      description: "Techniques et outils pour améliorer la communication professionnelle",
      instructor: "Jean Martin",
      deadline: "2025-06-15",
      progress: 25,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=communication",
      status: "in_progress"
    },
    {
      id: "3",
      title: "Gestion de projet avancée",
      description: "Méthodologies modernes pour gérer des projets complexes",
      instructor: "Sophie Lefèvre",
      deadline: "2025-07-10",
      progress: 0,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=projectmanagement",
      status: "not_started"
    }
  ];

  const completedCourses = [
    {
      id: "4",
      title: "Fondamentaux du marketing digital",
      description: "Bases du marketing en ligne et stratégies numériques",
      instructor: "Pierre Durand",
      completedDate: "2025-05-01",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=marketing"
    },
    {
      id: "5",
      title: "Excel pour professionnels",
      description: "Maîtriser les fonctions avancées et l'analyse de données",
      instructor: "Lucie Bernard",
      completedDate: "2025-04-15",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=excel"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>;
      case "not_started":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Non commencé</Badge>;
      default:
        return null;
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Formations</h1>
          <p className="text-muted-foreground">
            Consultez et poursuivez vos formations assignées
          </p>
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="assigned">Formations assignées</TabsTrigger>
            <TabsTrigger value="completed">Formations complétées</TabsTrigger>
          </TabsList>
          
          {/* Assigned Courses Tab */}
          <TabsContent value="assigned" className="space-y-4">
            {assignedCourses.map(course => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-36 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">Instructeur: {course.instructor}</p>
                        </div>
                        {getStatusBadge(course.status)}
                      </div>
                      
                      <p className="text-sm">{course.description}</p>
                      
                      <div className="pt-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Progress value={course.progress} className="h-2 w-32 mr-2" />
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Échéance: {new Date(course.deadline).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button size="sm" className="sm:w-auto">
                            {course.progress > 0 ? "Continuer" : "Commencer"}
                          </Button>
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            Détails
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {assignedCourses.length === 0 && (
              <Card className="w-full">
                <CardContent className="p-6 text-center">
                  <div className="py-10">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucune formation assignée</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez actuellement aucune formation en cours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Completed Courses Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedCourses.map(course => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-36 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">Instructeur: {course.instructor}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>
                      </div>
                      
                      <p className="text-sm">{course.description}</p>
                      
                      <div className="pt-2">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Complété le {new Date(course.completedDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            Voir le certificat
                          </Button>
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            Revisiter le cours
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {completedCourses.length === 0 && (
              <Card className="w-full">
                <CardContent className="p-6 text-center">
                  <div className="py-10">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucune formation complétée</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore terminé de formation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeCourses;
