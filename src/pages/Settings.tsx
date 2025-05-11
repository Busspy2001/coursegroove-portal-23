
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { useAuth } from "@/contexts/auth";
import { TabsContent } from "@/components/ui/tabs";
import { SettingsLayout, SettingsTabs } from "@/components/settings/SettingsLayout";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { NotificationsForm } from "@/components/settings/NotificationsForm";
import { PreferencesForm } from "@/components/settings/PreferencesForm";
import { SecurityForm } from "@/components/settings/SecurityForm";

const Settings = () => {
  const { currentUser } = useAuth();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SettingsLayout>
          <SettingsTabs>
            {/* Onglet Profil */}
            <TabsContent value="profile">
              <div className="grid gap-8">
                <ProfileForm currentUser={currentUser} />
              </div>
            </TabsContent>
            
            {/* Onglet Notifications */}
            <TabsContent value="notifications">
              <NotificationsForm />
            </TabsContent>
            
            {/* Onglet Préférences */}
            <TabsContent value="preferences">
              <PreferencesForm />
            </TabsContent>
            
            {/* Onglet Sécurité */}
            <TabsContent value="security">
              <SecurityForm />
            </TabsContent>
          </SettingsTabs>
        </SettingsLayout>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
