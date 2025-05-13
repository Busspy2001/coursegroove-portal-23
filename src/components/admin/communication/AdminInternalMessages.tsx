
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  PaperclipIcon, 
  SmileIcon,
  CheckCheck,
  Clock 
} from "lucide-react";

const AdminInternalMessages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  
  const conversations = [
    {
      id: 1, 
      name: "Sarah Laurent", 
      avatar: "/placeholder.svg", 
      role: "Modératrice", 
      lastMessage: "Bonjour, pouvez-vous vérifier les nouveaux rapports ?",
      time: "10:23",
      unread: 2,
      online: true
    },
    {
      id: 2, 
      name: "Thomas Petit", 
      avatar: "/placeholder.svg", 
      role: "Dev", 
      lastMessage: "J'ai résolu le problème avec les notifications",
      time: "09:45",
      unread: 0,
      online: true
    },
    {
      id: 3, 
      name: "Marie Dupont", 
      avatar: "/placeholder.svg", 
      role: "Support", 
      lastMessage: "Il y a un ticket urgent à traiter",
      time: "Hier",
      unread: 5,
      online: false
    },
    {
      id: 4, 
      name: "Julien Martin", 
      avatar: "/placeholder.svg", 
      role: "Admin", 
      lastMessage: "Pouvez-vous me faire un rapport sur les inscriptions ?",
      time: "Hier",
      unread: 0,
      online: false
    },
    {
      id: 5, 
      name: "Équipe marketing", 
      avatar: "/placeholder.svg", 
      role: "Groupe", 
      lastMessage: "Nouvelle campagne prévue pour la semaine prochaine",
      time: "Lun",
      unread: 0,
      online: false
    }
  ];
  
  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Bonjour, pouvez-vous vérifier les nouveaux rapports d'utilisateurs ? Il y en a plusieurs qui sont arrivés ce matin.",
      time: "10:23",
      read: true
    },
    {
      id: 2,
      senderId: "me",
      text: "Bonjour Sarah, oui bien sûr ! Je vais les regarder tout de suite.",
      time: "10:25",
      read: true
    },
    {
      id: 3,
      senderId: 1,
      text: "Super, merci ! J'en ai marqué certains comme prioritaires.",
      time: "10:26",
      read: true
    },
    {
      id: 4,
      senderId: "me",
      text: "Je viens de voir ça. Je vais commencer par ceux-là. Est-ce que tu as besoin d'une réponse aujourd'hui ?",
      time: "10:28",
      read: true
    },
    {
      id: 5,
      senderId: 1,
      text: "Oui, si possible avant 16h. L'équipe support en a besoin pour répondre aux tickets clients.",
      time: "10:30",
      read: false
    }
  ];

  // Fonction pour obtenir des initiales à partir d'un nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Liste des conversations */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Messages
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des conversations..."
                  className="pl-8 w-full"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto pb-0">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  Récents
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  Non lus
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-2">
                {conversations.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                      selectedChat === chat.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-medium truncate">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone de conversation */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="Sarah Laurent" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Sarah Laurent</h3>
                    <p className="text-xs text-muted-foreground">Modératrice • En ligne</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.senderId === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-xs opacity-70">{message.time}</span>
                      {message.senderId === "me" && (
                        <span>
                          {message.read ? (
                            <CheckCheck className="h-3 w-3 opacity-70" />
                          ) : (
                            <Clock className="h-3 w-3 opacity-70" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Écrivez un message..."
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <SmileIcon className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-9 w-9 rounded-full">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminInternalMessages;
