
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from "@/components/employee-dashboard/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen, Award, Bell } from "lucide-react";

const EmployeeDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an employee
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { returnUrl: "/employe" } });
    } else if (currentUser?.role !== "employee") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Mock data (to be replaced with actual data from Supabase)
  const assignedCourses = [
    { 
      id: "1", 
      title: "Introduction à la cybersécurité", 
      progress: 65,
      deadline: "2025-06-30"
    },
    { 
      id: "2", 
      title: "Communication efficace en entreprise", 
      progress: 25,
      deadline: "2025-06-15" 
    },
    { 
      id: "3", 
      title: "Gestion de projet avancée", 
      progress: 0,
      deadline: "2025-07-10" 
    },
  ];

  const notifications = [
    { id: "1", message: "Nouvelle formation assignée", date: "Aujourd'hui" },
    { id: "2", message: "Félicitations pour avoir complété le module 3", date: "Hier" },
    { id: "3", message: "Rappel: Échéance de formation dans 5 jours", date: "Il y a 2 jours" }
  ];

  // Calculate overall progress
  const overallProgress = assignedCourses.length > 0
    ? Math.round(assignedCourses.reduce((sum, course) => sum + course.progress, 0) / assignedCourses.length)
    : 0;

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Bonjour, {currentUser?.name || "Employé(e)"}</span>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression globale</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress value={overallProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prochaine échéance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 juin</div>
              <p className="text-xs text-muted-foreground">Communication efficace</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Sur 5 disponibles</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Assigned courses */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Formations assignées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedCourses.length === 0 ? (
                <p className="text-muted-foreground">Aucune formation assignée.</p>
              ) : (
                assignedCourses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{course.title}</span>
                      <span className="text-sm text-muted-foreground">
                        Échéance: {new Date(course.deadline).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{course.progress}% complété</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))
              )}
              <div className="pt-2">
                <button 
                  onClick={() => navigate("/employe/formations")} 
                  className="text-sm text-schoolier-blue hover:text-schoolier-dark-blue"
                >
                  Voir toutes les formations →
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex justify-between border-b pb-2 last:border-0">
                  <span>{notification.message}</span>
                  <span className="text-sm text-muted-foreground">{notification.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tips alert */}
        <Alert className="bg-schoolier-teal/10 border-schoolier-teal">
          <AlertTitle>Astuce du jour</AlertTitle>
          <AlertDescription>
            Consacrez 30 minutes par jour à vos formations pour maintenir un rythme d'apprentissage optimal.
          </AlertDescription>
        </Alert>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
