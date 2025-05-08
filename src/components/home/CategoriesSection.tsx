
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/courseData";

const CategoriesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <h2 className="heading-2 text-center mb-4 font-spartan">Explorez par catégorie</h2>
        <p className="subheading text-center mb-12 max-w-3xl mx-auto">
          Des formations adaptées à tous les domaines et tous les niveaux
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center card-hover shadow border border-gray-100 dark:border-gray-700 cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold font-spartan">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
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
