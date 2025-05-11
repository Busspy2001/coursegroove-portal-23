
import React from "react";
import { Star, Award } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  stars: number;
  isTopInstructor?: boolean;
  stats?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  name, 
  role, 
  image, 
  stars, 
  isTopInstructor = false,
  stats 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {Array(stars).fill(0).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-schoolier-yellow" fill="currentColor" />
          ))}
        </div>
        {isTopInstructor && (
          <div className="bg-schoolier-blue/10 text-schoolier-blue px-2 py-1 rounded-full flex items-center text-xs font-bold">
            <Award className="h-3.5 w-3.5 mr-1" />
            Top instructeur
          </div>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
          {stats && <p className="text-schoolier-blue font-medium text-sm mt-1">{stats}</p>}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
