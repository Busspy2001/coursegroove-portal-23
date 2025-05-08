
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/use-user-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Award, GraduationCap, Clock, BookOpen } from "lucide-react";
import AchievementsTab from "@/components/dashboard/AchievementsTab";

const StudentProfile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, stats, enrolledCourses, achievements } = useUserData();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement de votre profil...</p>
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
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={currentUser?.avatar_url} />
                    <AvatarFallback className="bg-schoolier-teal text-white text-xl">
                      {currentUser?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold">{currentUser?.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{currentUser?.email}</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Modifier mon profil
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mes statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-schoolier-blue" />
                    <span className="text-sm">Cours suivis</span>
                  </div>
                  <span className="font-medium">{stats.totalCoursesEnrolled}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-schoolier-teal" />
                    <span className="text-sm">Cours terminés</span>
                  </div>
                  <span className="font-medium">{stats.totalCoursesCompleted}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-amber-500" />
                    <span className="text-sm">Certificats obtenus</span>
                  </div>
                  <span className="font-medium">{stats.certificatesEarned}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                    <span className="text-sm">Heures d'apprentissage</span>
                  </div>
                  <span className="font-medium">{stats.totalHoursLearned}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="achievements">
                  <Award className="h-4 w-4 mr-2" /> Réalisations
                </TabsTrigger>
                <TabsTrigger value="certificates">
                  <GraduationCap className="h-4 w-4 mr-2" /> Certificats
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes réalisations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AchievementsTab achievements={achievements} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="certificates">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes certificats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.certificatesEarned > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enrolledCourses
                          .filter(course => course.progress === 100)
                          .map(course => (
                            <Card key={course.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="p-4 border-b bg-muted/30">
                                  <h3 className="font-medium">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Obtenu le {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                  <p className="text-sm">Par {course.instructor}</p>
                                  <Button size="sm" variant="outline">
                                    Télécharger
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Aucun certificat pour le moment</h3>
                        <p className="text-muted-foreground mb-6">
                          Terminez un cours pour obtenir votre premier certificat.
                        </p>
                        <Button onClick={() => navigate("/courses")}>
                          Explorer les cours
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentProfile;
