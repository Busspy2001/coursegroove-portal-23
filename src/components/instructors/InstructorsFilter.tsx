
import React, { useState } from "react";
import { InstructorCard } from "./InstructorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronDown, Filter, Star } from "lucide-react";

export const InstructorsFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState([4]); // Default minimum rating

  // Mock data
  const instructors = [
    {
      id: 5,
      name: "Philippe Durand",
      role: "Expert en Cybersécurité",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      students: 7623,
      courses: 4
    },
    {
      id: 6,
      name: "Julie Moreau",
      role: "Experte en Data Science",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      students: 10478,
      courses: 7,
      badge: "Populaire"
    },
    {
      id: 7,
      name: "Éric Lambert",
      role: "Coach en Leadership",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      students: 8952,
      courses: 5
    },
    {
      id: 8,
      name: "Nathalie Robert",
      role: "Experte en Comptabilité",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      students: 6210,
      courses: 3
    },
    {
      id: 9,
      name: "Laurent Girard",
      role: "Expert en E-commerce",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      students: 8764,
      courses: 6,
      badge: "Recommandé"
    },
    {
      id: 10,
      name: "Caroline Dubois",
      role: "Spécialiste en SEO",
      avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      students: 9231,
      courses: 5
    },
    {
      id: 11,
      name: "Michel Lefèvre",
      role: "Expert en Gestion de Projet",
      avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      students: 7415,
      courses: 4
    },
    {
      id: 12,
      name: "Isabelle Mercier",
      role: "Formatrice en Communication",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      students: 11250,
      courses: 8,
      badge: "Top Formateur"
    }
  ];

  return (
    <section className="py-16" id="all-instructors">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">Tous les formateurs</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow sm:max-w-xs">
              <Select defaultValue="popular">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularité</SelectItem>
                  <SelectItem value="rating">Évaluation</SelectItem>
                  <SelectItem value="courses">Nombre de cours</SelectItem>
                  <SelectItem value="students">Nombre d'étudiants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filtres
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="development">Développement</SelectItem>
                  <SelectItem value="business">Business & Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="video">Vidéo & Photo</SelectItem>
                  <SelectItem value="languages">Langues</SelectItem>
                  <SelectItem value="personal">Développement Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Évaluation minimum</label>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <Slider 
                    defaultValue={[4]} 
                    max={5} 
                    step={0.1} 
                    onValueChange={setMinRating}
                  />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{minRating}</span>
                  <span className="text-muted-foreground">+</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Langue d'enseignement</label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les langues</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">Anglais</SelectItem>
                  <SelectItem value="es">Espagnol</SelectItem>
                  <SelectItem value="de">Allemand</SelectItem>
                  <SelectItem value="it">Italien</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="px-8" variant="outline">
            Charger plus de formateurs
          </Button>
        </div>
      </div>
    </section>
  );
};
