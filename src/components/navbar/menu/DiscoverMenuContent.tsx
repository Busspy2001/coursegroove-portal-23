
import React from "react";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white rounded-xl ${className}`}>
      <CourseCategories />
      <CertificationProviders />
      <PopularTopics />
    </div>
  );
};

export default DiscoverMenuContent;
