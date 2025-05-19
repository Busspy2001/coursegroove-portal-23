
import React, { useState } from 'react';
import { Message, Conversation } from '@/types/message-types';
import { getMockMessagesForConversation } from '@/services/mock-messages-data';
import { Send, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  activeConversation: Conversation | null;
  onBack?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ activeConversation, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(
    activeConversation ? getMockMessagesForConversation(activeConversation.id) : []
  );
  const [newMessage, setNewMessage] = useState('');

  // Update messages when conversation changes
  React.useEffect(() => {
    if (activeConversation) {
      setMessages(getMockMessagesForConversation(activeConversation.id));
    } else {
      setMessages([]);
    }
  }, [activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;

    // Add the new message
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      content: newMessage,
      sender: {
        id: 'user-1',
        name: 'Moi',
        avatar: '',
      },
      timestamp: new Date(),
      read: false,
      isCurrentUser: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate a response after 1 second
    setTimeout(() => {
      if (!activeConversation) return;
      
      const responseMsg: Message = {
        id: `msg-resp-${Date.now()}`,
        content: `Merci pour votre message. Je vous répondrai prochainement.`,
        sender: {
          id: activeConversation.participant.id,
          name: activeConversation.participant.name,
          avatar: activeConversation.participant.avatar || '',
        },
        timestamp: new Date(),
        read: true,
        isCurrentUser: false
      };
      
      setMessages(prev => [...prev, responseMsg]);
    }, 1000);
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-muted-foreground text-center">
          Sélectionnez une conversation pour commencer à discuter
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full border rounded-lg overflow-hidden">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center gap-3 bg-white dark:bg-gray-950">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="font-medium">{activeConversation.participant.name}</div>
        {activeConversation.participant.role && (
          <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-muted-foreground">
            {activeConversation.participant.role}
          </div>
        )}
      </div>
      
      {/* Message area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2 bg-white dark:bg-gray-950">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
