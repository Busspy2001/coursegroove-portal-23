
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, DollarSign, BarChart2, FilePlus, Star } from "lucide-react";

const InstructorDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
                  <h3 className="text-3xl font-bold mt-1">5</h3>
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
                  <h3 className="text-3xl font-bold mt-1">256</h3>
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
                  <h3 className="text-3xl font-bold mt-1">1 274 €</h3>
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
                  <h3 className="text-3xl font-bold mt-1">4.8</h3>
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
          </TabsList>
          
          <TabsContent value="courses">
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Commencez à créer votre premier cours</h3>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                      Créez et gérez vos cours, suivez les progrès de vos étudiants et générez des revenus en partageant votre expertise.
                    </p>
                    <Button className="mt-6" onClick={() => navigate("/instructor/courses/create")}>
                      <FilePlus className="h-4 w-4 mr-2" />
                      Créer un cours
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students">
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Fonctionnalité à venir</h3>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                      La gestion des étudiants sera bientôt disponible.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <div className="text-center py-12">
                    <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Fonctionnalité à venir</h3>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                      La gestion des avis et des notes sera bientôt disponible.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings">
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <div className="text-center py-12">
                    <DollarSign className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Fonctionnalité à venir</h3>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                      Le suivi des revenus sera bientôt disponible.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default InstructorDashboard;
