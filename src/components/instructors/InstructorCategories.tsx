
import React from "react";
import { motion } from "framer-motion";
import { Code, LineChart, PenTool, VideoIcon, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  path: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ icon, title, count, path }) => {
  return (
    <Link to={path}>
      <div className="flex flex-col items-center p-6 border rounded-xl hover:border-schoolier-blue hover:shadow-md transition-all text-center bg-white dark:bg-gray-800">
        <div className="p-3 rounded-full bg-schoolier-blue/10 text-schoolier-blue mb-4">
          {icon}
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{count} formateurs</p>
      </div>
    </Link>
  );
};

export const InstructorCategories = () => {
  const categories = [
    { 
      icon: <Code className="h-6 w-6" />, 
      title: "Développement", 
      count: 234,
      path: "/instructors/category/development" 
    },
    { 
      icon: <LineChart className="h-6 w-6" />, 
      title: "Business & Marketing", 
      count: 189,
      path: "/instructors/category/business" 
    },
    { 
      icon: <PenTool className="h-6 w-6" />, 
      title: "Design", 
      count: 156,
      path: "/instructors/category/design" 
    },
    { 
      icon: <VideoIcon className="h-6 w-6" />, 
      title: "Vidéo & Photo", 
      count: 112,
      path: "/instructors/category/video" 
    },
    { 
      icon: <BookOpen className="h-6 w-6" />, 
      title: "Langues", 
      count: 98,
      path: "/instructors/category/languages" 
    },
    { 
      icon: <Lightbulb className="h-6 w-6" />, 
      title: "Développement Personnel", 
      count: 145,
      path: "/instructors/category/personal" 
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Parcourir par catégorie</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez des formateurs experts dans le domaine qui vous intéresse
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CategoryCard 
                icon={category.icon} 
                title={category.title} 
                count={category.count} 
                path={category.path}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
