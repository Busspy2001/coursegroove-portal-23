
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const InstructorSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 container px-6 mx-auto">
      <div className="bg-schoolier-blue/10 rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Instructeur Schoolier" 
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <Badge className="bg-schoolier-teal/20 text-schoolier-teal border-none px-3 py-1.5 text-sm font-medium mb-4">
              Pour les experts
            </Badge>
            <h2 className="text-3xl font-bold text-schoolier-blue mb-4 font-spartan">Monétisez votre savoir 📈</h2>
            <p className="text-lg mb-6">
              Rejoignez notre communauté d'experts et gagnez de l'argent en partageant vos connaissances avec des milliers d'étudiants passionnés.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold font-spartan">Créez à votre façon</h4>
                  <p className="text-muted-foreground">Développez des cours avec notre plateforme intuitive</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold font-spartan">Une audience mondiale</h4>
                  <p className="text-muted-foreground">Touchez des milliers d'étudiants du monde entier</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold font-spartan">Revenus attractifs</h4>
                  <p className="text-muted-foreground">Jusqu'à 70% de commission sur chaque vente</p>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={() => navigate("/become-instructor")}
              className="bg-schoolier-blue hover:bg-schoolier-blue/90 font-spartan"
            >
              Devenir Instructeur
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
