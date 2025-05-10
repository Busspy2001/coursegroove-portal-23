
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Objective {
  id: string;
  title: string;
  completed: boolean;
}

const WeeklyObjectives = () => {
  const [objectives, setObjectives] = React.useState<Objective[]>([
    { id: '1', title: 'Regarder 3 leçons', completed: false },
    { id: '2', title: 'Finir le module 4', completed: false },
    { id: '3', title: 'Compléter l\'exercice pratique', completed: true },
    { id: '4', title: 'Participer au forum de discussion', completed: false },
  ]);

  const toggleObjective = (id: string) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, completed: !obj.completed } : obj
    ));
  };

  const completedCount = objectives.filter(obj => obj.completed).length;
  const totalCount = objectives.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Objectifs de la semaine</CardTitle>
          <span className="text-sm font-medium text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-schoolier-blue to-schoolier-teal h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {objectives.map((objective) => (
            <li key={objective.id} className="flex items-center">
              <Checkbox 
                id={`objective-${objective.id}`}
                checked={objective.completed}
                onCheckedChange={() => toggleObjective(objective.id)}
                className="mr-2"
              />
              <label 
                htmlFor={`objective-${objective.id}`}
                className={`text-sm flex-1 cursor-pointer ${objective.completed ? 'text-muted-foreground line-through' : ''}`}
              >
                {objective.title}
              </label>
              {objective.completed && <Check className="h-4 w-4 text-schoolier-green" />}
            </li>
          ))}
        </ul>
        
        {completedCount === totalCount && (
          <div className="mt-4 pt-3 border-t border-border flex justify-center">
            <Button size="sm" variant="outline" className="text-schoolier-teal hover:text-schoolier-dark-teal">
              Définir de nouveaux objectifs
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyObjectives;
