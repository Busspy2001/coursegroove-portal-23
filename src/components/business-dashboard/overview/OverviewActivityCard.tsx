
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface OverviewActivityCardProps {
  user: string;
  action: string;
  target: string;
  department: string;
  time: string;
}

export const OverviewActivityCard = ({
  user,
  action,
  target,
  department,
  time
}: OverviewActivityCardProps) => {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      "IT": "bg-blue-100 text-blue-800",
      "RH": "bg-green-100 text-green-800",
      "Finance": "bg-yellow-100 text-yellow-800",
      "Marketing": "bg-purple-100 text-purple-800",
      "Ventes": "bg-pink-100 text-pink-800",
      "Support": "bg-orange-100 text-orange-800"
    };

    return colors[dept] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex items-start space-x-3">
      <Avatar className="h-8 w-8 bg-primary/10">
        <AvatarFallback>{getInitials(user)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">{user}</span>{" "}
          <span className="text-muted-foreground">{action}</span>{" "}
          <span className="font-medium">{target}</span>
        </p>
        <div className="flex items-center text-xs">
          <span className={`rounded-full px-2 py-0.5 mr-2 ${getDepartmentColor(department)}`}>
            {department}
          </span>
          <span className="text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
};
