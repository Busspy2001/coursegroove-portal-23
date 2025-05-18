
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "../OverviewChart";

export const StatsTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression des formations</CardTitle>
        <CardDescription>
          Suivi des formations assignées et complétées au cours des derniers mois.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px]">
          <OverviewChart />
        </div>
      </CardContent>
    </Card>
  );
};
