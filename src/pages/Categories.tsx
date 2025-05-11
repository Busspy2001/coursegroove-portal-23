
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Filter } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { allCourses } from "@/data/courseData";
import { motion } from "framer-motion";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter courses based on active category and search term
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? course.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName === activeCategory ? null : categoryName);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-schoolier-blue/10 to-schoolier-teal/10 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Explorez nos catégories de cours
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Découvrez des milliers de cours dans différentes catégories, enseignés par des experts du domaine
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Recherchez une catégorie ou un sujet..."
                className="pl-10 h-12 rounded-full border-2 border-schoolier-blue/20 focus-visible:ring-schoolier-teal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Toutes les catégories</h2>
            <p className="text-gray-600">Sélectionnez une catégorie pour explorer ses cours</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeCategory === category.name 
                    ? "bg-schoolier-blue text-white shadow-lg" 
                    : "bg-white hover:bg-schoolier-blue/5 border border-gray-200"
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-center">{category.name}</h3>
                <p className={`text-sm text-center mt-1 ${activeCategory === category.name ? "text-white/80" : "text-gray-500"}`}>
                  {category.coursesCount} cours
                </p>
                {activeCategory === category.name && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-schoolier-teal">Sélectionné</Badge>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {activeCategory 
                  ? `Cours en ${activeCategory}` 
                  : searchTerm 
                    ? "Résultats de recherche" 
                    : "Cours populaires"}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredCourses.length} cours trouvés
              </p>
            </div>
            {activeCategory && (
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory(null)}
              >
                Voir toutes les catégories
              </Button>
            )}
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.slice(0, 8).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Aucun cours trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier votre recherche ou explorez d'autres catégories
              </p>
              {activeCategory && (
                <Button onClick={() => setActiveCategory(null)}>
                  Réinitialiser la catégorie
                </Button>
              )}
            </div>
          )}
          
          {filteredCourses.length > 8 && (
            <div className="mt-10 text-center">
              <Link to="/courses">
                <Button className="px-6">
                  Voir tous les cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-schoolier-teal to-schoolier-blue text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ne trouvez-vous pas ce que vous cherchez ?</h2>
            <p className="text-lg opacity-90 mb-8">
              Nous ajoutons constamment de nouveaux cours et catégories. Faites-nous savoir ce que vous aimeriez apprendre !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contactez-nous
                </Button>
              </Link>
              <Link to="/teach">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-schoolier-blue">
                  Devenir instructeur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;
