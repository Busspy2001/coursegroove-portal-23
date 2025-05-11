
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCoursesTab from "./MyCoursesTab";
import AchievementsTab from "./AchievementsTab";
import StatsTab from "./StatsTab";
import WeeklyObjectives from "./WeeklyObjectives";
import OngoingCertifications from "./OngoingCertifications";
import { EnrolledCourse, Achievement, UserStats } from "@/types/user-data";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardTabsProps {
  enrolledCourses: EnrolledCourse[];
  achievements: Achievement[];
  stats: UserStats;
}

const DashboardTabs = ({ enrolledCourses, achievements, stats }: DashboardTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-6 md:mt-8">
      <Tabs defaultValue="my-courses" className="w-full">
        <TabsList className="mb-6 flex w-full overflow-x-auto no-scrollbar justify-start md:justify-center">
          <TabsTrigger value="my-courses" className="whitespace-nowrap">Mes cours</TabsTrigger>
          <TabsTrigger value="achievements" className="whitespace-nowrap">Réalisations</TabsTrigger>
          <TabsTrigger value="stats" className="whitespace-nowrap">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-courses">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <MyCoursesTab enrolledCourses={enrolledCourses} />
            </div>
            {!isMobile && (
              <div className="space-y-6">
                <WeeklyObjectives />
                <OngoingCertifications />
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <AchievementsTab achievements={achievements} />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatsTab stats={stats} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
