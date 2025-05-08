
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock } from "lucide-react";

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  lastAccessed: Date;
}

interface CourseCardProps {
  course: EnrolledCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card key={course.id} className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 h-48 md:h-auto">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Par {course.instructor}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <Button variant="outline" className="mb-2 w-full md:w-auto" onClick={() => navigate(`/courses/${course.id}`)}>
                Voir le cours
              </Button>
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
            <div className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-1 text-schoolier-blue" />
              <span className="text-sm">Continuer</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
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

export default CourseCard;
