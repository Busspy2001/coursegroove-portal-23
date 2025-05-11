
import React from "react";
import { Star, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface Instructor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  badge?: string;
}

interface InstructorCardProps {
  instructor: Instructor;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const { id, name, role, avatar, rating, students, courses, badge } = instructor;
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1 duration-300 h-full">
      <div className="relative">
        <Link to={`/instructor/${id}`}>
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-40 md:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
        </Link>
        {badge && (
          <Badge className="absolute top-3 right-3 bg-schoolier-teal">
            {badge}
          </Badge>
        )}
      </div>
      <CardContent className={`p-4 ${isMobile ? 'p-4' : 'p-5'}`}>
        <Link to={`/instructor/${id}`} className="block">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-1 group-hover:text-schoolier-blue transition-colors`}>
            {name}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-3 text-sm">{role}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground text-xs ml-1">
            ({Math.floor(students / 100)} avis)
          </span>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm pt-3 border-t">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-schoolier-blue" />
            <span>{students.toLocaleString()} étudiants</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 md:h-4 md:w-4 text-schoolier-teal" />
            <span>{courses} cours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
