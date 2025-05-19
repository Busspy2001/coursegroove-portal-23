
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingMessageProps {
  message?: string;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ 
  message = "Chargement en cours..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-schoolier-teal animate-spin mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
