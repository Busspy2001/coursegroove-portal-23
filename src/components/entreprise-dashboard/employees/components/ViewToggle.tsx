
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

interface ViewToggleProps {
  view: "grid" | "list";
  onToggleView: (view: "grid" | "list") => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ 
  view, 
  onToggleView, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-1 rounded-md border bg-background p-1 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className={`relative px-3 ${view === "grid" ? "text-foreground" : "text-muted-foreground"}`}
        onClick={() => onToggleView("grid")}
        title="Vue en grille"
      >
        {view === "grid" && (
          <motion.div
            layoutId="viewSwitchIndicator"
            className="absolute inset-0 z-0 rounded-sm bg-muted"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center">
          <LayoutGrid className="mr-1.5 h-4 w-4" />
          <span className="text-xs font-medium">Grille</span>
        </span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`relative px-3 ${view === "list" ? "text-foreground" : "text-muted-foreground"}`}
        onClick={() => onToggleView("list")}
        title="Vue en liste"
      >
        {view === "list" && (
          <motion.div
            layoutId="viewSwitchIndicator"
            className="absolute inset-0 z-0 rounded-sm bg-muted"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center">
          <List className="mr-1.5 h-4 w-4" />
          <span className="text-xs font-medium">Liste</span>
        </span>
      </Button>
    </div>
  );
};
