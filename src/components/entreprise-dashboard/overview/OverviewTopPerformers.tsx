
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { GraduationCap } from "lucide-react";

interface Performer {
  id: string;
  name: string;
  department: string;
  completion: number;
  courses_completed: number;
}

interface OverviewTopPerformersProps {
  performers: Performer[];
}

export const OverviewTopPerformers: React.FC<OverviewTopPerformersProps> = ({ performers }) => {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getDepartmentClass = (dept: string) => {
    const classes: Record<string, string> = {
      "IT": "bg-blue-100 text-blue-800",
      "Marketing": "bg-purple-100 text-purple-800",
      "Finance": "bg-yellow-100 text-yellow-800",
      "RH": "bg-green-100 text-green-800",
      "Ventes": "bg-pink-100 text-pink-800",
      "Support": "bg-orange-100 text-orange-800"
    };

    return classes[dept] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      {performers.map((performer) => (
        <div key={performer.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10">{getInitials(performer.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium leading-none">{performer.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={`px-1.5 py-0.5 rounded-sm ${getDepartmentClass(performer.department)}`}>
                    {performer.department}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">{performer.courses_completed}</span>
                </div>
                <div className="font-medium text-sm">{performer.completion}%</div>
              </div>
            </div>
            <Progress value={performer.completion} className="h-1.5" />
          </div>
        </div>
      ))}
    </div>
  );
};
