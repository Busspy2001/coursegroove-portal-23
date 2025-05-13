
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, CalendarDays } from "lucide-react";
import { type AdminTask } from "@/types/admin-types";

interface DailyTasksProps {
  tasks: AdminTask[];
  onCompleteTask?: (id: string, completed: boolean) => void;
  onViewAll?: () => void;
}

const DailyTasks = ({ tasks, onCompleteTask, onViewAll }: DailyTasksProps) => {
  const getPriorityBadge = (priority: AdminTask['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Basse</Badge>;
    }
  };

  const getCategoryBadge = (category: AdminTask['category']) => {
    const categoryMap = {
      moderation: { label: 'Modération', color: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
      support: { label: 'Support', color: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      business: { label: 'Business', color: 'bg-teal-100 text-teal-800 hover:bg-teal-100' },
      system: { label: 'Système', color: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
    };
    
    const { label, color } = categoryMap[category];
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            Tâches du jour
            {tasks.filter(t => !t.completed).length > 0 && (
              <Badge className="ml-2 bg-blue-500">{tasks.filter(t => !t.completed).length}</Badge>
            )}
          </div>
        </CardTitle>
        <Button onClick={onViewAll} variant="ghost" size="sm" className="text-xs">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-muted-foreground">Aucune tâche pour aujourd'hui</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`rounded-lg border p-3 ${task.completed ? 'bg-gray-50 dark:bg-gray-900/20' : 'bg-white dark:bg-gray-800'}`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      className="mt-0.5 flex-shrink-0"
                      onClick={() => onCompleteTask && onCompleteTask(task.id, !task.completed)}
                    >
                      {task.completed ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                        <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                      }
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </span>
                        <div className="flex gap-1">
                          {getPriorityBadge(task.priority)}
                          {getCategoryBadge(task.category)}
                        </div>
                      </div>
                      <p className={`text-sm mb-2 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {task.due}
                        </div>
                        {task.assignedTo && (
                          <span className="text-muted-foreground">
                            Assigné à: {task.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTasks;
