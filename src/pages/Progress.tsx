
import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { useUserData } from "@/hooks/use-user-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Rename the imported Progress to avoid naming conflict
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Clock, Award, Calendar, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

// Données fictives pour les graphiques
const weeklyActivityData = [
  { jour: 'Lundi', minutes: 45 },
  { jour: 'Mardi', minutes: 30 },
  { jour: 'Mercredi', minutes: 60 },
  { jour: 'Jeudi', minutes: 0 },
  { jour: 'Vendredi', minutes: 90 },
  { jour: 'Samedi', minutes: 120 },
  { jour: 'Dimanche', minutes: 75 },
];

const monthlyProgressData = [
  { mois: 'Jan', progress: 20 },
  { mois: 'Fév', progress: 35 },
  { mois: 'Mars', progress: 30 },
  { mois: 'Avr', progress: 45 },
  { mois: 'Mai', progress: 65 },
];

const courseDistributionData = [
  { name: 'En cours', value: 3, color: '#0366d6' },
  { name: 'Terminés', value: 2, color: '#0d9488' },
  { name: 'Non commencés', value: 1, color: '#64748b' },
];

const courseCategoryData = [
  { category: 'Développement Web', count: 3 },
  { category: 'Design', count: 1 },
  { category: 'Marketing', count: 2 },
];

const COLORS = ['#0366d6', '#0d9488', '#10b981', '#eab308', '#64748b'];

const Progress = () => {
  const { stats, loading } = useUserData();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Progression</h1>
            </div>
            
            <div className="container px-6 py-8 flex-grow">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Ma progression</h1>
                <p className="text-muted-foreground">
                  Suivez votre évolution et vos performances d'apprentissage.
                </p>
              </div>

              {/* Statistiques générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Temps total d'apprentissage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-schoolier-blue" />
                      <span className="text-2xl font-bold">{stats.totalHoursLearned}h</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Cours terminés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-schoolier-green" />
                      <span className="text-2xl font-bold">{stats.totalCoursesCompleted}</span>
                      <span className="text-sm text-muted-foreground ml-2">/ {stats.totalCoursesEnrolled}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Certificats obtenus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-schoolier-yellow" />
                      <span className="text-2xl font-bold">{stats.certificatesEarned}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Progression moyenne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 mr-2 text-schoolier-teal" />
                      <span className="text-2xl font-bold">{Math.round(stats.averageProgress)}%</span>
                    </div>
                    <ProgressBar value={stats.averageProgress} className="h-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Onglets avec différents graphiques */}
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="activity">Activité</TabsTrigger>
                  <TabsTrigger value="courses">Cours</TabsTrigger>
                  <TabsTrigger value="achievements">Réalisations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="activity">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Activité hebdomadaire</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="jour" />
                            <YAxis unit="min" />
                            <Tooltip formatter={(value) => [`${value} min`, 'Temps d\'apprentissage']} />
                            <Legend />
                            <Bar dataKey="minutes" name="Minutes d'apprentissage" fill="#0366d6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progression mensuelle</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="mois" />
                            <YAxis unit="%" />
                            <Tooltip formatter={(value) => [`${value}%`, 'Progression']} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="progress" 
                              name="Progression globale" 
                              stroke="#0d9488" 
                              activeDot={{ r: 8 }}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Heures par semaine</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center mb-4">
                          <Calendar className="h-5 w-5 mr-2 text-schoolier-blue" />
                          <span className="text-lg font-semibold">7h 30min cette semaine</span>
                          <span className="text-sm text-schoolier-green ml-2 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +15% par rapport à la semaine dernière
                          </span>
                        </div>
                        <div className="h-20">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyActivityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <Bar dataKey="minutes" fill="#0366d6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Distribution des cours</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={courseDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={100}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {courseDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} cours`, name]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cours par catégorie</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={courseCategoryData} layout="vertical" margin={{ top: 10, right: 10, left: 80, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="category" type="category" width={80} />
                            <Tooltip formatter={(value) => [`${value} cours`, 'Nombre']} />
                            <Bar dataKey="count" name="Nombre de cours" fill="#0366d6" radius={[0, 4, 4, 0]}>
                              {courseCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Progression des réalisations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Apprenant assidu (5/7 jours)</span>
                              <span className="text-sm font-semibold">71%</span>
                            </div>
                            <ProgressBar value={71} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Expert JavaScript (3/5 cours)</span>
                              <span className="text-sm font-semibold">60%</span>
                            </div>
                            <ProgressBar value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Maître des quiz (8/10 quiz)</span>
                              <span className="text-sm font-semibold">80%</span>
                            </div>
                            <ProgressBar value={80} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Communauté active (2/5 discussions)</span>
                              <span className="text-sm font-semibold">40%</span>
                            </div>
                            <ProgressBar value={40} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Progress;
