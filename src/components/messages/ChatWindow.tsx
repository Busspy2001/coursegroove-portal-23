
import React, { useState } from 'react';
import { Conversation } from '@/types/message-types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Info, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getMockMessagesForConversation } from '@/services/mock-messages-data';

interface ChatWindowProps {
  conversation: Conversation;
  onBack?: () => void;
}

const ChatWindow = ({ conversation, onBack }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
  const messages = getMockMessagesForConversation(conversation.id);
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm">
        {isMobile && onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
            <AvatarFallback>{conversation.participant.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{conversation.participant.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.participant.role === 'instructor' ? 'Instructeur' : 
              conversation.participant.role === 'admin' ? 'Administration' : 'Étudiant'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className={`flex-grow overflow-y-auto px-4 py-2 ${isMobile ? "pb-20" : ""}`}>
        <div className="pb-2">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isCurrentUser={message.sender.id === 'user-1'}
            />
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={sendMessage} className="p-3 border-t flex gap-2 bg-white dark:bg-gray-900">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
