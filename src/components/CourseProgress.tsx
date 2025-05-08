
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  progress: number;
  totalLessons: number;
  completedLessons: number;
  className?: string;
  showDetails?: boolean;
  estimatedTimeLeft?: string;
  lastActivity?: Date;
}

const CourseProgress = ({
  progress,
  totalLessons,
  completedLessons,
  className,
  showDetails = true,
  estimatedTimeLeft,
  lastActivity
}: CourseProgressProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          {progress >= 100 ? (
            <CheckCircle2 className="h-4 w-4 mr-1 text-schoolier-green" />
          ) : (
            <PlayCircle className="h-4 w-4 mr-1 text-schoolier-blue" />
          )}
          <span className="font-medium">
            {progress >= 100 ? "Complété" : "En cours"}
          </span>
        </div>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      {showDetails && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground mt-2">
          <div className="flex items-center">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-schoolier-teal" />
            <span>{completedLessons}/{totalLessons} leçons complétées</span>
          </div>
          
          {estimatedTimeLeft && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Temps restant estimé: {estimatedTimeLeft}</span>
            </div>
          )}
          
          {lastActivity && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>
                Dernière activité: {lastActivity.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseProgress;
