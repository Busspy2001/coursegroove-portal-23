
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, TrendingUp, Eye, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const InstructorStats = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [period, setPeriod] = React.useState("30days");
  const [courseFilter, setCourseFilter] = React.useState("all");

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null;
  }

  // Mock data for charts and stats
  const revenueData = [
    { name: '1 Jan', value: 240 },
    { name: '5 Jan', value: 300 },
    { name: '10 Jan', value: 280 },
    { name: '15 Jan', value: 320 },
    { name: '20 Jan', value: 350 },
    { name: '25 Jan', value: 420 },
    { name: '31 Jan', value: 490 },
    { name: '5 Feb', value: 510 },
    { name: '10 Feb', value: 530 },
    { name: '15 Feb', value: 580 },
    { name: '20 Feb', value: 620 },
    { name: '25 Feb', value: 650 },
    { name: '28 Feb', value: 680 },
  ];

  const enrollmentsData = [
    { name: '1 Jan', value: 18 },
    { name: '5 Jan', value: 22 },
    { name: '10 Jan', value: 20 },
    { name: '15 Jan', value: 24 },
    { name: '20 Jan', value: 27 },
    { name: '25 Jan', value: 32 },
    { name: '31 Jan', value: 38 },
    { name: '5 Feb', value: 42 },
    { name: '10 Feb', value: 45 },
    { name: '15 Feb', value: 48 },
    { name: '20 Feb', value: 52 },
    { name: '25 Feb', value: 56 },
    { name: '28 Feb', value: 60 },
  ];

  const viewsData = [
    { name: '1 Jan', value: 120 },
    { name: '5 Jan', value: 140 },
    { name: '10 Jan', value: 160 },
    { name: '15 Jan', value: 180 },
    { name: '20 Jan', value: 210 },
    { name: '25 Jan', value: 250 },
    { name: '31 Jan', value: 290 },
    { name: '5 Feb', value: 310 },
    { name: '10 Feb', value: 320 },
    { name: '15 Feb', value: 350 },
    { name: '20 Feb', value: 380 },
    { name: '25 Feb', value: 410 },
    { name: '28 Feb', value: 430 },
  ];

  const coursesPerformanceData = [
    { name: 'JavaScript Moderne', views: 1400, enrollments: 125, revenue: 6250 },
    { name: 'Fondamentaux Web', views: 980, enrollments: 87, revenue: 2610 },
    { name: 'React Débutant', views: 450, enrollments: 38, revenue: 1520 },
    { name: 'Python Data Science', views: 780, enrollments: 44, revenue: 2640 },
  ];

  const completionRateData = [
    { name: 'Terminé', value: 68 },
    { name: 'En cours', value: 24 },
    { name: 'Abandonné', value: 8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const conversionRateData = [
    { name: 'Vue → Inscription', rate: 6.8 },
    { name: 'Inscription → Achat', rate: 12.5 },
    { name: 'Vue → Achat', rate: 2.9 },
  ];

  // Stats summary
  const statsSummary = {
    totalViews: 3200,
    viewsTrend: 18, // percentage increase
    totalEnrollments: 294,
    enrollmentsTrend: 12, // percentage increase
    totalRevenue: 14720,
    revenueTrend: 24, // percentage increase
    avgCompletionRate: 68,
    completionTrend: 5, // percentage increase
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Analyse des données en cours...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Performances</h1>
                <p className="text-muted-foreground">
                  Statistiques et analyses de vos cours
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 derniers jours</SelectItem>
                    <SelectItem value="30days">30 derniers jours</SelectItem>
                    <SelectItem value="90days">90 derniers jours</SelectItem>
                    <SelectItem value="year">Année en cours</SelectItem>
                    <SelectItem value="all">Tout</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Tous les cours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les cours</SelectItem>
                    <SelectItem value="course1">JavaScript Moderne</SelectItem>
                    <SelectItem value="course2">Fondamentaux Web</SelectItem>
                    <SelectItem value="course3">React Débutant</SelectItem>
                    <SelectItem value="course4">Python Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Vues totales</p>
                      <h3 className="text-3xl font-bold mt-1">{statsSummary.totalViews}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm ${statsSummary.viewsTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {statsSummary.viewsTrend >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(statsSummary.viewsTrend)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Eye className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Inscriptions</p>
                      <h3 className="text-3xl font-bold mt-1">{statsSummary.totalEnrollments}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm ${statsSummary.enrollmentsTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {statsSummary.enrollmentsTrend >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(statsSummary.enrollmentsTrend)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <Users className="h-7 w-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenus</p>
                      <h3 className="text-3xl font-bold mt-1">{statsSummary.totalRevenue} €</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm ${statsSummary.revenueTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {statsSummary.revenueTrend >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(statsSummary.revenueTrend)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
                      </div>
                    </div>
                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                      <ShoppingCart className="h-7 w-7 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Taux de complétion</p>
                      <h3 className="text-3xl font-bold mt-1">{statsSummary.avgCompletionRate}%</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm ${statsSummary.completionTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {statsSummary.completionTrend >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(statsSummary.completionTrend)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
                      </div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <TrendingUp className="h-7 w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overview" className="w-full mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="revenue">Revenus</TabsTrigger>
                <TabsTrigger value="enrollments">Inscriptions</TabsTrigger>
                <TabsTrigger value="completion">Complétion</TabsTrigger>
                <TabsTrigger value="conversion">Conversion</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performances des derniers mois</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              name="Revenus (€)" 
                              stroke="#8884d8" 
                              strokeWidth={3} 
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Performances par cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={coursesPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="views" name="Vues" fill="#8884d8" />
                            <Bar yAxisId="left" dataKey="enrollments" name="Inscriptions" fill="#82ca9d" />
                            <Bar yAxisId="right" dataKey="revenue" name="Revenus (€)" fill="#ffc658" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution des revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              name="Revenus (€)" 
                              stroke="#8884d8" 
                              strokeWidth={3} 
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition des revenus par cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px] flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={coursesPerformanceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={150}
                              fill="#8884d8"
                              dataKey="revenue"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {coursesPerformanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="enrollments">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tendance des inscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={enrollmentsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              name="Inscriptions" 
                              stroke="#82ca9d" 
                              strokeWidth={3} 
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition des inscriptions par cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={coursesPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="enrollments" name="Inscriptions" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="completion">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Taux de complétion global</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px] flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={completionRateData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={150}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}%`}
                            >
                              <Cell fill="#4CAF50" />
                              <Cell fill="#FFC107" />
                              <Cell fill="#F44336" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Points d'abandon courants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Module 3 - JavaScript avancé</span>
                            <span className="font-medium">28%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "28%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Module 5 - Développement d'API</span>
                            <span className="font-medium">22%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "22%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Module 7 - Projet final</span>
                            <span className="font-medium">18%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "18%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Module 2 - Bases de données</span>
                            <span className="font-medium">14%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "14%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Module 4 - Architecture MVC</span>
                            <span className="font-medium">12%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "12%" }} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="conversion">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Taux de conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={conversionRateData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="rate" name="Taux (%)" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Tendance des vues et ventes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" allowDuplicatedCategory={false} />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip />
                            <Legend />
                            <Line 
                              yAxisId="left" 
                              type="monotone" 
                              data={viewsData} 
                              dataKey="value" 
                              name="Vues" 
                              stroke="#8884d8" 
                              strokeWidth={2} 
                              activeDot={{ r: 6 }} 
                            />
                            <Line 
                              yAxisId="right" 
                              type="monotone" 
                              data={enrollmentsData} 
                              dataKey="value" 
                              name="Ventes" 
                              stroke="#82ca9d" 
                              strokeWidth={2} 
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <Card>
              <CardHeader>
                <CardTitle>Activité des étudiants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="space-y-2">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const intensity = Math.floor(Math.random() * 5); // 0-4
                        const colorClasses = [
                          "bg-gray-100",
                          "bg-green-100",
                          "bg-green-200",
                          "bg-green-300",
                          "bg-green-400",
                        ];
                        return (
                          <div
                            key={dayIndex}
                            className={`h-4 w-4 rounded-sm ${colorClasses[intensity]}`}
                            title={`${intensity * 20}% d'activité`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4 gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Moins</span>
                  <div className="bg-gray-100 h-3 w-3 rounded-sm" />
                  <div className="bg-green-100 h-3 w-3 rounded-sm" />
                  <div className="bg-green-200 h-3 w-3 rounded-sm" />
                  <div className="bg-green-300 h-3 w-3 rounded-sm" />
                  <div className="bg-green-400 h-3 w-3 rounded-sm" />
                  <span className="text-xs text-muted-foreground">Plus</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorStats;
