
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyChatState = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-6 text-center">
      <MessageSquare className="h-12 w-12 text-muted-foreground opacity-40 mb-4" />
      <h3 className="text-lg font-medium mb-2">Aucune conversation sélectionnée</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">
        Sélectionnez une conversation existante ou démarrez une nouvelle discussion.
      </p>
      <Button>
        <Plus className="h-4 w-4 mr-1" />
        Nouveau message
      </Button>
    </div>
  );
};

export default EmptyChatState;
