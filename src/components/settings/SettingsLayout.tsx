
import React from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Moon, Globe, Shield } from "lucide-react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <SidebarInset className="p-0">
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center p-4 border-b">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-xl font-semibold">Paramètres</h1>
        </div>
        
        <div className="container px-6 py-8 flex-grow">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Paramètres du compte</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles, préférences et paramètres de sécurité.
            </p>
          </div>
          
          {children}
        </div>
      </div>
    </SidebarInset>
  );
};

export const SettingsTabs: React.FC<{
  defaultValue?: string;
  onTabChange?: (value: string) => void;
  children: React.ReactNode;
}> = ({ defaultValue = "profile", onTabChange, children }) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full" onValueChange={onTabChange}>
      <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
        <TabsTrigger value="profile" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Profil
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          Préférences
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Sécurité
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};
