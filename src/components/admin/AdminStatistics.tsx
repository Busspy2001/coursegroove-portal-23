
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminStatistics = () => {
  const [period, setPeriod] = useState("30");
  const [chartType, setChartType] = useState("users");

  // Mock data for charts
  const usersData = [
    { name: '1 Mai', total: 1200 },
    { name: '2 Mai', total: 1300 },
    { name: '3 Mai', total: 1400 },
    { name: '4 Mai', total: 1350 },
    { name: '5 Mai', total: 1450 },
    { name: '6 Mai', total: 1500 },
    { name: '7 Mai', total: 1600 },
    { name: '8 Mai', total: 1750 },
  ];

  const revenueData = [
    { name: '1 Mai', total: 4500 },
    { name: '2 Mai', total: 3500 },
    { name: '3 Mai', total: 5200 },
    { name: '4 Mai', total: 4800 },
    { name: '5 Mai', total: 6000 },
    { name: '6 Mai', total: 5600 },
    { name: '7 Mai', total: 7500 },
    { name: '8 Mai', total: 8000 },
  ];

  const courseEnrollmentsData = [
    { name: '1 Mai', total: 125 },
    { name: '2 Mai', total: 150 },
    { name: '3 Mai', total: 175 },
    { name: '4 Mai', total: 140 },
    { name: '5 Mai', total: 190 },
    { name: '6 Mai', total: 210 },
    { name: '7 Mai', total: 200 },
    { name: '8 Mai', total: 230 },
  ];

  const courseCompletionsData = [
    { name: '1 Mai', total: 45 },
    { name: '2 Mai', total: 55 },
    { name: '3 Mai', total: 50 },
    { name: '4 Mai', total: 60 },
    { name: '5 Mai', total: 70 },
    { name: '6 Mai', total: 65 },
    { name: '7 Mai', total: 80 },
    { name: '8 Mai', total: 90 },
  ];

  // Top categories data
  const categoriesData = [
    { name: 'Développement Web', total: 2450 },
    { name: 'Data Science', total: 1890 },
    { name: 'Marketing', total: 1550 },
    { name: 'Design', total: 1320 },
    { name: 'Business', total: 1100 },
  ];

  // Active course enrollments by category
  const enrollmentsByCategory = [
    { name: 'Développement Web', students: 2450 },
    { name: 'Data Science', students: 1890 },
    { name: 'Marketing', students: 1550 },
    { name: 'Design', students: 1320 },
    { name: 'Business', students: 1100 },
  ];

  // Get current chart data based on selection
  const getCurrentChartData = () => {
    switch (chartType) {
      case "users":
        return usersData;
      case "revenue":
        return revenueData;
      case "enrollments":
        return courseEnrollmentsData;
      case "completions":
        return courseCompletionsData;
      default:
        return usersData;
    }
  };

  // Get y-axis label based on selected chart
  const getYAxisLabel = () => {
    switch (chartType) {
      case "users":
        return "Utilisateurs";
      case "revenue":
        return "Revenus (€)";
      case "enrollments":
        return "Inscriptions";
      case "completions":
        return "Achèvements";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Statistiques générales</h2>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start md:items-center justify-between">
        <Tabs defaultValue="overview" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="instructors">Instructeurs</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 derniers jours</SelectItem>
              <SelectItem value="30">30 derniers jours</SelectItem>
              <SelectItem value="90">90 derniers jours</SelectItem>
              <SelectItem value="365">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Exporter</Button>
        </div>
      </div>

      {/* Cards showing key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={chartType === "users" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs totaux
            </CardTitle>
            <CardDescription>+21% par rapport au mois dernier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-xs text-muted-foreground hover:text-primary"
              onClick={() => setChartType("users")}
            >
              Voir les détails →
            </Button>
          </CardContent>
        </Card>
        
        <Card className={chartType === "revenue" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Revenus mensuels
            </CardTitle>
            <CardDescription>+12.5% par rapport au mois dernier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34,950€</div>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-xs text-muted-foreground hover:text-primary"
              onClick={() => setChartType("revenue")}
            >
              Voir les détails →
            </Button>
          </CardContent>
        </Card>
        
        <Card className={chartType === "enrollments" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Inscriptions aux cours
            </CardTitle>
            <CardDescription>+18% par rapport au mois dernier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452</div>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-xs text-muted-foreground hover:text-primary"
              onClick={() => setChartType("enrollments")}
            >
              Voir les détails →
            </Button>
          </CardContent>
        </Card>
        
        <Card className={chartType === "completions" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Achèvements de cours
            </CardTitle>
            <CardDescription>+8% par rapport au mois dernier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">143</div>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-xs text-muted-foreground hover:text-primary"
              onClick={() => setChartType("completions")}
            >
              Voir les détails →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {chartType === "users" && "Croissance des utilisateurs"}
            {chartType === "revenue" && "Évolution des revenus"}
            {chartType === "enrollments" && "Inscriptions aux cours"}
            {chartType === "completions" && "Achèvements de cours"}
          </CardTitle>
          <CardDescription>
            Période: {period === "7" ? "7 derniers jours" : 
                     period === "30" ? "30 derniers jours" : 
                     period === "90" ? "90 derniers jours" : "12 derniers mois"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getCurrentChartData()}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  label={{ 
                    value: getYAxisLabel(), 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#888888', fontSize: 12 }
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#0D9488"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: "#0D9488" }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top categories */}
        <Card>
          <CardHeader>
            <CardTitle>Catégories les plus populaires</CardTitle>
            <CardDescription>
              Par nombre d'inscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoriesData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 120,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid horizontal strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    width={100}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="total" 
                    fill="#0D9488" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Completion rates */}
        <Card>
          <CardHeader>
            <CardTitle>Taux d'achèvement par catégorie</CardTitle>
            <CardDescription>
              Pourcentage d'étudiants terminant les cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Dév. Web", rate: 68 },
                    { name: "Data Science", rate: 72 },
                    { name: "Marketing", rate: 81 },
                    { name: "Design", rate: 76 },
                    { name: "Business", rate: 85 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, "Taux d'achèvement"]} />
                  <Bar 
                    dataKey="rate" 
                    fill="#0D9488" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;
