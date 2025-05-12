
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SecurityTab from "@/components/profile/SecurityTab";
import NotificationsTab from "@/components/profile/NotificationsTab";
import BillingTab from "@/components/profile/BillingTab";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { currentUser, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);
  
  const handleLogout = async () => {
    try {
      // Utiliser le callback pour rediriger après déconnexion complète
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container max-w-7xl px-4 py-8 md:py-12">
          <div className="pb-4 border-b mb-6">
            <h1 className="text-2xl font-bold">Mon profil</h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <ProfileSidebar currentUser={currentUser} onLogout={handleLogout} />
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                  <TabsTrigger value="security">Sécurité</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="billing">Facturation</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <PersonalInfoTab currentUser={currentUser} />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
