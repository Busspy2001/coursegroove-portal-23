
import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Network, Shield, Code } from "lucide-react";

// Popular topics data
export const popularTopics = [
  { name: "Certification Cloud", href: "/topics/cloud", icon: <Cloud className="h-5 w-5" /> },
  { name: "Réseautage", href: "/topics/networking", icon: <Network className="h-5 w-5" /> },
  { name: "Cybersécurité", href: "/topics/cybersecurity", icon: <Shield className="h-5 w-5" /> },
  { name: "DevOps", href: "/topics/devops", icon: <Code className="h-5 w-5" /> },
  { name: "Codage", href: "/topics/coding", icon: <Code className="h-5 w-5" /> },
];

interface PopularTopicsProps {
  className?: string;
}

const PopularTopics: React.FC<PopularTopicsProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 ${className}`}>
      <h3 className="font-spartan font-bold text-lg mb-5 text-[#222] border-b pb-3 border-schoolier-light-gray">
        Sujets populaires
      </h3>
      <ul className="space-y-5 pt-2">
        {popularTopics.map((topic) => (
          <li key={topic.name} className="group cursor-pointer">
            <Link
              to={topic.href}
              className="flex items-center text-base text-[#444] hover:text-schoolier-teal transition-all duration-300 group-hover:translate-x-1"
            >
              {topic.icon && 
                <span className="mr-3 flex items-center justify-center w-10 h-10 bg-[#f5f5f5] rounded-md group-hover:bg-[#e2e8f0]">
                  {topic.icon}
                </span>
              }
              <span className="font-medium">{topic.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pt-4 mt-auto">
        <Link to="/topics" className="inline-flex items-center text-schoolier-teal hover:text-schoolier-dark-teal font-medium">
          Explorer tous les sujets
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PopularTopics;
