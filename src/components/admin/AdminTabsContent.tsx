
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

const AdminTabsContent = () => {
  const DevelopmentNotice = ({ feature }: { feature: string }) => (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
      <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
      <p>{feature} sera disponible prochainement.</p>
    </div>
  );

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
          <DevelopmentNotice feature="Le module marketing" />
        </TabsContent>
        
        <TabsContent value="messages">
          <DevelopmentNotice feature="Le système de messagerie admin" />
        </TabsContent>
        
        <TabsContent value="notifications">
          <DevelopmentNotice feature="La gestion des notifications" />
        </TabsContent>
        
        <TabsContent value="settings">
          <DevelopmentNotice feature="Les paramètres système" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTabsContent;
