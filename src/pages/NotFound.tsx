
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="text-9xl font-bold text-schoolier-blue mb-6">404</div>
        <h1 className="text-4xl font-bold mb-6">Page non trouvée</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-md">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button onClick={() => navigate("/")} className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Page d'accueil
          </Button>
          <Button onClick={() => navigate("/courses")} variant="secondary" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Explorer les cours
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
