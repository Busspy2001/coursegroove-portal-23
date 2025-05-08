
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, GraduationCap, Award } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
      <div className="container px-6 mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 flex flex-col items-start space-y-6 animate-fade-in">
          <Badge className="bg-schoolier-teal/20 text-schoolier-teal border-none px-3 py-1.5 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4 mr-1" /> Formation en ligne
          </Badge>
          <h1 className="heading-1 text-schoolier-blue text-left">
            Transformez vos <span className="text-schoolier-teal">ambitions</span> en compétences 🚀
          </h1>
          <p className="subheading text-left">
            Apprenez auprès d'experts et développez votre carrière avec des formations de qualité, 
            accessibles à tout moment, n'importe où.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-schoolier-teal hover:bg-schoolier-teal/90">
              Commencer gratuitement
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/courses")} className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10">
              Explorer les cours
            </Button>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
              +10 000 étudiants
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
              98% satisfaction
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
              Garantie 30j
            </span>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-up">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop"
              alt="Étudiants apprenant en ligne"
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="bg-schoolier-blue/10 rounded-full p-2">
                <GraduationCap className="h-6 w-6 text-schoolier-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold">+1500 cours</p>
                <p className="text-xs text-muted-foreground">Par des experts certifiés</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="bg-schoolier-teal/10 rounded-full p-2">
                <Award className="h-6 w-6 text-schoolier-teal" />
              </div>
              <div>
                <p className="text-sm font-semibold">Certifications</p>
                <p className="text-xs text-muted-foreground">Reconnues par l'industrie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
