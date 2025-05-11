
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  TrendingUp,
  BookOpen,
  Users,
  Star,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CalendarDays,
  Bell,
  ChevronRight
} from "lucide-react";
import { useInstructorData } from "@/hooks/use-instructor-data";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts";

const InstructorDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, stats, courses, refetch } = useInstructorData();

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null; // Return nothing during redirect
  }

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', amount: 1240 },
    { month: 'Feb', amount: 1580 },
    { month: 'Mar', amount: 1390 },
    { month: 'Avr', amount: 1720 },
    { month: 'Mai', amount: 1850 },
    { month: 'Juin', amount: 2100 },
  ];

  const viewsData = [
    { month: 'Jan', count: 580 },
    { month: 'Feb', count: 690 },
    { month: 'Mar', count: 710 },
    { month: 'Avr', count: 880 },
    { month: 'Mai', count: 940 },
    { month: 'Juin', count: 1050 },
  ];

  const notifications = [
    { id: 1, type: "review", message: "Nouvel avis sur JavaScript Moderne", time: "Il y a 2 heures" },
    { id: 2, type: "enrollment", message: "5 nouvelles inscriptions à Python pour la data science", time: "Hier" },
    { id: 3, type: "revenue", message: "Paiement de 920€ reçu", time: "Il y a 2 jours" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement des données de l'instructeur...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue, {currentUser?.name || "Instructeur"}! Voici une vue d'ensemble de vos cours et performances.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cours actifs</p>
                      <h3 className="text-3xl font-bold mt-1">{stats?.totalCourses || 0}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          {courses?.filter(c => c.status === "published").length || 0} publiés,{" "}
                          {courses?.filter(c => c.status === "draft").length || 0} brouillons
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <BookOpen className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Étudiants</p>
                      <h3 className="text-3xl font-bold mt-1">{stats?.totalStudents || 0}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm ${stats?.studentsTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stats?.studentsTrend >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(stats?.studentsTrend || 12)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs mois dernier</span>
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
                      <p className="text-sm font-medium text-muted-foreground">Revenus mensuels</p>
                      <h3 className="text-3xl font-bold mt-1">{stats?.monthlyRevenue || 0} €</h3>
                      <div className="flex items-center mt-1">
                        <span className={`flex items-center text-sm text-green-600`}>
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          18%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs mois dernier</span>
                      </div>
                    </div>
                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                      <DollarSign className="h-7 w-7 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                      <h3 className="text-3xl font-bold mt-1">{stats?.averageRating || 0}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <Star className="h-7 w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Revenus</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/instructor/earnings")}>
                      <span className="hidden sm:inline">Voir plus</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} €`, "Revenus"]}
                        />
                        <Bar 
                          dataKey="amount" 
                          fill="#10B981" 
                          name="Revenus" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Activité récente</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Tout voir</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${
                          notification.type === "review" 
                            ? "bg-purple-100 text-purple-600" 
                            : notification.type === "enrollment" 
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                        }`}>
                          {notification.type === "review" ? (
                            <Star className="h-4 w-4" />
                          ) : notification.type === "enrollment" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            <DollarSign className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="outline" className="w-full">
                    Voir toutes les notifications
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Tâches à faire</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Tout voir</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-sm">Répondre aux 3 avis en attente</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Finaliser le cours "Python pour débutants"</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Créer un quiz pour le module 3</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Mettre à jour la description du cours</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="outline" className="w-full">
                    Créer une tâche
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Cours populaires</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/instructor/courses")}>
                      <span className="hidden sm:inline">Voir tous</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    {courses?.slice(0, 3).map((course, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{course.title}</h4>
                          <p className="text-xs text-muted-foreground">{course.total_students} étudiants</p>
                        </div>
                        <div>
                          <Badge variant="outline" className={
                            course.status === "published" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }>
                            {course.status === "published" ? "Publié" : "Brouillon"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Vues des cours</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/instructor/stats")}>
                      <span className="hidden sm:inline">Plus de stats</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={viewsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}`, "Vues"]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Calendrier</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Voir plus</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="min-w-fit text-center">
                        <div className="bg-red-100 text-red-700 px-2 py-1 rounded-t-md text-xs font-medium">JUN</div>
                        <div className="border border-t-0 rounded-b-md px-3 py-1.5 text-lg font-bold">15</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Publication du nouveau cours</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>15 juin 2025, 12:00</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="min-w-fit text-center">
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-t-md text-xs font-medium">JUN</div>
                        <div className="border border-t-0 rounded-b-md px-3 py-1.5 text-lg font-bold">18</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Webinar JavaScript avancé</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>18 juin 2025, 14:30</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="min-w-fit text-center">
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-t-md text-xs font-medium">JUN</div>
                        <div className="border border-t-0 rounded-b-md px-3 py-1.5 text-lg font-bold">22</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Session questions/réponses</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>22 juin 2025, 18:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="outline" className="w-full">
                    Gérer les événements
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Notifications</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Paramètres</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">Nouvelle question dans JavaScript Moderne</p>
                        <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Voir</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">3 nouveaux étudiants</p>
                        <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Voir</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                        <Star className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">Nouvel avis 5 étoiles</p>
                        <p className="text-xs text-muted-foreground">Hier</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Voir</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="outline" className="w-full">
                    Voir toutes les notifications
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorDashboard;
