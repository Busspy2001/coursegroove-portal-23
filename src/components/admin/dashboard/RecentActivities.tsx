
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ActivityItem, { Activity } from './ActivityItem';
import { Separator } from '@/components/ui/separator';

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Activités récentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ActivityItem activity={activity} />
            {index < activities.length - 1 && <Separator className="my-3" />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
