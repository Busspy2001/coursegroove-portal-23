
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock } from "lucide-react";

export interface CourseProps {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  description: string;
  category: string;
  level: "débutant" | "intermédiaire" | "avancé";
  thumbnail: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
}

const CourseCard: React.FC<{ course: CourseProps }> = ({ course }) => {
  const levelColorMap = {
    débutant: "bg-green-100 text-green-800 hover:bg-green-200",
    intermédiaire: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    avancé: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  };

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={levelColorMap[course.level]}>
              {course.level}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-blue-50 text-schoolier-blue">
              {course.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mt-2 line-clamp-2">{course.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {course.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center mr-4">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students} étudiants</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.instructor.replace(" ", "+")}&background=0D9488&color=fff`}
              alt={course.instructor}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="text-sm">{course.instructor}</span>
          </div>
          <span className="font-bold text-schoolier-blue">
            {course.price === 0 ? "Gratuit" : `${course.price.toFixed(2)} €`}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
