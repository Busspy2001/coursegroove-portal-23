
import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, PlayCircle, Clock, Search } from "lucide-react";
import Footer from "@/components/Footer";

interface FavoriteCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  lastAccessed: Date;
  category: string;
  isFavorite: boolean;
}

const mockFavoriteCourses: FavoriteCourse[] = [
  {
    id: "course-1",
    title: "Introduction au développement web moderne",
    instructor: "Julie Martin",
    thumbnail: "/placeholder.svg",
    progress: 45,
    lastAccessed: new Date(2025, 4, 2),
    category: "Développement Web",
    isFavorite: true
  },
  {
    id: "course-2",
    title: "Design UI/UX pour débutants",
    instructor: "Thomas Dubois",
    thumbnail: "/placeholder.svg",
    progress: 72,
    lastAccessed: new Date(2025, 4, 5),
    category: "Design",
    isFavorite: true
  },
  {
    id: "course-3",
    title: "React.js pour les développeurs",
    instructor: "Sarah Cohen",
    thumbnail: "/placeholder.svg",
    progress: 18,
    lastAccessed: new Date(2025, 4, 8),
    category: "Développement Web",
    isFavorite: true
  }
];

const FavoriteCourseCard = ({ course }: { course: FavoriteCourse }) => {
  const navigate = useNavigate();
  
  const handleRemoveFavorite = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    // Dans une implémentation réelle, on appellerait un service pour retirer le cours des favoris
    console.log(`Removing course ${courseId} from favorites`);
  };

  return (
    <Card
      key={course.id}
      className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 h-48 md:h-auto relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-schoolier-yellow"
            onClick={(e) => handleRemoveFavorite(e, course.id)}
          >
            <Star className="h-5 w-5 fill-current" />
          </Button>
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <span className="text-xs text-schoolier-teal font-medium uppercase tracking-wider">
                {course.category}
              </span>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Par {course.instructor}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Progression</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="default" size="sm" className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-1 text-white" />
              <span className="text-sm">Continuer</span>
            </Button>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">
                Dernier accès: {course.lastAccessed.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Favorites = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Favoris</h1>
            </div>
            
            <div className="container px-6 py-8 flex-grow">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mes cours favoris</h1>
                <p className="text-muted-foreground">
                  Retrouvez rapidement vos cours préférés.
                </p>
              </div>

              <div className="space-y-6">
                {mockFavoriteCourses.length > 0 ? (
                  mockFavoriteCourses.map((course) => (
                    <FavoriteCourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Star className="mx-auto h-16 w-16 text-muted-foreground opacity-40 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucun favori</h3>
                    <p className="text-muted-foreground mb-6">
                      Vous n'avez pas encore ajouté de cours à vos favoris.
                    </p>
                    <Button onClick={() => navigate("/courses")}>
                      <Search className="mr-2 h-4 w-4" />
                      Explorer les cours
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Favorites;
