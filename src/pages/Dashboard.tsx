
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PlayCircle, Award, Clock, BarChart2 } from "lucide-react";
import { allCourses } from "@/data/courseData";

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Mock enrolled courses
  const enrolledCourses = allCourses.slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000)
  }));

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue, {currentUser?.name} ! Voici votre espace personnel.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/courses")}>
              Explorer les cours
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Cours en cours</CardTitle>
                <CardDescription>Continuez où vous vous êtes arrêté</CardDescription>
              </div>
              <BookOpen className="h-6 w-6 text-schoolier-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Heures d'apprentissage</CardTitle>
                <CardDescription>Total d'heures ce mois-ci</CardDescription>
              </div>
              <Clock className="h-6 w-6 text-schoolier-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12.5h</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Certifications</CardTitle>
                <CardDescription>Cours complétés avec certificat</CardDescription>
              </div>
              <Award className="h-6 w-6 text-schoolier-green" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="my-courses" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-courses">Mes cours</TabsTrigger>
            <TabsTrigger value="achievements">Réalisations</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-courses">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Mes cours</h2>
              
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-64 h-48 md:h-auto">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow p-6">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Par {course.instructor}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <Button variant="outline" className="mb-2 w-full md:w-auto" onClick={() => navigate(`/courses/${course.id}`)}>
                                Voir le cours
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Progression</span>
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center">
                              <PlayCircle className="h-4 w-4 mr-1 text-schoolier-blue" />
                              <span className="text-sm">Continuer</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">
                                Dernier accès: {course.lastAccessed.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aucun cours inscrit</h3>
                  <p className="text-muted-foreground mb-6">
                    Vous n'êtes inscrit à aucun cours pour le moment. Explorez notre catalogue pour commencer votre parcours d'apprentissage.
                  </p>
                  <Button onClick={() => navigate("/courses")}>
                    Découvrir les cours
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Mes réalisations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Première inscription",
                    description: "Vous avez complété votre inscription",
                    icon: "🎉",
                    unlocked: true,
                  },
                  {
                    name: "Premier cours complété",
                    description: "Vous avez terminé votre premier cours",
                    icon: "🏆",
                    unlocked: true,
                  },
                  {
                    name: "Premier certificat",
                    description: "Vous avez obtenu votre premier certificat",
                    icon: "📜",
                    unlocked: true,
                  },
                  {
                    name: "5 cours complétés",
                    description: "Vous avez terminé 5 cours",
                    icon: "🔥",
                    unlocked: false,
                  },
                  {
                    name: "10 heures d'apprentissage",
                    description: "Vous avez passé 10 heures à apprendre",
                    icon: "⏱️",
                    unlocked: true,
                  },
                  {
                    name: "Participation au forum",
                    description: "Vous avez participé aux discussions",
                    icon: "💬",
                    unlocked: false,
                  },
                ].map((achievement, index) => (
                  <Card key={index} className={`p-6 ${!achievement.unlocked && "opacity-50"}`}>
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Débloqué
                      </div>
                    ) : (
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Non débloqué
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Mes statistiques</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Activité d'apprentissage</CardTitle>
                    <CardDescription>Heures passées sur la plateforme</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="flex items-center">
                      <BarChart2 className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">
                        Les graphiques d'activité seront disponibles prochainement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Catégories explorées</CardTitle>
                    <CardDescription>Répartition par domaine d'étude</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="flex items-center">
                      <BarChart2 className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">
                        Les graphiques de catégories seront disponibles prochainement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
