
import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Données fictives pour le graphique
const data = [
  { name: "Marketing", value: 78 },
  { name: "IT", value: 92 },
  { name: "RH", value: 85 },
  { name: "Finance", value: 65 },
  { name: "Ventes", value: 72 },
  { name: "Support", value: 80 }
];

export const OverviewChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          tickLine={false} 
          axisLine={false}
          fontSize={12}
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
        />
        <Tooltip 
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          formatter={(value: any) => [`${value}%`, "Taux de complétion"]}
        />
        <Bar 
          dataKey="value" 
          fill="#0d9488" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
