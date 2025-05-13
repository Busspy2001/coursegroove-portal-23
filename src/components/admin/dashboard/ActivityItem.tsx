
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Check, Star, TrendingUp } from "lucide-react";

export type ActivityType = "user_registration" | "course_published" | "course_review" | "payment_received";

export interface Activity {
  id: number;
  type: ActivityType;
  name: string;
  time: string;
  author?: string;
  rating?: number;
  amount?: string;
  course?: string;
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  // Icon mapping based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "user_registration":
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Users className="h-4 w-4 text-blue-500 dark:text-blue-300" />
          </div>
        );
      case "course_published":
        return (
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <Check className="h-4 w-4 text-green-500 dark:text-green-300" />
          </div>
        );
      case "course_review":
        return (
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
            <Star className="h-4 w-4 text-amber-500 dark:text-amber-300" />
          </div>
        );
      case "payment_received":
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-300" />
          </div>
        );
    }
  };

  // Content based on activity type
  const getActivityContent = (activity: Activity) => {
    switch (activity.type) {
      case "user_registration":
        return (
          <p className="text-sm font-medium font-spartan">
            Nouvel utilisateur: <span className="font-semibold">{activity.name}</span>
          </p>
        );
      case "course_published":
        return (
          <p className="text-sm font-medium font-spartan">
            Nouveau cours: <span className="font-semibold">{activity.name}</span> par {activity.author}
          </p>
        );
      case "course_review":
        return (
          <p className="text-sm font-medium font-spartan">
            Avis sur <span className="font-semibold">{activity.name}</span> ({activity.rating}/5) par {activity.author}
          </p>
        );
      case "payment_received":
        return (
          <p className="text-sm font-medium font-spartan">
            Paiement de <span className="font-semibold">{activity.amount}</span> pour {activity.course}
          </p>
        );
    }
  };

  return (
    <div className="flex items-start space-x-4 p-2 rounded-md hover:bg-accent">
      <div className="mt-0.5">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            {getActivityContent(activity)}
          </div>
          <Badge variant="outline">{activity.time}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
