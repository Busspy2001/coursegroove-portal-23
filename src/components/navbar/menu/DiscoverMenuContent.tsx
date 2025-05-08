
import React from "react";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-xl shadow-lg w-full max-w-[900px] ${className}`}>
      <CourseCategories className="min-w-[250px]" />
      <CertificationProviders className="min-w-[250px]" />
      <PopularTopics className="min-w-[250px]" />
    </div>
  );
};

export default DiscoverMenuContent;
