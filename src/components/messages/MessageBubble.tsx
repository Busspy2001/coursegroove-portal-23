
import React from 'react';
import { Message } from '@/types/message-types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2 } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isCurrentUser = message.isCurrentUser;
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { 
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
    <div className={`flex gap-3 mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
      </Avatar>
      
      <div className={`max-w-[70%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isCurrentUser 
            ? 'bg-schoolier-blue text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-foreground'
        }`}>
          <p>{message.content}</p>
        </div>
        
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          <span>{formattedTime}</span>
          {message.read && isCurrentUser && (
            <CheckCircle2 className="h-3 w-3 ml-1 text-schoolier-blue" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
