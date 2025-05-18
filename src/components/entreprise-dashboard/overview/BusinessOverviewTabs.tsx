
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityTabContent } from "./components/ActivityTabContent";
import { StatsTabContent } from "./components/StatsTabContent";
import { UpcomingTabContent } from "./components/UpcomingTabContent";
import { BusinessStatistics } from "@/services/supabase-business-data";

interface BusinessOverviewTabsProps {
  stats: BusinessStatistics | null;
}

export const BusinessOverviewTabs: React.FC<BusinessOverviewTabsProps> = ({ stats }) => {
  return (
    <Tabs defaultValue="activity" className="space-y-4">
      <TabsList>
        <TabsTrigger value="activity">Activité récente</TabsTrigger>
        <TabsTrigger value="stats">Statistiques</TabsTrigger>
        <TabsTrigger value="upcoming">À venir</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activity">
        <ActivityTabContent stats={stats} />
      </TabsContent>
      
      <TabsContent value="stats">
        <StatsTabContent />
      </TabsContent>
      
      <TabsContent value="upcoming">
        <UpcomingTabContent />
      </TabsContent>
    </Tabs>
  );
};
