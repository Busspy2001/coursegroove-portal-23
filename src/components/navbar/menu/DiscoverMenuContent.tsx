
import React from "react";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white rounded-xl shadow-xl w-full max-w-[960px] border border-schoolier-light-gray z-50 ${className}`}>
      <div className="flex flex-col min-h-[350px]">
        <CourseCategories className="h-full min-w-[280px] rounded-lg bg-[#f8fafc] hover:bg-white transition-colors duration-200" />
      </div>
      <div className="flex flex-col min-h-[350px] border-x border-schoolier-light-gray px-4">
        <CertificationProviders className="h-full min-w-[280px] rounded-lg bg-[#f8fafc] hover:bg-white transition-colors duration-200" />
      </div>
      <div className="flex flex-col min-h-[350px]">
        <PopularTopics className="h-full min-w-[280px] rounded-lg bg-[#f8fafc] hover:bg-white transition-colors duration-200" />
      </div>
    </div>
  );
};

export default DiscoverMenuContent;
