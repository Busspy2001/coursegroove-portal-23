import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit2, 
  Eye, 
  Users, 
  Star, 
  BarChart2,
  Clock,
  Plus
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
  total_students: number;
  average_rating: number;
  total_lessons: number;
  duration: string;
  price: number;
}

interface InstructorCoursesListProps {
  courses: Course[];
}

const InstructorCoursesList: React.FC<InstructorCoursesListProps> = ({ courses }) => {
  const navigate = useNavigate();

  // Status badge color mapping
  const statusColors = {
    draft: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  };

  const statusNames = {
    draft: "Brouillon",
    published: "Publié",
    archived: "Archivé"
  };

  // If no courses yet, show empty state
  if (!courses || courses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-md">
            <BookIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Créez votre premier cours</h3>
            <p className="text-muted-foreground mb-6">
              Partagez votre expertise avec le monde entier et commencez à générer des revenus.
            </p>
            <Button 
              onClick={() => navigate("/instructor/courses/create")}
              className="flex items-center mx-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Créer un cours
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <img
                src={course.thumbnail_url || "https://via.placeholder.com/300x200?text=Thumbnail"}
                alt={course.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            
            <div className="md:col-span-3 p-6 space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </div>
                <Badge className={statusColors[course.status]}>
                  {statusNames[course.status]}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.total_students} étudiants</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-sm">{course.average_rating || "-"} ({course.total_students > 0 ? "avis" : "aucun avis"})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{course.total_lessons} leçons</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  Mis à jour {formatDistanceToNow(new Date(course.updated_at), { addSuffix: true, locale: fr })}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Aperçu
                  </Button>
                  <Button size="sm" onClick={() => navigate(`/instructor/courses/edit/${course.id}`)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => navigate("/instructor/courses/create")}
          variant="outline"
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Créer un nouveau cours
        </Button>
      </div>
    </div>
  );
};

// Book icon for empty state
const BookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

export default InstructorCoursesList;
