
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, Calendar } from "lucide-react";
import { EnrolledCourse } from "@/types/user-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: EnrolledCourse;
  index?: number;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card key={course.id} className="overflow-hidden border-2 hover:border-schoolier-blue/20 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className={`w-full md:w-64 h-36 md:h-auto relative`}>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {isMobile && course.progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
                <div className="flex items-center justify-between text-white text-xs">
                  <span>Progression</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress 
                  value={course.progress} 
                  className="h-1.5 mt-1.5" 
                />
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
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="mb-2 w-full md:w-auto text-xs md:text-sm h-8 md:h-10 bg-schoolier-blue hover:bg-schoolier-blue/90" 
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Continuer
                </Button>
              </div>
            </div>
            
            {!isMobile && (
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm">Progression</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress 
                  value={course.progress} 
                  className={cn(
                    "h-2.5 transition-all duration-500",
                    course.progress >= 100 ? "bg-green-100" : "bg-blue-100"
                  )}
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mt-4">
              {course.progress > 0 && course.progress < 100 && (
                <div className="flex items-center">
                  <PlayCircle className="h-4 w-4 mr-1.5 text-schoolier-blue" />
                  <span className="text-xs md:text-sm font-medium">Continuer</span>
                </div>
              )}
              
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/40 px-2 py-1 rounded-md">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-schoolier-teal" />
                <span className="text-xs">
                  Repris {formatTimeAgo(course.lastAccessed)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
