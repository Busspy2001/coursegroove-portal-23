
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, ChartBar, Palette, Book } from "lucide-react";

// Course categories data
export const courseCategories = [
  {
    title: "Développement Web",
    description: "HTML, CSS, JavaScript et frameworks modernes",
    href: "/courses?category=web",
    icon: <Laptop className="h-5 w-5 text-schoolier-blue" />
  },
  {
    title: "Data Science",
    description: "Python, R et analyse de données",
    href: "/courses?category=data",
    icon: <ChartBar className="h-5 w-5 text-schoolier-teal" />
  },
  {
    title: "Design & UX",
    description: "Figma, Adobe XD et principes de design",
    href: "/courses?category=design",
    icon: <Palette className="h-5 w-5 text-schoolier-green" />
  },
  {
    title: "Marketing Digital",
    description: "SEO, SEM, médias sociaux et stratégie de contenu",
    href: "/courses?category=marketing",
    icon: <Book className="h-5 w-5 text-schoolier-yellow" />
  },
];

interface CourseCategoriesProps {
  className?: string;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({ className }) => {
  return (
    <div className={`space-y-5 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200 ${className}`}>
      <h3 className="font-spartan font-bold text-base mb-4 text-[#222] border-b pb-2 border-schoolier-light-gray">
        Parcourir les certifications
      </h3>
      <Link to="/certifications" className="block text-base text-[#555] hover:text-schoolier-teal mb-4 transition-colors duration-200 font-medium">
        Préparation aux certifications
      </Link>
      <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
        {courseCategories.map((category) => (
          <li key={category.title} className="group cursor-pointer">
            <Link
              to={category.href}
              className="flex items-center text-base text-[#555] hover:text-schoolier-blue transition-all duration-300 group-hover:translate-x-1"
            >
              {category.icon && <span className="mr-3 flex items-center justify-center w-8 h-8 bg-[#f5f5f5] rounded-md group-hover:bg-[#e2e8f0]">{category.icon}</span>}
              <span className="font-medium">{category.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseCategories;
