import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, DollarSign, BarChart2, FilePlus, Star, Loader2 } from "lucide-react";
import InstructorCoursesList from "@/components/instructor/InstructorCoursesList";
import InstructorStats from "@/components/instructor/InstructorStats";
import InstructorStudents from "@/components/instructor/InstructorStudents";
import InstructorEarnings from "@/components/instructor/InstructorEarnings";
import InstructorReviews from "@/components/instructor/InstructorReviews";
import { useInstructorData } from "@/hooks/use-instructor-data";

const InstructorDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, stats, courses } = useInstructorData();

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement de votre tableau de bord...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Espace instructeur</h1>
            <p className="text-muted-foreground">
              Bienvenue, {currentUser?.name} ! Gérez vos cours et vos étudiants.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/instructor/courses/create")} className="flex items-center">
              <FilePlus className="mr-2 h-5 w-5" />
              Créer un nouveau cours
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total des cours</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalCourses}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <BookOpen className="h-7 w-7 text-schoolier-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total des étudiants</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalStudents}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Users className="h-7 w-7 text-schoolier-green" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus ce mois</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.monthlyRevenue} €</h3>
                </div>
                <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                  <DollarSign className="h-7 w-7 text-schoolier-teal" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.averageRating}</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                  <Star className="h-7 w-7 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Mes cours</TabsTrigger>
            <TabsTrigger value="students">Étudiants</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="earnings">Revenus</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <InstructorCoursesList courses={courses} />
          </TabsContent>
          
          <TabsContent value="students">
            <InstructorStudents />
          </TabsContent>
          
          <TabsContent value="reviews">
            <InstructorReviews />
          </TabsContent>
          
          <TabsContent value="earnings">
            <InstructorEarnings />
          </TabsContent>
          
          <TabsContent value="stats">
            <InstructorStats />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default InstructorDashboard;
