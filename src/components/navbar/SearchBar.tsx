
import React, { useRef, useEffect, useState } from "react";
import { Search, X, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchBarProps {
  className?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

const SUGGESTIONS = [
  "Développement Web Frontend",
  "JavaScript Avancé",
  "Intelligence Artificielle",
  "UX/UI Design",
  "Marketing Digital"
];

const SearchBar: React.FC<SearchBarProps> = ({ 
  className,
  isExpanded = false,
  onExpand,
  onCollapse
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Focus the input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      // Simulate AI-generated suggestions
      const filtered = SUGGESTIONS.filter(
        suggestion => suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : ["Cours de " + query, "Formations en " + query]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleVoiceSearch = () => {
    // Simulating voice recognition functionality
    // In a real implementation, this would use the Web Speech API
    alert("Fonctionnalité de recherche vocale (simluée)");
  };

  return (
    <div className={cn("relative w-full transition-all duration-300", className)}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="w-5 h-5 text-schoolier-gray dark:text-gray-400" />
      </div>
      
      <Popover open={suggestions.length > 0 && isExpanded}>
        <PopoverTrigger asChild>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-schoolier-dark-gray dark:text-white text-sm font-sans rounded-full block w-full ps-10 pe-12 p-3",
              "focus:ring-schoolier-blue focus:border-schoolier-blue transition-all duration-300",
              "placeholder:text-schoolier-gray placeholder:font-medium",
              isExpanded ? "shadow-md" : ""
            )}
            placeholder={isExpanded ? "Trouvez votre prochain cours par compétence, sujet ou formateur" : "Rechercher un cours..."}
            onFocus={onExpand}
            onClick={onExpand}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[calc(100%-2rem)] max-w-md mx-auto" align="center">
          <div className="py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
            <p className="px-4 py-1 text-xs text-schoolier-gray">Suggestions:</p>
            {suggestions.map((suggestion, index) => (
              <button 
                key={index} 
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <div className="absolute inset-y-0 end-0 flex items-center pe-3 gap-2">
        <button
          onClick={handleVoiceSearch}
          className="text-schoolier-gray hover:text-schoolier-blue transition-colors"
          aria-label="Recherche vocale"
          title="Recherche vocale"
        >
          <Mic className="w-5 h-5" />
        </button>
        
        {isExpanded && onCollapse && (
          <button 
            onClick={onCollapse}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
