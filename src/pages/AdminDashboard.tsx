
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Shield, BarChart } from "lucide-react";
import AdminGlobalDashboard from "@/components/admin/AdminGlobalDashboard";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminCourseModeration from "@/components/admin/AdminCourseModeration";
import AdminStatistics from "@/components/admin/AdminStatistics";

const AdminDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "admin") {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Espace Administration</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Tableau de bord</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Modération</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden md:inline">Statistiques</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AdminGlobalDashboard />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUserManagement />
            </TabsContent>
            
            <TabsContent value="moderation">
              <AdminCourseModeration />
            </TabsContent>
            
            <TabsContent value="statistics">
              <AdminStatistics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
