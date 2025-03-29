
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { allCourses, categories } from "@/data/courseData";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter courses based on the selected filters
  const filteredCourses = allCourses.filter((course) => {
    // Search term filter
    if (
      searchTerm &&
      !course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Category filter
    if (selectedCategory && course.category !== selectedCategory) {
      return false;
    }
    
    // Level filter
    if (selectedLevel && course.level !== selectedLevel) {
      return false;
    }
    
    // Price range filter
    if (course.price < priceRange[0] || course.price > priceRange[1]) {
      return false;
    }
    
    // Free courses only filter
    if (showFreeOnly && course.price !== 0) {
      return false;
    }
    
    return true;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLevel("");
    setPriceRange([0, 100]);
    setShowFreeOnly(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tous les cours</h1>
          <p className="text-muted-foreground mt-2">
            Explorez notre catalogue complet de cours pour trouver la formation idéale
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un cours, un instructeur..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="md:w-auto w-full flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtres
              {(selectedCategory || selectedLevel || showFreeOnly || priceRange[0] > 0 || priceRange[1] < 100) && (
                <div className="ml-2 h-2 w-2 rounded-full bg-schoolier-blue"></div>
              )}
            </Button>
            {(searchTerm || selectedCategory || selectedLevel || showFreeOnly || priceRange[0] > 0 || priceRange[1] < 100) && (
              <Button
                variant="ghost"
                className="md:w-auto w-full"
                onClick={resetFilters}
              >
                <X className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            )}
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label className="mb-2 block">Catégorie</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Niveau</Label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les niveaux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous les niveaux</SelectItem>
                      <SelectItem value="débutant">Débutant</SelectItem>
                      <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Prix (€)</Label>
                  <div className="pt-6">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free-only"
                      checked={showFreeOnly}
                      onCheckedChange={(checked) => setShowFreeOnly(checked as boolean)}
                    />
                    <Label htmlFor="free-only">Cours gratuits uniquement</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Course Categories Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="w-full max-w-full flex overflow-x-auto pb-px">
            <TabsTrigger value="all" className="flex-shrink-0">Tous</TabsTrigger>
            {categories.slice(0, 7).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex-shrink-0"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon} {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Search Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredCourses.length} cours trouvés
          </p>
        </div>
        
        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Aucun cours trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos filtres ou d'effectuer une recherche différente.
            </p>
            <Button onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;
