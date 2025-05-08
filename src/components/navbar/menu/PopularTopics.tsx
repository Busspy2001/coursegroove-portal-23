
import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Network, Shield, Code } from "lucide-react";

// Popular topics data
export const popularTopics = [
  { name: "Certification Cloud", href: "/topics/cloud", icon: <Cloud className="h-4 w-4" /> },
  { name: "Réseautage", href: "/topics/networking", icon: <Network className="h-4 w-4" /> },
  { name: "Cybersécurité", href: "/topics/cybersecurity", icon: <Shield className="h-4 w-4" /> },
  { name: "DevOps", href: "/topics/devops", icon: <Code className="h-4 w-4" /> },
  { name: "Codage", href: "/topics/coding", icon: <Code className="h-4 w-4" /> },
];

interface PopularTopicsProps {
  className?: string;
}

const PopularTopics: React.FC<PopularTopicsProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200 ${className}`}>
      <h3 className="font-spartan font-bold text-base mb-4 text-[#222] border-b pb-2 border-schoolier-light-gray">
        Sujets populaires
      </h3>
      <ul className="space-y-4">
        {popularTopics.map((topic) => (
          <li key={topic.name} className="group cursor-pointer">
            <Link
              to={topic.href}
              className="flex items-center text-base text-[#555] hover:text-schoolier-teal transition-all duration-300 group-hover:translate-x-1"
            >
              {topic.icon && <span className="mr-3 flex items-center justify-center w-8 h-8 bg-[#f5f5f5] rounded-md group-hover:bg-[#e2e8f0]">{topic.icon}</span>}
              <span className="font-medium">{topic.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTopics;
