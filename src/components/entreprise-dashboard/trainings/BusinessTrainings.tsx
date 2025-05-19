
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { useNavigate } from "react-router-dom";
import { Search, Filter, PlusCircle, BookOpen, Clock, Award } from "lucide-react";

const BusinessTrainings: React.FC = () => {
  const { currentUser } = useAuth();
  const { companyData, loading, stats } = useCompanyData(currentUser);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Données fictives des formations
  const courses = [
    {
      id: 1,
      title: "Introduction à la cybersécurité",
      description: "Les fondamentaux de la sécurité informatique pour tous les employés",
      instructor: "Thomas Dubois",
      duration: "2h 30min",
      enrolledCount: 56,
      completionRate: 78,
      category: "IT",
      level: "Débutant"
    },
    {
      id: 2,
      title: "Leadership et management d'équipe",
      description: "Développer des compétences de leader efficace",
      instructor: "Marie Dupont",
      duration: "4h 15min",
      enrolledCount: 42,
      completionRate: 65,
      category: "Management",
      level: "Intermédiaire"
    },
    {
      id: 3,
      title: "Excel avancé pour l'analyse financière",
      description: "Maîtrisez les tableaux croisés dynamiques et les formules avancées",
      instructor: "Julie Leclerc",
      duration: "3h 45min",
      enrolledCount: 38,
      completionRate: 92,
      category: "Finance",
      level: "Avancé"
    }
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!companyData) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={currentUser?.is_demo === true} />;
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeTab === 'all') return true;
    if (activeTab === 'required') return course.completionRate < 70;
    if (activeTab === 'popular') return course.enrolledCount > 50;
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Formations</h1>
        <p className="text-muted-foreground">
          Gérez les formations disponibles pour vos employés
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une formation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une formation
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Toutes les formations</TabsTrigger>
          <TabsTrigger value="required">Obligatoires</TabsTrigger>
          <TabsTrigger value="popular">Populaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{course.category}</Badge>
                    <Badge className={course.completionRate > 80 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {course.completionRate}% complétion
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <Award className="mr-1 h-4 w-4" />
                        {course.level}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Formateur: {course.instructor}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Aucune formation trouvée</h3>
              <p className="text-muted-foreground mt-2">
                Essayez de modifier vos critères de recherche ou ajoutez de nouvelles formations.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total des formations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux moyen de complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(courses.reduce((sum, course) => sum + course.completionRate, 0) / courses.length)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Heures de formation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10h 30min</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessTrainings;
