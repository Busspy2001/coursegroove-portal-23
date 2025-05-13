
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Bell, CreditCard, LogOut, Upload, Loader2 } from "lucide-react";
import { User as UserType } from "@/contexts/auth/types";

interface ProfileSidebarProps {
  currentUser: UserType | null;
  onLogout: () => Promise<void>;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      console.log("Déconnexion du profil en cours...");
      
      // Utiliser le callback pour rediriger après la déconnexion complète
      await onLogout(() => {
        navigate("/login", { replace: true });
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion du profil:", error);
    }
  };
  
  return (
    <div className="lg:col-span-1">
      <div className="p-6 border rounded-lg shadow-sm bg-card">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name?.replace(" ", "+") || "User"}&background=0D9488&color=fff&size=200`}
              alt={currentUser?.name || "User"}
              className="w-32 h-32 rounded-full"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-schoolier-blue text-white p-2 rounded-full cursor-pointer">
              <Upload className="h-4 w-4" />
              <input id="avatar-upload" type="file" className="hidden" />
            </label>
          </div>
          
          <h2 className="text-xl font-bold">{currentUser?.name}</h2>
          <p className="text-sm text-muted-foreground mb-1">{currentUser?.email}</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
            {currentUser?.role}
          </span>
        </div>
        
        <Separator className="my-6" />
        
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" disabled>
            <User className="mr-3 h-5 w-5" /> Informations personnelles
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Shield className="mr-3 h-5 w-5" /> Sécurité
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Bell className="mr-3 h-5 w-5" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <CreditCard className="mr-3 h-5 w-5" /> Paiements
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
            data-profile-logout="true"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;
