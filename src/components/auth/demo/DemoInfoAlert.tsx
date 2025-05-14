
import React from "react";
import { Info, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export const DemoInfoAlert: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <AlertTitle className="text-blue-800 dark:text-blue-300 font-medium text-sm mb-1">
              Testez Schoolier sans créer de compte
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400 text-xs">
              Choisissez un compte de démonstration pour explorer la plateforme avec différents rôles et accéder à toutes les fonctionnalités.
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
};
