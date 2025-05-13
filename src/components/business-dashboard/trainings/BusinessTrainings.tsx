
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  PlusCircle,
  BookOpen,
  Clock,
  BarChart,
  FileUp
} from "lucide-react";
import { CourseCard } from "./CourseCard";

const BusinessTrainings = () => {
  // État pour les onglets
  const [activeTab, setActiveTab] = useState("all");

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
      level: "Débutant",
      thumbnail: ""
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
      level: "Intermédiaire",
      thumbnail: ""
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
      level: "Avancé",
      thumbnail: ""
    },
    {
      id: 4,
      title: "Communication efficace en entreprise",
      description: "Améliorez votre communication interne et externe",
      instructor: "Philippe Moreau",
      duration: "2h 00min",
      enrolledCount: 64,
      completionRate: 81,
      category: "Communication",
      level: "Débutant",
      thumbnail: ""
    },
    {
      id: 5,
      title: "Stratégies marketing digital",
      description: "Les dernières tendances et outils du marketing en ligne",
      instructor: "Sophie Martin",
      duration: "5h 30min",
      enrolledCount: 49,
      completionRate: 75,
      category: "Marketing",
      level: "Intermédiaire",
      thumbnail: ""
    },
    {
      id: 6,
      title: "RGPD et conformité des données",
      description: "Comprendre et appliquer les règles du RGPD",
      instructor: "Antoine Bernard",
      duration: "3h 15min",
      enrolledCount: 51,
      completionRate: 85,
      category: "Juridique",
      level: "Intermédiaire",
      thumbnail: ""
    }
  ];
  
  // Filtrer les cours en fonction de l'onglet actif
  const filteredCourses = courses.filter(course => {
    if (activeTab === "all") return true;
    if (activeTab === "required") return course.completionRate < 80;
    if (activeTab === "popular") return course.enrolledCount > 50;
    if (activeTab === "new") return course.id > 4; // Simuler des cours récents
    return true;
  });
  
  // Catégories disponibles (pour les filtres)
  const categories = ["IT", "Management", "Finance", "Communication", "Marketing", "Juridique"];
  
  // Niveaux disponibles (pour les filtres)
  const levels = ["Débutant", "Intermédiaire", "Avancé"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formations</h1>
          <p className="text-muted-foreground">Gérez le catalogue de formations pour vos employés.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Importer un cours
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un cours
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un cours..."
            className="pl-8 w-full"
          />
        </div>
        
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
        
        <div className="flex flex-wrap gap-2 ml-auto">
          {categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="outline">{category}</Badge>
          ))}
          <Badge variant="outline">+{categories.length - 3}</Badge>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous les cours</TabsTrigger>
          <TabsTrigger value="required">Requis</TabsTrigger>
          <TabsTrigger value="popular">Populaires</TabsTrigger>
          <TabsTrigger value="new">Récents</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <BookOpen className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cours disponibles</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Clock className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Heures de formation</p>
                <p className="text-2xl font-bold">21h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <BarChart className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taux de complétion</p>
                <p className="text-2xl font-bold">79%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessTrainings;
