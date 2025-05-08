
import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="search"
        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-schoolier-blue focus:border-schoolier-blue block w-full ps-10 p-2"
        placeholder="Rechercher un cours..."
      />
    </div>
  );
};

export default SearchBar;
