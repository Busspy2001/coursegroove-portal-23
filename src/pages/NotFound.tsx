
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Home, BookOpen, HelpCircle } from "lucide-react";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-grow container px-4 py-8 md:py-16 flex flex-col items-center justify-center text-center ${isMobile ? "pb-20" : ""}`}>
        <div className="text-6xl md:text-9xl font-bold text-schoolier-blue mb-4 md:mb-6 font-spartan">404</div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 font-spartan">Page non trouvée</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-md">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-4 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Rechercher un cours ou un sujet..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`)}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 w-full max-w-md">
          <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button onClick={() => navigate("/")} className="bg-schoolier-blue hover:bg-schoolier-blue/90 flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
          <Button onClick={() => navigate("/courses")} variant="secondary" className="bg-schoolier-teal hover:bg-schoolier-teal/90 text-white flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Cours
          </Button>
        </div>

        {!isMobile && (
          <>
            <div className="mt-16">
              <h2 className="text-xl font-semibold mb-4 font-spartan">Pages populaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Cours en développement web", path: "/courses?category=Développement Web" },
                  { title: "Cours en marketing digital", path: "/courses?category=Marketing Digital" },
                  { title: "Blog éducatif", path: "/blog" },
                  { title: "À propos de Schoolier", path: "/about" },
                  { title: "FAQ / Centre d'aide", path: "/faq" },
                  { title: "Contact", path: "/contact" }
                ].map((link, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    className="text-schoolier-blue hover:text-schoolier-teal transition-colors font-spartan"
                    onClick={() => navigate(link.path)}
                  >
                    {link.title}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-16 max-w-md">
              <Button 
                variant="outline"
                className="flex items-center"
                onClick={() => navigate("/faq")}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Besoin d'aide ? Consultez notre FAQ
              </Button>
            </div>
          </>
        )}
      </div>
      
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default NotFound;
