
import React, { useState } from "react";
import EmployeeLayout from "@/components/employee-dashboard/EmployeeLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeeCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  // Mock data - To be replaced with actual data from Supabase
  const availableCourses = [
    {
      id: "1",
      title: "Leadership et management d'équipe",
      description: "Développez vos compétences en leadership et apprenez à gérer efficacement votre équipe",
      instructor: "Thomas Dubois",
      duration: "8 heures",
      level: "intermédiaire",
      category: "management",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=leadership"
    },
    {
      id: "2",
      title: "Fondamentaux du marketing digital",
      description: "Comprenez les bases du marketing en ligne et créez des stratégies numériques efficaces",
      instructor: "Sophie Martin",
      duration: "10 heures",
      level: "débutant",
      category: "marketing",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=marketing"
    },
    {
      id: "3",
      title: "Intelligence Artificielle pour les entreprises",
      description: "Découvrez comment l'IA peut transformer votre activité et améliorer vos processus",
      instructor: "Marc Lambert",
      duration: "12 heures",
      level: "avancé",
      category: "technologie",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=ia"
    },
    {
      id: "4",
      title: "Gestion du temps et productivité",
      description: "Techniques et outils pour optimiser votre temps et augmenter votre productivité",
      instructor: "Claire Dupont",
      duration: "6 heures",
      level: "débutant",
      category: "développement personnel",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=productivity"
    },
    {
      id: "5",
      title: "Excel avancé pour l'analyse de données",
      description: "Maîtrisez les fonctionnalités avancées d'Excel pour l'analyse et la visualisation de données",
      instructor: "Pierre Moreau",
      duration: "15 heures",
      level: "avancé",
      category: "bureautique",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=excel"
    }
  ];

  // Apply filters
  const filteredCourses = availableCourses.filter(course => {
    // Apply search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== "all" && course.category !== categoryFilter) {
      return false;
    }
    
    // Apply level filter
    if (levelFilter !== "all" && course.level !== levelFilter) {
      return false;
    }
    
    return true;
  });

  // Level badge styling
  const getLevelBadge = (level: string) => {
    switch(level) {
      case "débutant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Débutant</Badge>;
      case "intermédiaire":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Intermédiaire</Badge>;
      case "avancé":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Avancé</Badge>;
      default:
        return null;
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catalogue de formations</h1>
          <p className="text-muted-foreground">
            Découvrez les formations disponibles pour vous
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une formation..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Catégorie" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="technologie">Technologie</SelectItem>
                <SelectItem value="développement personnel">Développement personnel</SelectItem>
                <SelectItem value="bureautique">Bureautique</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={levelFilter} 
              onValueChange={setLevelFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="débutant">Débutant</SelectItem>
                <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="avancé">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="flex flex-col h-full overflow-hidden">
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {getLevelBadge(course.level)}
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{course.instructor}</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-sm">{course.description}</p>
              </CardContent>
              
              <CardFooter className="pt-2 pb-4 flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:w-auto">Détails</Button>
                <Button variant="outline" className="w-full sm:w-auto">Demander accès</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <Card className="w-full">
            <CardContent className="p-6 text-center">
              <div className="py-10">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Aucun résultat</h3>
                <p className="text-muted-foreground">
                  Aucune formation ne correspond à vos critères de recherche.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setLevelFilter("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeCatalog;
