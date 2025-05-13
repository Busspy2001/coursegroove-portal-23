
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';

const CoursesModule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Modération des Cours</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cours à modérer
          </CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en développement. Cette section permettra de gérer les cours à approuver, rejeter, ou mettre en avant.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesModule;
