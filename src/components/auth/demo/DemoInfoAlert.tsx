
import React from "react";
import { Info } from "lucide-react";

export const DemoInfoAlert: React.FC = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2 mb-4 flex items-center">
      <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
      <p className="text-xs text-blue-700 dark:text-blue-400">
        Utilisez ces comptes pour tester la plateforme sans avoir à vous inscrire
      </p>
    </div>
  );
};
