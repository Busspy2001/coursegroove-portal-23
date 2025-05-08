
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/courseData";
import { useIsMobile } from "@/hooks/use-mobile";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="heading-2 text-center mb-4 font-spartan">Explorez par catégorie</h2>
        <p className="subheading text-center mb-8 lg:mb-12 max-w-3xl mx-auto">
          Des formations adaptées à tous les domaines et tous les niveaux
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 text-center card-hover shadow border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200 active:scale-95"
              onClick={() => navigate("/courses")}
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3 flex justify-center">{category.icon}</div>
              <h3 className="font-semibold font-spartan text-sm md:text-base">{category.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {category.coursesCount} cours
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
