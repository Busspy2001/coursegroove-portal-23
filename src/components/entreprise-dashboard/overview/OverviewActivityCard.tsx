
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { GraduationCap, User, Calendar, MessageSquare } from "lucide-react";

interface OverviewActivityCardProps {
  type: string;
  message: string;
  timestamp: string | Date;
}

export const OverviewActivityCard: React.FC<OverviewActivityCardProps> = ({ 
  type, 
  message, 
  timestamp 
}) => {
  const getIcon = () => {
    switch (type) {
      case "course_completion":
        return <GraduationCap className="h-4 w-4 text-green-500" />;
      case "user_registration":
        return <User className="h-4 w-4 text-blue-500" />;
      case "course_enrollment":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const formatTimestamp = () => {
    if (typeof timestamp === 'string') {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: fr });
    } 
    return formatDistanceToNow(timestamp, { addSuffix: true, locale: fr });
  };

  return (
    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="mt-0.5 bg-muted rounded-full p-1.5">
        {getIcon()}
      </div>
      <div className="space-y-0.5">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">{formatTimestamp()}</p>
      </div>
    </div>
  );
};
