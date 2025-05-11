import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Calendar,
  Info,
  Search,
  Plus,
  ArrowLeft
} from "lucide-react";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
  };
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
  };
  lastMessage: Message;
  unreadCount: number;
}

interface Notification {
  id: string;
  type: 'course' | 'certification' | 'system' | 'event';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

// Données fictives pour les conversations
const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'user-2',
      name: 'Julie Martin',
      avatar: undefined,
      role: 'instructor'
    },
    lastMessage: {
      id: 'msg-1',
      sender: {
        id: 'user-2',
        name: 'Julie Martin',
        avatar: undefined,
        role: 'instructor'
      },
      content: 'Bonjour ! Avez-vous des questions sur le devoir du module 3 ?',
      timestamp: new Date(2025, 4, 9, 14, 35),
      read: false
    },
    unreadCount: 1
  },
  {
    id: 'conv-2',
    participant: {
      id: 'user-3',
      name: 'Thomas Dubois',
      avatar: undefined,
      role: 'instructor'
    },
    lastMessage: {
      id: 'msg-2',
      sender: {
        id: 'user-3',
        name: 'Thomas Dubois',
        avatar: undefined,
        role: 'instructor'
      },
      content: 'Votre projet a été évalué. Vous pouvez consulter les résultats.',
      timestamp: new Date(2025, 4, 8, 11, 20),
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'conv-3',
    participant: {
      id: 'user-4',
      name: 'Support Schoolier',
      avatar: undefined,
      role: 'admin'
    },
    lastMessage: {
      id: 'msg-3',
      sender: {
        id: 'user-4',
        name: 'Support Schoolier',
        avatar: undefined,
        role: 'admin'
      },
      content: 'Merci pour votre message. Un membre de notre équipe vous répondra dans les 24 heures.',
      timestamp: new Date(2025, 4, 7, 9, 15),
      read: true
    },
    unreadCount: 0
  }
];

// Données fictives pour les notifications
const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'course',
    title: 'Nouveau contenu disponible',
    message: 'Le module 4 du cours "React.js pour les développeurs" est maintenant disponible.',
    timestamp: new Date(2025, 4, 9, 8, 0),
    read: false,
    link: '/courses/course-3'
  },
  {
    id: 'notif-2',
    type: 'event',
    title: 'Rappel: Session live',
    message: 'Ne manquez pas la session live "Techniques avancées de CSS" demain à 18h.',
    timestamp: new Date(2025, 4, 8, 15, 30),
    read: false,
    link: '/events/event-1'
  },
  {
    id: 'notif-3',
    type: 'certification',
    title: 'Certification complétée',
    message: 'Félicitations! Vous avez terminé la certification "UX Design Fundamentals".',
    timestamp: new Date(2025, 4, 7, 12, 45),
    read: true,
    link: '/certifications/cert-2'
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Mise à jour de la plateforme',
    message: 'La plateforme sera en maintenance le 15 mai de 2h à 4h du matin.',
    timestamp: new Date(2025, 4, 6, 10, 15),
    read: true
  }
];

