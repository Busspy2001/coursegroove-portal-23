
import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, benefits }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md h-full">
      <div className="mb-6 bg-schoolier-blue/10 dark:bg-schoolier-blue/20 p-4 rounded-full inline-block">
        {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-schoolier-blue" })}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-schoolier-teal rounded-full p-1 mr-3 mt-1 flex-shrink-0">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feature;
