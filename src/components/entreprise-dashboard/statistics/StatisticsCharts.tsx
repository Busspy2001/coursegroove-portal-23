
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Données pour le graphique d'engagement mensuel
const monthlyEngagementData = [
  { month: 'Jan', hours: 280 },
  { month: 'Fév', hours: 300 },
  { month: 'Mar', hours: 320 },
  { month: 'Avr', hours: 340 },
  { month: 'Mai', hours: 380 },
  { month: 'Juin', hours: 425 },
];

// Données pour la comparaison par département
const departmentComparisonData = [
  { name: 'IT', completion: 92 },
  { name: 'Marketing', completion: 78 },
  { name: 'RH', completion: 85 },
  { name: 'Finance', completion: 81 },
  { name: 'Ventes', completion: 76 },
  { name: 'Support', completion: 88 },
];

// Données pour la complétion des cours
const courseCompletionData = [
  { name: 'Excel avancé', value: 92 },
  { name: 'Cybersécurité', value: 85 },
  { name: 'RGPD', value: 78 },
  { name: 'Communication', value: 74 },
  { name: 'Marketing digital', value: 68 },
];

// Données pour la progression des employés
const employeeProgressData = [
  { name: 'Sophie M.', hours: 24 },
  { name: 'Thomas D.', hours: 22 },
  { name: 'Marie L.', hours: 20 },
  { name: 'Antoine B.', hours: 18 },
  { name: 'Julie C.', hours: 17 },
  { name: 'Philippe R.', hours: 15 },
  { name: 'Emma S.', hours: 14 },
  { name: 'Lucas G.', hours: 13 },
];

// Couleurs pour les graphiques
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#ef4444', '#06b6d4', '#8b5cf6'];

// Graphique d'engagement mensuel
export const MonthlyEngagementChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyEngagementData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis unit="h" />
        <Tooltip formatter={(value) => [`${value} heures`, 'Temps total']} />
        <Legend />
        <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Graphique de comparaison par département
export const DepartmentComparisonChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={departmentComparisonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} unit="%" />
        <Tooltip formatter={(value) => [`${value}%`, 'Taux de complétion']} />
        <Legend />
        <Bar dataKey="completion" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Graphique de complétion des cours
export const CourseCompletionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={courseCompletionData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {courseCompletionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, 'Taux de complétion']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Graphique de progression des employés
export const EmployeeProgressChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={employeeProgressData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit="h" />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip formatter={(value) => [`${value} heures`, 'Temps de formation']} />
        <Legend />
        <Bar dataKey="hours" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
