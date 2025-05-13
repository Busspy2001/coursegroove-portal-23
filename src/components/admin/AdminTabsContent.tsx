
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminGlobalDashboard from "@/components/admin/AdminGlobalDashboard";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminCourseModeration from "@/components/admin/AdminCourseModeration";
import AdminBusinessManagement from "@/components/admin/AdminBusinessManagement";
import AdminFinance from "@/components/admin/AdminFinance";
import AdminStatistics from "@/components/admin/AdminStatistics";
import AdminUserActivity from "@/components/admin/AdminUserActivity";
import AdminUserSupport from "@/components/admin/AdminUserSupport";
import AdminInternalMessages from "@/components/admin/communication/AdminInternalMessages";
import AdminFaq from "@/components/admin/communication/AdminFaq";
import AdminNotificationsManager from "@/components/admin/notifications/AdminNotificationsManager";
import AdminActivityLog from "@/components/admin/settings/AdminActivityLog";
import AdminMobileSettings from "@/components/admin/settings/AdminMobileSettings";
import AdminApiSettings from "@/components/admin/settings/AdminApiSettings";
import AdminSystemPerformance from "@/components/admin/system/AdminSystemPerformance";
import AdminNotificationTemplates from "@/components/admin/notifications/AdminNotificationTemplates";

const AdminTabsContent = () => {
  return (
    <div className="p-6">
      <Tabs defaultValue="dashboard">
        <TabsContent value="dashboard">
          <AdminGlobalDashboard />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUserManagement />
        </TabsContent>
        
        <TabsContent value="user-activity">
          <AdminUserActivity />
        </TabsContent>
        
        <TabsContent value="user-support">
          <AdminUserSupport />
        </TabsContent>
        
        <TabsContent value="courses">
          <AdminCourseModeration />
        </TabsContent>
        
        <TabsContent value="business">
          <AdminBusinessManagement />
        </TabsContent>
        
        <TabsContent value="finance">
          <AdminFinance />
        </TabsContent>
        
        <TabsContent value="statistics">
          <AdminStatistics />
        </TabsContent>
        
        <TabsContent value="marketing">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Module en développement</h3>
            <p>Le module marketing sera disponible prochainement avec toutes les fonctionnalités.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <AdminInternalMessages />
        </TabsContent>
        
        <TabsContent value="notifications">
          <AdminNotificationsManager />
        </TabsContent>
        
        <TabsContent value="settings">
          <AdminActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTabsContent;
