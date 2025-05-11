
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock } from "lucide-react";
import { EnrolledCourse } from "@/types/user-data";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseCardProps {
  course: EnrolledCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <Card key={course.id} className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className={`w-full md:w-64 h-36 md:h-auto relative`}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {isMobile && course.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <div className="flex items-center justify-between text-white text-xs">
                <span>Progression</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1 mt-1" />
            </div>
          )}
        </div>
        <div className="flex-grow p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{course.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                Par {course.instructor}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <Button 
                variant="outline" 
                className="mb-2 w-full md:w-auto text-xs md:text-sm h-8 md:h-10" 
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                Voir le cours
              </Button>
            </div>
          </div>
          
          {!isMobile && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Progression</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-1 text-schoolier-blue" />
              <span className="text-xs md:text-sm">Continuer</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-xs md:text-sm">
                {isMobile ? (
                  <>Dernier accès: {course.lastAccessed.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</>
                ) : (
                  <>Dernier accès: {course.lastAccessed.toLocaleDateString()}</>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
