
import React from 'react';
import { AdminTask } from '@/types/admin-types';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface DailyTasksProps {
  tasks: AdminTask[];
  onCompleteTask: (id: string, completed: boolean) => void;
  onViewAll: () => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ tasks, onCompleteTask, onViewAll }) => {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'moderation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      case 'support':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'business':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      case 'system':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'finance':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'marketing':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300';
      case 'security':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          Tâches du jour
          <Button variant="ghost" size="sm" className="text-xs" onClick={onViewAll}>
            Tout voir
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
        <CardDescription>
          {tasks.filter(t => !t.completed).length} tâches en attente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={cn(
              "flex items-start p-3 rounded-md border",
              task.completed ? "bg-muted/40" : "bg-card"
            )}
          >
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={(checked) => onCompleteTask(task.id, !!checked)}
              className="mt-1"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "font-medium cursor-pointer",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </label>
                <div className="flex gap-2">
                  <span className={cn("inline-flex text-xs px-2 py-1 rounded", getPriorityClass(task.priority))}>
                    {task.priority}
                  </span>
                  <span className={cn("inline-flex text-xs px-2 py-1 rounded", getCategoryClass(task.category))}>
                    {task.category}
                  </span>
                </div>
              </div>
              <p className={cn(
                "text-sm text-muted-foreground mt-1", 
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Échéance: {task.due}</span>
                {task.assignedTo && <span>Assigné à: {task.assignedTo}</span>}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyTasks;
