
import React from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import InstructorCoursesList from "@/components/instructor/InstructorCoursesList";
import { useInstructorData } from "@/hooks/use-instructor-data";
import { InstructorCourse } from "@/hooks/use-instructor-data";
import { Course } from "@/components/instructor/InstructorCoursesList";

const InstructorCourses = () => {
  const navigate = useNavigate();
  const { loading, courses } = useInstructorData();

  // Adapter les cours pour qu'ils correspondent à l'interface Course attendue par InstructorCoursesList
  const adaptedCourses = React.useMemo(() => {
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.title, // Fallback description 
      thumbnail_url: course.thumbnail || "/placeholder.svg",
      status: course.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_students: course.total_students,
      average_rating: course.rating,
      total_lessons: 10, // Default value
      duration: "8h", // Default value
      price: course.price
    } as Course));
  }, [courses]);

  return (
    <InstructorLayout loading={loading}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mes cours</h1>
          <p className="text-muted-foreground">
            Gérez tous vos cours en un seul endroit
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate("/instructor/courses/create")} className="flex items-center">
            <FilePlus className="mr-2 h-5 w-5" />
            Créer un nouveau cours
          </Button>
        </div>
      </div>
      
      <InstructorCoursesList courses={adaptedCourses} />
    </InstructorLayout>
  );
};

export default InstructorCourses;
