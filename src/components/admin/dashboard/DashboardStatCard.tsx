
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  subtitleColor?: string;
}

const DashboardStatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-muted-foreground",
  subtitle,
  subtitleColor = "text-muted-foreground"
}: DashboardStatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground font-spartan">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold font-spartan">{value}</div>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        {subtitle && (
          <p className={`text-xs ${subtitleColor} mt-1`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
