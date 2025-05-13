
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, Users, BookOpen, Building2, 
  CreditCard, BarChart3, Megaphone, MessageSquare,
  Bell, Settings
} from "lucide-react";

interface AdminTabsNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const AdminTabsNavigation = ({ activeTab, setActiveTab }: AdminTabsNavigationProps) => {
  return (
    <TabsList className="flex p-0 h-auto bg-transparent border-b overflow-x-auto no-scrollbar">
      <TabsTrigger value="dashboard" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <LayoutDashboard className="h-4 w-4 mr-2" />
        Dashboard
      </TabsTrigger>
      
      <TabsTrigger value="users" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <Users className="h-4 w-4 mr-2" />
        Utilisateurs
      </TabsTrigger>
      
      <TabsTrigger value="courses" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <BookOpen className="h-4 w-4 mr-2" />
        Cours
      </TabsTrigger>
      
      <TabsTrigger value="business" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <Building2 className="h-4 w-4 mr-2" />
        Entreprises
      </TabsTrigger>
      
      <TabsTrigger value="finance" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <CreditCard className="h-4 w-4 mr-2" />
        Finance
      </TabsTrigger>
      
      <TabsTrigger value="statistics" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <BarChart3 className="h-4 w-4 mr-2" />
        Statistiques
      </TabsTrigger>
      
      <TabsTrigger value="marketing" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <Megaphone className="h-4 w-4 mr-2" />
        Marketing
      </TabsTrigger>
      
      <TabsTrigger value="messages" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <MessageSquare className="h-4 w-4 mr-2" />
        Messages
      </TabsTrigger>
      
      <TabsTrigger value="notifications" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <Bell className="h-4 w-4 mr-2" />
        Notifications
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="flex items-center px-4 py-3 border-b-2 border-transparent data-[state=active]:border-schoolier-teal rounded-none">
        <Settings className="h-4 w-4 mr-2" />
        Paramètres
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsNavigation;
