
import React from "react";
import CourseCategories from "./CourseCategories";
import CertificationProviders from "./CertificationProviders";
import PopularTopics from "./PopularTopics";
import { ArrowRight } from "lucide-react";

interface DiscoverMenuContentProps {
  className?: string;
}

const DiscoverMenuContent: React.FC<DiscoverMenuContentProps> = ({ className }) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-xl shadow-xl w-full max-w-[980px] border border-schoolier-light-gray z-50 transition-all duration-300 animate-fade-in ${className}`}
    >
      <div className="flex flex-col bg-gradient-to-br from-[#f8fafc] to-white rounded-lg shadow-sm border border-schoolier-light-gray overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="bg-[#eef2f7] py-2 px-4 border-b border-schoolier-light-gray">
          <h3 className="font-spartan font-bold text-schoolier-dark-blue">Catégories</h3>
        </div>
        <CourseCategories className="h-full p-4 hover:bg-[#f9fbfd] transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col bg-gradient-to-br from-[#f8fafc] to-white rounded-lg shadow-sm border border-schoolier-light-gray overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="bg-[#eef2f7] py-2 px-4 border-b border-schoolier-light-gray">
          <h3 className="font-spartan font-bold text-schoolier-teal">Certifications</h3>
        </div>
        <CertificationProviders className="h-full p-4 hover:bg-[#f9fbfd] transition-colors duration-300" />
      </div>
      
      <div className="flex flex-col bg-gradient-to-br from-[#f8fafc] to-white rounded-lg shadow-sm border border-schoolier-light-gray overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="bg-[#eef2f7] py-2 px-4 border-b border-schoolier-light-gray">
          <h3 className="font-spartan font-bold text-schoolier-green">Sujets tendance</h3>
        </div>
        <PopularTopics className="h-full p-4 hover:bg-[#f9fbfd] transition-colors duration-300" />
      </div>
      
      <div className="md:col-span-3 mt-2 flex justify-center">
        <a 
          href="/courses" 
          className="group inline-flex items-center px-6 py-2 text-schoolier-blue hover:text-schoolier-dark-blue font-medium bg-[#eef2f7] hover:bg-[#e2e8f0] rounded-full transition-all duration-300"
        >
          Explorer tout le catalogue
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default DiscoverMenuContent;
