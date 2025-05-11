
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useUserData } from "@/hooks/use-user-data";
import CourseCard from "@/components/dashboard/CourseCard";
import EmptyCourseState from "@/components/dashboard/EmptyCourseState";
import { Loader2, BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnrolledCourse } from "@/types/user-data";
import { motion } from "framer-motion";

// Sort types
type SortOption = "recent" | "progress" | "title";

const MyCourses = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, enrolledCourses } = useUserData();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortOption>("recent");
  const isMobile = useIsMobile();
  
  // Filter and sort courses
  const processedCourses = React.useMemo(() => {
    // First apply search filter
    let result = enrolledCourses;
    
    if (searchTerm.trim()) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(lowercaseSearch) || 
        course.instructor.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Then apply sorting
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.lastAccessed.getTime() - a.lastAccessed.getTime();
        case "progress":
          return b.progress - a.progress;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [enrolledCourses, searchTerm, sortBy]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement de vos cours...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        {!isMobile && <StudentSidebar />}
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen pb-16 md:pb-0">
            <div className="flex items-center p-4 border-b">
              {!isMobile && <SidebarTrigger className="mr-4" />}
              <h1 className="text-xl font-semibold">Mes cours</h1>
            </div>
            
            <div className="container px-4 md:px-6 py-6 md:py-8 flex-grow">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
              >
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                    Mes cours
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Gérez et suivez tous vos cours en un seul endroit.
                  </p>
                </div>
                <Button 
                  className="mt-4 md:mt-0" 
                  size={isMobile ? "sm" : "default"}
                  onClick={() => navigate("/courses")}
                >
                  Explorer plus de cours
                </Button>
              </motion.div>
              
              {/* Search and filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher dans mes cours..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select onValueChange={handleSortChange} defaultValue={sortBy}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récent</SelectItem>
                      <SelectItem value="progress">Progression</SelectItem>
                      <SelectItem value="title">Alphabétique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Courses list */}
              <div className="space-y-4 md:space-y-6">
                {processedCourses.length > 0 ? (
                  processedCourses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))
                ) : (
                  searchTerm ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-lg font-medium">Aucun cours ne correspond à votre recherche</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Essayez avec des termes différents ou supprimez les filtres.
                      </p>
                    </motion.div>
                  ) : (
                    <EmptyCourseState />
                  )
                )}
              </div>
            </div>
            
            {!isMobile && <Footer />}
          </div>
        </SidebarInset>
        
        {isMobile && <BottomNavigation />}
      </div>
    </SidebarProvider>
  );
};

export default MyCourses;
