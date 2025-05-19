
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", formations: 12, complete: 8, rate: 67 },
  { month: "Fév", formations: 15, complete: 10, rate: 67 },
  { month: "Mar", formations: 18, complete: 14, rate: 78 },
  { month: "Avr", formations: 22, complete: 15, rate: 68 },
  { month: "Mai", formations: 25, complete: 19, rate: 76 },
  { month: "Juin", formations: 28, complete: 22, rate: 79 },
  { month: "Juil", formations: 32, complete: 26, rate: 81 },
  { month: "Août", formations: 30, complete: 25, rate: 83 },
];

export const OverviewChart: React.FC = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              border: "1px solid #f0f0f0",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="formations" name="Formations assignées" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="complete" name="Formations complétées" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
