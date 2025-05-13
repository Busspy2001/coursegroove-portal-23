
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, Users, Shield, BarChart, BookOpen, 
  CreditCard, Bell, Settings, Building, MessageSquare,
  Tag
} from "lucide-react";
import { UserRole } from "@/types/database";

interface AdminTabsNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  userRole: UserRole | null;
}

const AdminTabsNavigation = ({ activeTab, setActiveTab, userRole }: AdminTabsNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-4 md:grid-cols-10 mb-8 p-1 overflow-x-auto">
      <TabsTrigger value="dashboard" className="flex items-center space-x-2 font-spartan">
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden md:inline">Dashboard</span>
      </TabsTrigger>
      
      <TabsTrigger value="users" className="flex items-center space-x-2 font-spartan">
        <Users className="h-4 w-4" />
        <span className="hidden md:inline">Utilisateurs</span>
      </TabsTrigger>
      
      <TabsTrigger value="courses" className="flex items-center space-x-2 font-spartan">
        <BookOpen className="h-4 w-4" />
        <span className="hidden md:inline">Cours</span>
      </TabsTrigger>
      
      <TabsTrigger value="business" className="flex items-center space-x-2 font-spartan" 
        disabled={userRole !== "super_admin" && userRole !== "business_admin"}>
        <Building className="h-4 w-4" />
        <span className="hidden md:inline">Entreprises</span>
      </TabsTrigger>
      
      <TabsTrigger value="finance" className="flex items-center space-x-2 font-spartan"
        disabled={userRole !== "super_admin"}>
        <CreditCard className="h-4 w-4" />
        <span className="hidden md:inline">Finance</span>
      </TabsTrigger>
      
      <TabsTrigger value="statistics" className="flex items-center space-x-2 font-spartan">
        <BarChart className="h-4 w-4" />
        <span className="hidden md:inline">Statistiques</span>
      </TabsTrigger>
      
      <TabsTrigger value="marketing" className="flex items-center space-x-2 font-spartan"
        disabled={userRole !== "super_admin"}>
        <Tag className="h-4 w-4" />
        <span className="hidden md:inline">Marketing</span>
      </TabsTrigger>
      
      <TabsTrigger value="messages" className="flex items-center space-x-2 font-spartan">
        <MessageSquare className="h-4 w-4" />
        <span className="hidden md:inline">Messages</span>
      </TabsTrigger>
      
      <TabsTrigger value="notifications" className="flex items-center space-x-2 font-spartan">
        <Bell className="h-4 w-4" />
        <span className="hidden md:inline">Notifications</span>
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="flex items-center space-x-2 font-spartan"
        disabled={userRole !== "super_admin"}>
        <Settings className="h-4 w-4" />
        <span className="hidden md:inline">Paramètres</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsNavigation;
