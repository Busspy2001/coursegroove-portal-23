
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookPlus, Search, Filter } from "lucide-react";
import { CourseCard } from "./CourseCard";

// Données fictives de cours
const courses = [
  {
    id: 1,
    title: "Introduction à la Cybersécurité",
    description: "Apprenez les bases de la sécurité informatique et protégez vos données sensibles.",
    instructor: "David Bernard",
    duration: "8 heures",
    enrolledCount: 42,
    completionRate: 78,
    category: "IT",
    level: "Débutant",
    thumbnail: ""
  },
  {
    id: 2,
    title: "Excel Avancé pour les Professionnels",
    description: "Maîtrisez les fonctions avancées d'Excel: tableaux croisés dynamiques, macros, et plus encore.",
    instructor: "Marie Dupont",
    duration: "12 heures",
    enrolledCount: 57,
    completionRate: 92,
    category: "Finance",
    level: "Avancé",
    thumbnail: ""
  },
  {
    id: 3,
    title: "Leadership et Management d'équipe",
    description: "Développez vos compétences en leadership pour gérer efficacement des équipes diverses.",
    instructor: "Thomas Lefort",
    duration: "10 heures",
    enrolledCount: 35,
    completionRate: 67,
    category: "Management",
    level: "Intermédiaire",
    thumbnail: ""
  },
  {
    id: 4,
    title: "Communication Efficace en Entreprise",
    description: "Améliorez votre communication interne et externe pour des relations professionnelles optimales.",
    instructor: "Sophie Moreau",
    duration: "6 heures",
    enrolledCount: 29,
    completionRate: 85,
    category: "Communication",
    level: "Débutant",
    thumbnail: ""
  },
  {
    id: 5,
    title: "Stratégies Marketing Digital",
    description: "Découvrez les dernières tendances et stratégies du marketing numérique.",
    instructor: "Julie Legrand",
    duration: "15 heures",
    enrolledCount: 48,
    completionRate: 73,
    category: "Marketing",
    level: "Intermédiaire",
    thumbnail: ""
  },
  {
    id: 6,
    title: "RGPD: Aspects Juridiques et Pratiques",
    description: "Tout ce que vous devez savoir sur la réglementation européenne en matière de protection des données.",
    instructor: "Pierre Martin",
    duration: "4 heures",
    enrolledCount: 62,
    completionRate: 95,
    category: "Juridique",
    level: "Débutant",
    thumbnail: ""
  }
];

const BusinessTrainings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formations disponibles</h1>
          <p className="text-muted-foreground">Parcourez et assignez des formations à vos équipes.</p>
        </div>
        <div>
          <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <BookPlus className="mr-2 h-4 w-4" />
            Ajouter une formation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <CardTitle>Catalogue de formations</CardTitle>
              <CardDescription>
                {courses.length} formations disponibles pour votre entreprise
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-full md:w-[200px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessTrainings;
