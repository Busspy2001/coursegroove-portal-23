
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Clock, Award } from "lucide-react";

interface StatCardsProps {
  stats: {
    totalCoursesEnrolled: number;
    totalHoursLearned: number;
    certificatesEarned: number;
  };
}

const StatCards = ({ stats }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Cours en cours</CardTitle>
            <CardDescription>Continuez où vous vous êtes arrêté</CardDescription>
          </div>
          <BookOpen className="h-6 w-6 text-schoolier-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalCoursesEnrolled}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Heures d'apprentissage</CardTitle>
            <CardDescription>Total d'heures ce mois-ci</CardDescription>
          </div>
          <Clock className="h-6 w-6 text-schoolier-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalHoursLearned}h</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Certifications</CardTitle>
            <CardDescription>Cours complétés avec certificat</CardDescription>
          </div>
          <Award className="h-6 w-6 text-schoolier-green" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.certificatesEarned}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
