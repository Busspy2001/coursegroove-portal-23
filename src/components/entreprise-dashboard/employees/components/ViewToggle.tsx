
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onToggleView: (view: "grid" | "list") => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onToggleView }) => {
  return (
    <div className="flex gap-1">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        className="h-9 w-9"
        onClick={() => onToggleView("grid")}
        title="Vue en grille"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Vue en grille</span>
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        className="h-9 w-9"
        onClick={() => onToggleView("list")}
        title="Vue en liste"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">Vue en liste</span>
      </Button>
    </div>
  );
};
