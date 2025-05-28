
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import InstructorStats from "@/components/instructor/InstructorStats";

const InstructorStatsPage = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6">Performances</h1>
        <InstructorStats />
      </div>
    </InstructorLayout>
  );
};

export default InstructorStatsPage;
