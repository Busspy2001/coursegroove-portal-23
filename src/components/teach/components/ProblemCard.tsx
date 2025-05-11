
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4 bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-block">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
