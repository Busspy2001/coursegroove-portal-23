
import React from "react";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white rounded-xl shadow-lg w-full max-w-[960px] border border-schoolier-light-gray z-50 transition-all duration-300 ${className}`}>
      <div className="flex flex-col min-h-[320px]">
        <CourseCategories className="h-full p-3 rounded-lg hover:bg-[#f8fafc] transition-colors duration-300" />
      </div>
      <div className="flex flex-col min-h-[320px] border-x border-schoolier-light-gray px-4">
        <CertificationProviders className="h-full p-3 rounded-lg hover:bg-[#f8fafc] transition-colors duration-300" />
      </div>
      <div className="flex flex-col min-h-[320px]">
        <PopularTopics className="h-full p-3 rounded-lg hover:bg-[#f8fafc] transition-colors duration-300" />
      </div>
    </div>
  );
};

export default DiscoverMenuContent;
