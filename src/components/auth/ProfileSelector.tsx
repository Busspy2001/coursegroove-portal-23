
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Book, GraduationCap, Building, Briefcase } from "lucide-react";

interface ProfileOption {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  route: string;
}

export const ProfileSelector = () => {
  const navigate = useNavigate();

  const profiles: ProfileOption[] = [
    {
      id: "student",
      title: "Étudiant",
      description: "Accédez à des milliers de cours et progressez à votre rythme",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-schoolier-blue to-schoolier-dark-blue",
      route: "/login?profile=student",
    },
    {
      id: "instructor",
      title: "Enseignant",
      description: "Partagez votre expertise et créez des cours de qualité",
      icon: Book,
      color: "bg-gradient-to-br from-schoolier-teal to-schoolier-dark-teal",
      route: "/login?profile=instructor",
    },
    {
      id: "business",
      title: "Entreprise",
      description: "Gérez la formation de vos équipes et suivez leurs progrès",
      icon: Building,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      route: "/login?profile=business",
    },
    {
      id: "employee",
      title: "Employé",
      description: "Accédez aux formations fournies par votre entreprise",
      icon: Briefcase,
      color: "bg-gradient-to-br from-purple-500 to-indigo-600",
      route: "/login?profile=employee",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Bienvenue sur Schoolier</h1>
        <p className="text-lg text-muted-foreground">
          Sélectionnez votre profil pour continuer
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {profiles.map((profile) => (
          <motion.div key={profile.id} variants={item}>
            <Card 
              className="cursor-pointer h-full hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(profile.route)}
            >
              <div className="flex flex-col h-full">
                <div className={`${profile.color} p-6 rounded-t-lg text-white flex justify-between items-center`}>
                  <h3 className="text-2xl font-bold">{profile.title}</h3>
                  <profile.icon className="h-8 w-8" />
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">{profile.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm font-medium text-schoolier-blue flex items-center">
                      Continuer
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfileSelector;
