
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import InstructorReviews from "@/components/instructor/InstructorReviews";

const InstructorReviewsPage = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6">Avis & feedback</h1>
        <InstructorReviews />
      </div>
    </InstructorLayout>
  );
};

export default InstructorReviewsPage;
