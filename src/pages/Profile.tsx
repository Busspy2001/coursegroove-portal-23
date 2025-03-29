
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <img
              src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
              alt="Profile"
              className="h-32 w-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold">{currentUser?.name}</h2>
            <p className="text-muted-foreground">{currentUser?.email}</p>
          </div>
          
          <div className="text-center mb-8">
            <p>La page de profil sera bientôt disponible avec plus de fonctionnalités.</p>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
