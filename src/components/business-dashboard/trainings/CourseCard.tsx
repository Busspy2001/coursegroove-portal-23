
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Users,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  enrolledCount: number;
  completionRate: number;
  category: string;
  level: string;
  thumbnail: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "IT": "bg-blue-100 text-blue-800",
      "Management": "bg-green-100 text-green-800",
      "Finance": "bg-yellow-100 text-yellow-800",
      "Communication": "bg-purple-100 text-purple-800",
      "Marketing": "bg-pink-100 text-pink-800",
      "Juridique": "bg-orange-100 text-orange-800"
    };

    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level: string) => {
    if (level === "Débutant") return "bg-green-100 text-green-800";
    if (level === "Intermédiaire") return "bg-blue-100 text-blue-800";
    if (level === "Avancé") return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 75) return "bg-blue-500";
    if (rate >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Generate placeholder color based on course ID
  const placeholderColors = [
    "bg-gradient-to-br from-purple-500 to-indigo-600",
    "bg-gradient-to-br from-blue-500 to-cyan-600",
    "bg-gradient-to-br from-green-500 to-emerald-600",
    "bg-gradient-to-br from-yellow-500 to-amber-600",
    "bg-gradient-to-br from-pink-500 to-rose-600",
    "bg-gradient-to-br from-orange-500 to-red-600"
  ];
  const placeholderColor = placeholderColors[(course.id - 1) % placeholderColors.length];

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className={`h-40 ${placeholderColor} flex items-center justify-center text-white`}>
        {!course.thumbnail && (
          <span className="font-bold text-lg">{course.title.substring(0, 1)}</span>
        )}
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <Users className="h-3 w-3 mr-1" />
          <span>{course.enrolledCount} inscrits</span>
        </div>
        
        <p className="text-sm mb-1">Par {course.instructor}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-medium">Taux de complétion</span>
          <span className="text-sm">{course.completionRate}%</span>
        </div>
        <Progress 
          value={course.completionRate} 
          className="h-1.5 mt-1" 
          indicatorClassName={getProgressColor(course.completionRate)}
        />
      </CardContent>
      <CardFooter className="justify-between border-t p-4 bg-gray-50">
        <Button variant="outline" className="w-full" size="sm">
          Assigner
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Détails du cours</DropdownMenuItem>
            <DropdownMenuItem>Voir les participants</DropdownMenuItem>
            <DropdownMenuItem>Marquer comme obligatoire</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};
