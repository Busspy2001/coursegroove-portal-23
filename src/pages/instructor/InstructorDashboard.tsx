import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  BookOpen,
  Users,
  Star,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useInstructorData } from "@/hooks/use-instructor-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  LineChart,
  Line
} from "recharts";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import ResponsiveChartContainer from "@/components/instructor/ResponsiveChartContainer";
import { Course } from "@/components/instructor/InstructorCoursesList";

// Function to adapt instructor courses to Course interface
const adaptCourses = (instructorCourses: any[]): Course[] => {
  return instructorCourses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.title || "", // Using title as fallback description
    thumbnail_url: course.thumbnail || "/placeholder.svg",
    status: course.status === "published" ? "published" : "draft",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    total_students: course.total_students || 0,
    average_rating: course.rating || 0,
    total_lessons: 10, // Default value
    duration: "8h", // Default value
    price: course.price || 0
  }));
};

const InstructorDashboard = () => {
  const { loading, stats, courses, refetch } = useInstructorData();
  const navigate = useNavigate();
  
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', amount: 1240 },
    { month: 'Feb', amount: 1580 },
    { month: 'Mar', amount: 1390 },
    { month: 'Avr', amount: 1720 },
    { month: 'Mai', amount: 1850 },
    { month: 'Juin', amount: 2100 },
  ];

  const notifications = [
    { id: 1, type: "review", message: "Nouvel avis sur JavaScript Moderne", time: "Il y a 2 heures" },
    { id: 2, type: "enrollment", message: "5 nouvelles inscriptions à Python pour la data science", time: "Hier" },
    { id: 3, type: "revenue", message: "Paiement de 920€ reçu", time: "Il y a 2 jours" }
  ];

  // Convert InstructorCourse[] to Course[]
  const adaptedCourses = adaptCourses(courses);

  return (
    <InstructorLayout loading={loading}>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue! Voici une vue d'ensemble de vos cours et performances.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardContent className="p-5 md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cours actifs</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">{stats?.totalCourses || 0}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {adaptedCourses?.filter(c => c.status === "published").length || 0} publiés,{" "}
                    {adaptedCourses?.filter(c => c.status === "draft").length || 0} brouillons
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-2 md:p-3 rounded-full">
                <BookOpen className="h-5 w-5 md:h-7 md:w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5 md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Étudiants</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">{stats?.totalStudents || 0}</h3>
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
              <div className="bg-green-100 dark:bg-green-900 p-2 md:p-3 rounded-full">
                <Users className="h-5 w-5 md:h-7 md:w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5 md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenus</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">{stats?.monthlyRevenue || 0} €</h3>
                <div className="flex items-center mt-1">
                  <span className={`flex items-center text-sm text-green-600`}>
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    18%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs mois dernier</span>
                </div>
              </div>
              <div className="bg-teal-100 dark:bg-teal-900 p-2 md:p-3 rounded-full">
                <DollarSign className="h-5 w-5 md:h-7 md:w-7 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5 md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">{stats?.averageRating || 0}</h3>
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
              <div className="bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-full">
                <Star className="h-5 w-5 md:h-7 md:w-7 text-purple-600" />
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
          <CardContent className="px-3 md:px-6">
            <ResponsiveChartContainer desktopHeight={300} mobileHeight={180}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value) => [`${value} €`, "Revenus"]}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#10B981" 
                  name="Revenus" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveChartContainer>
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
          <CardContent className="px-3 md:px-6">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notification.message}</p>
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
            <Button variant="outline" className="w-full text-sm">
              Voir toutes les notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="order-2 lg:order-1">
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
        
        <Card className="order-1 lg:order-2 col-span-1 lg:col-span-2">
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
              {adaptedCourses.slice(0, 3).map((course, idx) => (
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
      </div>
    </InstructorLayout>
  );
};

export default InstructorDashboard;
