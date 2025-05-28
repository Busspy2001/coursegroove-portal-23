
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import InstructorStudents from "@/components/instructor/InstructorStudents";

const InstructorStudentsPage = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6">Étudiants</h1>
        <InstructorStudents />
      </div>
    </InstructorLayout>
  );
};

export default InstructorStudentsPage;
