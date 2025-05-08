
import React from "react";
import { Link } from "react-router-dom";

// Certification providers data
export const certificationProviders = [
  { name: "Microsoft", href: "/certifications/microsoft" },
  { name: "AWS", href: "/certifications/aws" },
  { name: "Google Cloud", href: "/certifications/google" },
  { name: "Cisco", href: "/certifications/cisco" },
  { name: "CompTIA", href: "/certifications/comptia" },
];

interface CertificationProvidersProps {
  className?: string;
}

const CertificationProviders: React.FC<CertificationProvidersProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200 ${className}`}>
      <h3 className="font-spartan font-bold text-base mb-4 text-[#222] border-b pb-2 border-schoolier-light-gray">
        Émetteurs populaires
      </h3>
      <ul className="space-y-4">
        {certificationProviders.map((provider) => (
          <li key={provider.name} className="group cursor-pointer">
            <Link
              to={provider.href}
              className="flex text-base text-[#555] hover:text-schoolier-blue transition-all duration-300 font-medium group-hover:translate-x-1"
            >
              {provider.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationProviders;
