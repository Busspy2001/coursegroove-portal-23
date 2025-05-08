
import React from "react";
import { Card } from "@/components/ui/card";
import { Achievement } from "@/hooks/use-user-data";

interface AchievementsTabProps {
  achievements: Achievement[];
}

const AchievementsTab = ({ achievements }: AchievementsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes réalisations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`p-6 ${!achievement.unlocked && "opacity-50"}`}>
            <div className="flex items-start mb-4">
              <div className="text-4xl">{achievement.icon}</div>
              {achievement.iconUrl && (
                <img 
                  src={achievement.iconUrl} 
                  alt={achievement.name} 
                  className="h-12 w-12"
                />
              )}
            </div>
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
