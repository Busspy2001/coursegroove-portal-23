
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TrendInfo {
  value: string;
  positive: boolean;
}

interface OverviewMetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: TrendInfo;
  onClick?: () => void;
}

export const OverviewMetricCard: React.FC<OverviewMetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  onClick
}) => {
  return (
    <Card className={onClick ? "cursor-pointer transition-shadow hover:shadow-md" : ""} onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="rounded-md p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {trend && (
            <div className={`text-xs font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
