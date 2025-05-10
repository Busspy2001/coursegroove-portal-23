
import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Network, Shield, Code } from "lucide-react";

// Popular topics data
export const popularTopics = [{
  name: "Certification Cloud",
  href: "/topics/cloud",
  icon: <Cloud className="h-5 w-5" />
}, {
  name: "Réseautage",
  href: "/topics/networking",
  icon: <Network className="h-5 w-5" />
}, {
  name: "Cybersécurité",
  href: "/topics/cybersecurity",
  icon: <Shield className="h-5 w-5" />
}, {
  name: "DevOps",
  href: "/topics/devops",
  icon: <Code className="h-5 w-5" />
}, {
  name: "Codage",
  href: "/topics/coding",
  icon: <Code className="h-5 w-5" />
}];

interface PopularTopicsProps {
  className?: string;
}

const PopularTopics: React.FC<PopularTopicsProps> = ({
  className
}) => {
  return (
    <div className={className}>
      <h4 className="mb-2 text-sm font-medium">Sujets populaires</h4>
      <ul className="space-y-2">
        {popularTopics.map((topic, index) => (
          <li key={index}>
            <Link 
              to={topic.href}
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              {topic.icon}
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTopics;
