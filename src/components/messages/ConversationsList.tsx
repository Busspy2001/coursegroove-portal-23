
import React from 'react';
import { Conversation } from '@/types/message-types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ConversationItem from './ConversationItem';

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationsList = ({ conversations, selectedConversation, onSelectConversation }: ConversationsListProps) => {
  return (
    <>
      <div className="flex justify-between items-center p-3">
        <h3 className="text-sm font-medium">Récents</h3>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Plus className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Nouveau message</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-14rem)] overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            selected={selectedConversation?.id === conversation.id}
            onClick={() => onSelectConversation(conversation)}
          />
        ))}
      </ScrollArea>
    </>
  );
};

export default ConversationsList;
