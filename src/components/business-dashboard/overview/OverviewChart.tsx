
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const OverviewChart = () => {
  // Données fictives pour l'affichage du graphique
  const data = [
    { name: 'Janvier', Marketing: 65, IT: 78, RH: 55, Finance: 60 },
    { name: 'Février', Marketing: 70, IT: 82, RH: 63, Finance: 68 },
    { name: 'Mars', Marketing: 73, IT: 79, RH: 68, Finance: 72 },
    { name: 'Avril', Marketing: 75, IT: 85, RH: 72, Finance: 78 },
    { name: 'Mai', Marketing: 78, IT: 87, RH: 75, Finance: 82 },
    { name: 'Juin', Marketing: 82, IT: 90, RH: 78, Finance: 84 },
  ];

  const colors = {
    Marketing: '#8b5cf6',
    IT: '#3b82f6', 
    RH: '#10b981',
    Finance: '#f59e0b'
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="%" />
        <Tooltip formatter={(value) => [`${value}%`, '']} />
        <Legend />
        {Object.keys(colors).map((key) => (
          <Bar 
            key={key} 
            dataKey={key} 
            fill={colors[key as keyof typeof colors]} 
            radius={[4, 4, 0, 0]} 
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
