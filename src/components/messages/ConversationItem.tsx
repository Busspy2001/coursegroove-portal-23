
import React from 'react';
import { Conversation } from '@/types/message-types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isActive,
  onClick
}) => {
  const { participant, lastMessage, unreadCount } = conversation;
  
  // Format the timestamp to a relative time string
  const formattedTime = formatDistanceToNow(new Date(lastMessage.timestamp), { 
    addSuffix: true,
    locale: fr 
  });

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div 
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
      }`}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={participant.avatar} alt={participant.name} />
        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-medium truncate">{participant.name}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {formattedTime}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate pr-2">
            {lastMessage.content}
          </p>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-auto h-5 w-5 flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
