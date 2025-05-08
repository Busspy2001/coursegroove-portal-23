import React from "react";
import { Link } from "react-router-dom";
import { Laptop, ChartBar, Palette, Book } from "lucide-react";

// Course categories data
export const courseCategories = [{
  title: "Développement Web",
  description: "HTML, CSS, JavaScript et frameworks modernes",
  href: "/courses?category=web",
  icon: <Laptop className="h-6 w-6 text-schoolier-blue" />
}, {
  title: "Data Science",
  description: "Python, R et analyse de données",
  href: "/courses?category=data",
  icon: <ChartBar className="h-6 w-6 text-schoolier-teal" />
}, {
  title: "Design & UX",
  description: "Figma, Adobe XD et principes de design",
  href: "/courses?category=design",
  icon: <Palette className="h-6 w-6 text-schoolier-green" />
}, {
  title: "Marketing Digital",
  description: "SEO, SEM, médias sociaux et stratégie de contenu",
  href: "/courses?category=marketing",
  icon: <Book className="h-6 w-6 text-schoolier-yellow" />
}];
interface CourseCategoriesProps {
  className?: string;
}
const CourseCategories: React.FC<CourseCategoriesProps> = ({
  className
}) => {
  return;
};
export default CourseCategories;