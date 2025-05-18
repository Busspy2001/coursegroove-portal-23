
import React from "react";
import { cn } from "@/lib/utils";

interface OverviewActivityCardProps {
  type?: string;
  message: string;
  timestamp: string;
  department?: string;
}

export const OverviewActivityCard: React.FC<OverviewActivityCardProps> = ({
  type = "info",
  message,
  timestamp,
  department
}) => {
  // Génération d'une couleur basée sur le département
  const getDepartmentColor = (dept: string = "") => {
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
    <div className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">{type}</span>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {message}
      </p>
      {department && (
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-block text-xs px-2 py-1 rounded-full",
            getDepartmentColor(department)
          )}>
            {department}
          </span>
        </div>
      )}
    </div>
  );
};
