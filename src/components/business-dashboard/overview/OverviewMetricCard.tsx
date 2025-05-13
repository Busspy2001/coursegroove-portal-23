
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface OverviewMetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export const OverviewMetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon
}: OverviewMetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-sm ${
            changeType === "positive" ? "text-green-600" : 
            changeType === "negative" ? "text-red-600" : 
            "text-gray-600"
          }`}>
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
