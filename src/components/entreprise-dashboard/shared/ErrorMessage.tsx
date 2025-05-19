
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Erreur de chargement",
  message = "Une erreur est survenue lors du chargement des données.",
  onRetry
}) => {
  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
      <CardContent className="pt-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
      
      {onRetry && (
        <CardFooter className="flex justify-center pb-6 pt-0">
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="border-red-200 hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
