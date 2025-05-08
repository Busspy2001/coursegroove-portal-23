
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/use-user-data";
import CourseCard from "@/components/dashboard/CourseCard";
import EmptyCourseState from "@/components/dashboard/EmptyCourseState";
import { Loader2, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyCourses = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, enrolledCourses } = useUserData();
  const [searchTerm, setSearchTerm] = React.useState("");
  
  // Filter courses based on search term
  const filteredCourses = React.useMemo(() => {
    if (!searchTerm.trim()) return enrolledCourses;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return enrolledCourses.filter(course => 
      course.title.toLowerCase().includes(lowercaseSearch) || 
      course.instructor.toLowerCase().includes(lowercaseSearch)
    );
  }, [enrolledCourses, searchTerm]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement de vos cours...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              Mes cours
            </h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous vos cours en un seul endroit.
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate("/courses")}
          >
            Explorer plus de cours
          </Button>
        </div>
        
        {/* Search and filter */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher dans mes cours..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Course list */}
        <div className="space-y-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            searchTerm ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium">Aucun cours ne correspond à votre recherche</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Essayez avec des termes différents ou supprimez les filtres.
                </p>
              </div>
            ) : (
              <EmptyCourseState />
            )
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyCourses;
