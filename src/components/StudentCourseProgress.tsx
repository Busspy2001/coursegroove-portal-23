
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle2, PlayCircle, Award, Clock } from "lucide-react";
import { useCourse } from "@/hooks/use-course";
import { Badge } from "@/components/ui/badge";
import CourseProgress from "@/components/CourseProgress";

interface StudentCourseProgressProps {
  courseId: string;
  courseName: string;
  totalLessons: number;
  instructorName: string;
}

const StudentCourseProgress: React.FC<StudentCourseProgressProps> = ({
  courseId,
  courseName,
  totalLessons,
  instructorName,
}) => {
  const { 
    enrolled, 
    progress, 
    loading, 
    completedLessons, 
    lastAccessedAt,
    enrollInCourse, 
  } = useCourse(courseId);

  const handleEnroll = async () => {
    await enrollInCourse();
  };

  // Calculate estimated time left based on average lesson duration (mock implementation)
  const getEstimatedTimeLeft = (): string => {
    if (completedLessons.length === 0) return "Non commencé";
    if (completedLessons.length === totalLessons) return "Terminé";
    
    // Mock average time per lesson: 20 minutes
    const averageTimePerLesson = 20;
    const remainingLessons = totalLessons - completedLessons.length;
    const minutesLeft = remainingLessons * averageTimePerLesson;
    
    if (minutesLeft < 60) return `${minutesLeft} minutes`;
    
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    
    if (minutes === 0) return `${hours} heure${hours > 1 ? 's' : ''}`;
    return `${hours} heure${hours > 1 ? 's' : ''} ${minutes} min`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!enrolled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>S'inscrire au cours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Inscrivez-vous pour suivre votre progression, accéder à tous les cours et obtenir un certificat.
          </p>
          <Button onClick={handleEnroll} className="w-full">
            <BookOpen className="h-4 w-4 mr-2" />
            S'inscrire à ce cours
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Votre progression</CardTitle>
          {progress >= 100 ? (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-600" />
              Complété
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <PlayCircle className="h-3.5 w-3.5 mr-1 text-blue-600" />
              En cours
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CourseProgress 
          progress={progress} 
          totalLessons={totalLessons}
          completedLessons={completedLessons.length}
          showDetails={true}
          estimatedTimeLeft={getEstimatedTimeLeft()}
          lastActivity={lastAccessedAt}
        />

        <div className="mt-6 border-t pt-6">
          <h4 className="text-sm font-medium mb-3">Résumé du cours</h4>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{courseName}</span>
            </div>
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Par {instructorName}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Temps estimé: {completedLessons.length === totalLessons ? "Terminé" : getEstimatedTimeLeft()}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" disabled={completedLessons.length === 0}>
          {progress >= 100 ? (
            <>
              <Award className="h-4 w-4 mr-2" />
              Voir votre certificat
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Continuer l'apprentissage
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCourseProgress;
