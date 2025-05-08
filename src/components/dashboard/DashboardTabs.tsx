
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCoursesTab from "./MyCoursesTab";
import AchievementsTab from "./AchievementsTab";
import StatsTab from "./StatsTab";
import { EnrolledCourse } from "./CourseCard";

interface DashboardTabsProps {
  enrolledCourses: EnrolledCourse[];
}

const DashboardTabs = ({ enrolledCourses }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="my-courses" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="my-courses">Mes cours</TabsTrigger>
        <TabsTrigger value="achievements">Réalisations</TabsTrigger>
        <TabsTrigger value="stats">Statistiques</TabsTrigger>
      </TabsList>
      
      <TabsContent value="my-courses">
        <MyCoursesTab enrolledCourses={enrolledCourses} />
      </TabsContent>
      
      <TabsContent value="achievements">
        <AchievementsTab />
      </TabsContent>
      
      <TabsContent value="stats">
        <StatsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
