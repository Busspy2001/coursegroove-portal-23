
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

// Import refactored components
import ChatWindow from "@/components/messages/ChatWindow";
import EmptyChatState from "@/components/messages/EmptyChatState";
import ConversationsList from "@/components/messages/ConversationsList";
import NotificationsList from "@/components/messages/NotificationsList";

// Import types and mock data
import { Conversation } from "@/types/message-types";
import { getMockConversations, getMockNotifications } from "@/services/mock-messages-data";

const Messages = () => {
  const mockConversations = getMockConversations();
  const mockNotifications = getMockNotifications();
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
      <div className="flex min-h-screen w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0 flex flex-col overflow-hidden w-full">
          <div className="flex items-center p-4 border-b">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          
          <div className="flex flex-grow w-full overflow-hidden">
            {/* Panneau gauche - Conversations et notifications */}
            {(!isMobile || !showConversation) && (
              <div className="w-full md:w-80 border-r flex flex-col overflow-hidden">
                <Tabs defaultValue="messages" className="flex flex-col h-full">
                  <div className="p-4 shrink-0">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow overflow-hidden">
                    <TabsContent value="messages" className="mt-0 border-t h-full">
                      <ConversationsList 
                        conversations={mockConversations}
                        selectedConversation={selectedConversation}
                        onSelectConversation={handleSelectConversation}
                      />
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="mt-0 border-t h-full">
                      <NotificationsList notifications={mockNotifications} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}
            
            {/* Panneau droit - Conversation actuelle */}
            {(!isMobile || showConversation) && (
              <div className="flex-grow h-full overflow-hidden">
                {selectedConversation ? (
                  <ChatWindow 
                    conversation={selectedConversation} 
                    onBack={isMobile ? handleBackToList : undefined}
                  />
                ) : (
                  <EmptyChatState />
                )}
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
