
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ActivityItem, { Activity } from "./ActivityItem";

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-spartan">Activités récentes</CardTitle>
        <CardDescription>
          Les dernières activités sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
