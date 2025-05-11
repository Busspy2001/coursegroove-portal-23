
import React from "react";

const CompaniesSection: React.FC = () => {
  // Companies using Schoolier
  const companies = [
    "Microsoft", "Google", "Amazon", "Facebook", 
    "Apple", "IBM", "Oracle", "Salesforce"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Ils font confiance à nos diplômés
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Nos apprenants travaillent dans ces entreprises de renom
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {companies.map((company, index) => (
            <div key={index} className="text-xl font-bold text-gray-400">{company}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
