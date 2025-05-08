
import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className,
  isExpanded = false,
  onExpand,
  onCollapse
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className={cn("relative w-full transition-all duration-300", className)}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="search"
        className={cn(
          "bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-sans rounded-full block w-full ps-10 p-2",
          "focus:ring-schoolier-blue focus:border-schoolier-blue transition-all duration-300",
          isExpanded ? "shadow-md" : ""
        )}
        placeholder={isExpanded ? "Trouvez votre prochain cours par compétence, sujet ou formateur" : "Rechercher un cours..."}
        onFocus={onExpand}
        onClick={onExpand}
      />
      {isExpanded && onCollapse && (
        <button 
          onClick={onCollapse}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          aria-label="Fermer la recherche"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
