
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import InstructorEarnings from "@/components/instructor/InstructorEarnings";

const InstructorEarningsPage = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6">Revenus</h1>
        <InstructorEarnings />
      </div>
    </InstructorLayout>
  );
};

export default InstructorEarningsPage;
