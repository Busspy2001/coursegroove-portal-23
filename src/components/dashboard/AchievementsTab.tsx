
import React from "react";
import { Card } from "@/components/ui/card";

interface Achievement {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const AchievementsTab = () => {
  const achievements: Achievement[] = [
    {
      name: "Première inscription",
      description: "Vous avez complété votre inscription",
      icon: "🎉",
      unlocked: true,
    },
    {
      name: "Premier cours complété",
      description: "Vous avez terminé votre premier cours",
      icon: "🏆",
      unlocked: true,
    },
    {
      name: "Premier certificat",
      description: "Vous avez obtenu votre premier certificat",
      icon: "📜",
      unlocked: true,
    },
    {
      name: "5 cours complétés",
      description: "Vous avez terminé 5 cours",
      icon: "🔥",
      unlocked: false,
    },
    {
      name: "10 heures d'apprentissage",
      description: "Vous avez passé 10 heures à apprendre",
      icon: "⏱️",
      unlocked: true,
    },
    {
      name: "Participation au forum",
      description: "Vous avez participé aux discussions",
      icon: "💬",
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes réalisations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`p-6 ${!achievement.unlocked && "opacity-50"}`}>
            <div className="text-4xl mb-4">{achievement.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            {achievement.unlocked ? (
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Débloqué
              </div>
            ) : (
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Non débloqué
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsTab;
