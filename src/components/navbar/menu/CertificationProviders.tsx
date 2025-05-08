
import React from "react";
import { Link } from "react-router-dom";

// Certification providers data
export const certificationProviders = [
  { name: "Microsoft", href: "/certifications/microsoft" },
  { name: "AWS", href: "/certifications/aws" },
  { name: "Google Cloud", href: "/certifications/google" },
  { name: "Cisco", href: "/certifications/cisco" },
  { name: "CompTIA", href: "/certifications/comptia" },
  { name: "Oracle", href: "/certifications/oracle" },
  { name: "IBM", href: "/certifications/ibm" },
  { name: "Salesforce", href: "/certifications/salesforce" },
];

interface CertificationProvidersProps {
  className?: string;
}

const CertificationProviders: React.FC<CertificationProvidersProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 ${className}`}>
      <h3 className="font-spartan font-bold text-lg mb-5 text-[#222] border-b pb-3 border-schoolier-light-gray">
        Émetteurs populaires
      </h3>
      <ul className="space-y-5 pt-2">
        {certificationProviders.map((provider) => (
          <li key={provider.name} className="group cursor-pointer">
            <Link
              to={provider.href}
              className="flex text-base text-[#444] hover:text-schoolier-blue transition-all duration-300 font-medium group-hover:translate-x-1"
            >
              <span className="mr-3 flex items-center justify-center w-6 h-6 text-schoolier-blue">
                •
              </span>
              {provider.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pt-4 mt-auto">
        <Link to="/certifications" className="inline-flex items-center text-schoolier-blue hover:text-schoolier-dark-blue font-medium">
          Voir tous les émetteurs
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CertificationProviders;
