
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OverviewMetricCardProps {
  title: string;
  value: string;
  description: string; // Changed from 'change'
  icon: React.ElementType;
  trend: { // Added trend object
    value: string;
    positive: boolean;
  };
  onClick?: () => void; // Added onClick handler
}

export const OverviewMetricCard = ({ 
  title, 
  value, 
  description, // Changed from 'change'
  icon: Icon,
  trend,
  onClick
}: OverviewMetricCardProps) => {
  // Determine change type based on trend.positive
  const changeType = trend.value 
    ? (trend.positive ? "positive" : "negative") 
    : "neutral";

  return (
    <Card onClick={onClick} className={onClick ? "cursor-pointer transition-shadow hover:shadow-md" : ""}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              <div className={cn(
                "flex items-center text-xs font-medium",
                changeType === "positive" && "text-emerald-500",
                changeType === "negative" && "text-red-500",
                changeType === "neutral" && "text-gray-500"
              )}>
                {changeType === "positive" && <ArrowUp className="h-3 w-3 mr-1" />}
                {changeType === "negative" && <ArrowDown className="h-3 w-3 mr-1" />}
                {changeType === "neutral" && <Minus className="h-3 w-3 mr-1" />}
                {trend.value}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
