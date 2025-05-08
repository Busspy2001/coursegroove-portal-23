
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, ChartBar, Palette, Book, Code, Lightbulb } from "lucide-react";

// Course categories data
export const courseCategories = [
  {
    title: "Développement Web",
    description: "HTML, CSS, JavaScript et frameworks modernes",
    href: "/courses?category=web",
    icon: <Laptop className="h-6 w-6 text-schoolier-blue" />
  }, 
  {
    title: "Data Science",
    description: "Python, R et analyse de données",
    href: "/courses?category=data",
    icon: <ChartBar className="h-6 w-6 text-schoolier-teal" />
  }, 
  {
    title: "Design & UX",
    description: "Figma, Adobe XD et principes de design",
    href: "/courses?category=design",
    icon: <Palette className="h-6 w-6 text-schoolier-green" />
  }, 
  {
    title: "Marketing Digital",
    description: "SEO, SEM, médias sociaux et stratégie de contenu",
    href: "/courses?category=marketing",
    icon: <Book className="h-6 w-6 text-schoolier-yellow" />
  },
  {
    title: "Programmation",
    description: "Java, Python, C++ et autres langages",
    href: "/courses?category=programming",
    icon: <Code className="h-6 w-6 text-schoolier-blue" />
  }
];

interface CourseCategoriesProps {
  className?: string;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({
  className
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-spartan font-bold text-lg mb-3 text-[#222] border-b pb-2 border-schoolier-light-gray">
        Catégories populaires
      </h3>
      <ul className="space-y-4">
        {courseCategories.map((category) => (
          <li key={category.title} className="group">
            <Link
              to={category.href}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors duration-200 group-hover:translate-x-1"
            >
              <div className="flex-shrink-0 mt-1 flex items-center justify-center w-10 h-10 bg-[#f5f5f5] rounded-md group-hover:bg-[#e2e8f0]">
                {category.icon}
              </div>
              <div>
                <h4 className="font-medium text-[#333] group-hover:text-schoolier-blue transition-colors">
                  {category.title}
                </h4>
                <p className="text-sm text-[#666] mt-0.5">
                  {category.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <Link to="/courses" className="inline-flex items-center text-schoolier-blue hover:text-schoolier-dark-blue font-medium">
          Explorer toutes les catégories
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CourseCategories;
