
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, ChartBar, Palette, Book } from "lucide-react";

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
];

interface CourseCategoriesProps {
  className?: string;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 ${className}`}>
      <h3 className="font-spartan font-bold text-lg mb-5 text-[#222] border-b pb-3 border-schoolier-light-gray">
        Parcourir les certifications
      </h3>
      <Link 
        to="/certifications" 
        className="block text-base text-schoolier-blue mb-5 transition-colors duration-200 font-medium hover:underline"
      >
        Préparation aux certifications
      </Link>
      <ul className="space-y-5 max-h-[250px] overflow-y-auto pr-2">
        {courseCategories.map((category) => (
          <li key={category.title} className="group cursor-pointer">
            <Link
              to={category.href}
              className="flex flex-col sm:flex-row items-start sm:items-center text-base text-[#444] hover:text-schoolier-blue transition-all duration-300 group-hover:translate-x-1"
            >
              {category.icon && 
                <span className="mr-3 mb-2 sm:mb-0 flex items-center justify-center w-10 h-10 bg-[#f5f5f5] rounded-md group-hover:bg-[#e2e8f0]">
                  {category.icon}
                </span>
              }
              <div>
                <span className="font-medium block">{category.title}</span>
                <span className="text-sm text-schoolier-gray">{category.description}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseCategories;
