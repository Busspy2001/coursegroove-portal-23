
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SecurityTab from "@/components/profile/SecurityTab";
import NotificationsTab from "@/components/profile/NotificationsTab";
import BillingTab from "@/components/profile/BillingTab";

const Profile = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!isAuthenticated || !currentUser) {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mon profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <ProfileSidebar 
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Facturation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalInfoTab 
                  currentUser={currentUser}
                  initialName={currentUser?.name || ""}
                  initialBio={currentUser?.bio || ""}
                />
              </TabsContent>
              
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
              
              <TabsContent value="billing">
                <BillingTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Profile;
