
import React from 'react';
import { UserRound, BookOpen, Star, DollarSign, Building, Headphones, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ActivityType = 
  | "user_registration" 
  | "course_published" 
  | "course_review" 
  | "payment_received" 
  | "business_signup"
  | "user_support"
  | "system_alert";

export interface Activity {
  id: number;
  type: ActivityType;
  name: string;
  author?: string;
  rating?: number;
  amount?: string;
  course?: string;
  time: string;
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  // Configuration pour chaque type d'activité
  const getActivityConfig = (type: ActivityType) => {
    switch (type) {
      case 'user_registration':
        return {
          icon: <UserRound className="h-4 w-4" />,
          color: 'bg-blue-500 text-white',
          title: 'Nouvel utilisateur',
          content: (
            <span><span className="font-medium">{activity.name}</span> s'est inscrit</span>
          )
        };
      case 'course_published':
        return {
          icon: <BookOpen className="h-4 w-4" />,
          color: 'bg-purple-500 text-white',
          title: 'Nouveau cours',
          content: (
            <span>
              <span className="font-medium">{activity.name}</span> publié par {activity.author}
            </span>
          )
        };
      case 'course_review':
        return {
          icon: <Star className="h-4 w-4" />,
          color: 'bg-amber-500 text-white',
          title: 'Nouvel avis',
          content: (
            <span>
              <span className="font-medium">{activity.author}</span> a évalué {activity.name} avec {activity.rating} étoiles
            </span>
          )
        };
      case 'payment_received':
        return {
          icon: <DollarSign className="h-4 w-4" />,
          color: 'bg-green-500 text-white',
          title: 'Paiement reçu',
          content: (
            <span>
              <span className="font-medium">{activity.amount}</span> pour le cours {activity.course}
            </span>
          )
        };
      case 'business_signup':
        return {
          icon: <Building className="h-4 w-4" />,
          color: 'bg-cyan-500 text-white',
          title: 'Nouvelle entreprise',
          content: (
            <span>
              <span className="font-medium">{activity.name}</span> a rejoint Schoolier
            </span>
          )
        };
      case 'user_support':
        return {
          icon: <Headphones className="h-4 w-4" />,
          color: 'bg-orange-500 text-white',
          title: 'Support',
          content: (
            <span>
              <span className="font-medium">{activity.name}</span> par {activity.author || "un utilisateur"}
            </span>
          )
        };
      case 'system_alert':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'bg-red-500 text-white',
          title: 'Alerte système',
          content: (
            <span>
              <span className="font-medium">{activity.name}</span>
            </span>
          )
        };
      default:
        return {
          icon: <UserRound className="h-4 w-4" />,
          color: 'bg-gray-500 text-white',
          title: 'Activité',
          content: <span>{activity.name}</span>
        };
    }
  };

  const config = getActivityConfig(activity.type);

  return (
    <div className="flex items-start space-x-4">
      <div className={cn("p-2 rounded-full flex-shrink-0", config.color)}>
        {config.icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{config.title}</p>
        <div className="text-sm">
          {config.content}
        </div>
        <p className="text-xs text-muted-foreground">{activity.time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
