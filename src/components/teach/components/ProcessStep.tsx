
import React from "react";

interface ProcessStepProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="bg-schoolier-blue/10 dark:bg-schoolier-blue/5 p-6 rounded-full mb-4 relative">
          {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-schoolier-blue" })}
        </div>
        <div className="absolute -top-3 -right-3 bg-schoolier-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default ProcessStep;
