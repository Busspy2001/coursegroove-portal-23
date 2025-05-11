
import React from 'react';
import { Conversation } from '@/types/message-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ConversationItemProps {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, selected, onClick }: ConversationItemProps) => {
  const { participant, lastMessage, unreadCount } = conversation;
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div 
      className={`p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted/50 rounded-md ${selected ? 'bg-muted' : ''}`}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={participant.avatar} alt={participant.name} />
        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <p className="text-sm font-medium truncate">{participant.name}</p>
          <time className="text-xs text-muted-foreground">
            {formatTime(lastMessage.timestamp)}
          </time>
        </div>
        <p className={`text-xs truncate ${unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
          {lastMessage.content}
        </p>
      </div>
      {unreadCount > 0 && (
        <Badge className="bg-schoolier-blue text-white">{unreadCount}</Badge>
      )}
    </div>
  );
};

export default ConversationItem;