// Données fictives pour les messages d'une conversation
const mockMessagesForConv1: Message[] = [
  {
    id: 'msg-1-1',
    sender: {
      id: 'user-2',
      name: 'Julie Martin',
      avatar: undefined,
      role: 'instructor'
    },
    content: 'Bonjour ! J\'espère que vous progressez bien dans le cours.',
    timestamp: new Date(2025, 4, 9, 14, 30),
    read: true
  },
  {
    id: 'msg-1-2',
    sender: {
      id: 'user-1',
      name: 'Moi',
      avatar: undefined,
      role: 'student'
    },
    content: 'Bonjour Julie ! Oui, j\'avance bien, merci !',
    timestamp: new Date(2025, 4, 9, 14, 32),
    read: true
  },
  {
    id: 'msg-1-3',
    sender: {
      id: 'user-2',
      name: 'Julie Martin',
      avatar: undefined,
      role: 'instructor'
    },
    content: 'Avez-vous des questions sur le devoir du module 3 ? La date limite est vendredi prochain.',
    timestamp: new Date(2025, 4, 9, 14, 35),
    read: false
  }
];

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <MessageSquare className="h-4 w-4 text-schoolier-blue" />;
      case 'certification':
        return <Info className="h-4 w-4 text-schoolier-green" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-schoolier-yellow" />;
      case 'system':
      default:
        return <Bell className="h-4 w-4 text-schoolier-gray" />;
    }
  };

  return (
    <div className={`p-4 flex items-start space-x-4 ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
      <div className="rounded-full p-2 bg-muted">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">{notification.title}</p>
          <time className="text-xs text-muted-foreground">
            {notification.timestamp.toLocaleDateString()}
          </time>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        {notification.link && (
          <Button variant="link" className="p-0 h-auto text-sm text-schoolier-blue">
            Voir plus
          </Button>
        )}
      </div>
      {!notification.read && (
        <Badge variant="default" className="bg-schoolier-blue text-white h-2 w-2 rounded-full p-0" />
      )}
    </div>
  );
};

const ConversationItem = ({ conversation, selected, onClick }: { 
  conversation: Conversation, 
  selected: boolean, 
  onClick: () => void 
}) => {
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

const MessageBubble = ({ message, isCurrentUser }: { message: Message, isCurrentUser: boolean }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
          <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[80%] ${isCurrentUser ? 'bg-schoolier-blue text-white' : 'bg-muted'} p-3 rounded-lg`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-muted-foreground'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src={message.sender.avatar} alt="Moi" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const ChatWindow = ({ conversation, onBack }: { conversation: Conversation, onBack?: () => void }) => {
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
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
      
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        {mockMessagesForConv1.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isCurrentUser={message.sender.id === 'user-1'}
          />
        ))}
      </ScrollArea>
      
      <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const isMobile = useIsMobile();
  const [showConversation, setShowConversation] = useState(false);
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversation(true);
    }
  };
  
  const handleBackToList = () => {
    setShowConversation(false);
  };
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen w-full">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Messages</h1>
            </div>
            
            <div className="flex-grow flex flex-col md:flex-row w-full">
              {/* On mobile: Show either the conversation list or the selected conversation */}
              {(!isMobile || !showConversation) && (
                <div className="w-full md:w-80 border-r">
                  <Tabs defaultValue="messages">
                    <div className="p-4">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      </TabsList>
                      
                      <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Rechercher..."
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <TabsContent value="messages" className="mt-0 border-t">
                      <div className="flex justify-between items-center p-3">
                        <h3 className="text-sm font-medium">Récents</h3>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Nouveau message</span>
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-14rem)] overflow-y-auto">
                        {mockConversations.map((conversation) => (
                          <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            selected={selectedConversation?.id === conversation.id}
                            onClick={() => handleSelectConversation(conversation)}
                          />
                        ))}
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="mt-0 border-t">
                      <div className="flex justify-between items-center p-3">
                        <h3 className="text-sm font-medium">Notifications</h3>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <span className="text-xs">Tout marquer comme lu</span>
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-14rem)] overflow-y-auto">
                        {mockNotifications.map((notification) => (
                          <React.Fragment key={notification.id}>
                            <NotificationItem notification={notification} />
                            <Separator />
                          </React.Fragment>
                        ))}
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {/* On mobile: Chat window takes full width when selected */}
              {(!isMobile || showConversation) && (
                <div className="flex-1 flex flex-col h-[calc(100vh-6rem)]">
                  {selectedConversation ? (
                    <ChatWindow 
                      conversation={selectedConversation} 
                      onBack={isMobile ? handleBackToList : undefined}
                    />
                  ) : (
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
                  )}
                </div>
              )}
            </div>
            
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
