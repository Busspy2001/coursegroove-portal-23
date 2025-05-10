
import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import EmptyCourseState from "./EmptyCourseState";
import { EnrolledCourse } from "@/types/user-data";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface MyCoursesTabProps {
  enrolledCourses: EnrolledCourse[];
}

const MyCoursesTab = ({ enrolledCourses }: MyCoursesTabProps) => {
  const navigate = useNavigate();
  
  // Find the course with the most recent access date
  const lastAccessedCourse = React.useMemo(() => {
    if (enrolledCourses.length === 0) return null;
    
    return enrolledCourses.reduce((latest, current) => {
      return latest.lastAccessed > current.lastAccessed ? latest : current;
    }, enrolledCourses[0]);
  }, [enrolledCourses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-semibold">Mes cours</h2>
        {lastAccessedCourse && (
          <Button 
            onClick={() => navigate(`/courses/${lastAccessedCourse.id}`)}
            className="mt-2 md:mt-0 bg-gradient-to-r from-schoolier-blue to-schoolier-teal"
          >
            <PlayCircle className="mr-2 h-4 w-4" /> 
            Continuer mon dernier cours
          </Button>
        )}
      </div>
      
      {enrolledCourses.length > 0 ? (
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
            />
          ))}
        </div>
      ) : (
        <EmptyCourseState />
      )}
    </div>
  );
};

export default MyCoursesTab;
