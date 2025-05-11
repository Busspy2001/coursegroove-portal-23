
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Star, Search, Filter, MessageSquare, ThumbsUp, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InstructorReviews = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("all");

  // Mock data for reviews
  const [reviews, setReviews] = React.useState([
    {
      id: "1",
      student: { name: "Marie Dupont", avatar: "" },
      rating: 5,
      course: "JavaScript Moderne: ES6 à ES12",
      comment: "Excellent cours ! J'ai beaucoup appris et le formateur explique très clairement. Les exercices pratiques sont pertinents et bien conçus.",
      date: "Il y a 3 jours",
      isResponded: true,
      isFlagged: false,
      isHelpful: true
    },
    {
      id: "2",
      student: { name: "Thomas Martin", avatar: "" },
      rating: 4,
      course: "JavaScript Moderne: ES6 à ES12",
      comment: "Très bon cours dans l'ensemble. J'aurais aimé plus d'exemples concrets pour certains concepts avancés, mais le contenu est de qualité.",
      date: "Il y a 1 semaine",
      isResponded: false,
      isFlagged: false,
      isHelpful: false
    },
    {
      id: "3",
      student: { name: "Julie Bernard", avatar: "" },
      rating: 5,
      course: "Fondamentaux du développement web",
      comment: "Parfait pour les débutants ! La progression est bien pensée et on n'est jamais perdu. Je recommande vivement.",
      date: "Il y a 2 semaines",
      isResponded: true,
      isFlagged: false,
      isHelpful: true
    },
    {
      id: "4",
      student: { name: "Philippe Leroy", avatar: "" },
      rating: 3,
      course: "Python pour la data science",
      comment: "Le contenu est bon mais certaines parties sont trop rapides. J'ai dû chercher des compléments ailleurs pour bien comprendre.",
      date: "Il y a 1 mois",
      isResponded: false,
      isFlagged: true,
      isHelpful: false
    },
    {
      id: "5",
      student: { name: "Sophie Petit", avatar: "" },
      rating: 2,
      course: "React pour les débutants",
      comment: "Déçue par ce cours. Beaucoup de concepts sont survolés et les explications manquent parfois de clarté. Quelques erreurs dans le code présenté.",
      date: "Il y a 3 semaines",
      isResponded: false,
      isFlagged: true,
      isHelpful: false
    }
  ]);

  // Mock data for courses
  const courses = [
    { id: "course1", title: "JavaScript Moderne: ES6 à ES12" },
    { id: "course2", title: "Fondamentaux du développement web" },
    { id: "course3", title: "React pour les débutants" },
    { id: "course4", title: "Python pour la data science" }
  ];

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

  const handleReplyReview = (reviewId: string) => {
    toast({
      title: "Réponse envoyée",
      description: "Votre réponse a été ajoutée avec succès.",
    });
    
    // Update the review status in the mock data
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isResponded: true } : review
    ));
  };

  const handleMarkAsHelpful = (reviewId: string) => {
    toast({
      title: "Avis marqué comme utile",
      description: "L'avis a été marqué comme utile.",
    });
    
    // Update the helpful status in the mock data
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isHelpful: true } : review
    ));
  };

  const handleResolveFlagged = (reviewId: string) => {
    toast({
      title: "Avis résolu",
      description: "Le problème signalé a été marqué comme résolu.",
    });
    
    // Update the flagged status in the mock data
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isFlagged: false } : review
    ));
  };

  // Filter reviews based on search and course
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = 
      courseFilter === "all" || 
      review.course === courses.find(c => c.id === courseFilter)?.title;
    
    return matchesSearch && matchesCourse;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement des avis et commentaires...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Avis & Feedback</h1>
              <p className="text-muted-foreground">
                Consultez et gérez les avis laissés par vos étudiants
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                      <h3 className="text-3xl font-bold mt-1">4.2</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(4)}
                        <span className="ml-2 text-sm text-muted-foreground">(18 avis)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">5 étoiles</p>
                      <div className="flex items-center mt-1 gap-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "58%" }}></div>
                        </div>
                        <span>58%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">4 étoiles</p>
                      <div className="flex items-center mt-1 gap-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                        </div>
                        <span>22%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">3 étoiles</p>
                      <div className="flex items-center mt-1 gap-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                        </div>
                        <span>12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">2 étoiles</p>
                      <div className="flex items-center mt-1 gap-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                        </div>
                        <span>6%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">1 étoile</p>
                      <div className="flex items-center mt-1 gap-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                        </div>
                        <span>2%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Taux de réponse</p>
                      <h3 className="text-xl font-bold mt-1">72%</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <CardTitle>Tous les avis</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Rechercher dans les avis..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Tous les cours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les cours</SelectItem>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Plus de filtres
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="flagged">Signalés</TabsTrigger>
                    <TabsTrigger value="not-responded">Sans réponse</TabsTrigger>
                    <TabsTrigger value="helpful">Utiles</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="space-y-6">
                      {filteredReviews.map(review => (
                        <div key={review.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={review.student.avatar} />
                                <AvatarFallback className="bg-schoolier-blue text-white">
                                  {review.student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{review.student.name}</h3>
                                <div className="flex items-center mt-1">
                                  {renderStars(review.rating)}
                                  <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {review.course}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="mb-4">{review.comment}</p>
                          
                          <div className="flex flex-wrap gap-2 justify-end">
                            {review.isFlagged && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Signalé
                              </Badge>
                            )}
                            {review.isHelpful && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Utile
                              </Badge>
                            )}
                            {review.isResponded && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                Répondu
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {!review.isResponded && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center" 
                                onClick={() => handleReplyReview(review.id)}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Répondre
                              </Button>
                            )}
                            {!review.isHelpful && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center" 
                                onClick={() => handleMarkAsHelpful(review.id)}
                              >
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Marquer comme utile
                              </Button>
                            )}
                            {review.isFlagged && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center" 
                                onClick={() => handleResolveFlagged(review.id)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Résoudre
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="flagged">
                    <div className="space-y-6">
                      {filteredReviews
                        .filter(review => review.isFlagged)
                        .map(review => (
                          <div key={review.id} className="border rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={review.student.avatar} />
                                  <AvatarFallback className="bg-schoolier-blue text-white">
                                    {review.student.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{review.student.name}</h3>
                                  <div className="flex items-center mt-1">
                                    {renderStars(review.rating)}
                                    <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {review.course}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="mb-4">{review.comment}</p>
                            
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Signalé
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              {!review.isResponded && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center" 
                                  onClick={() => handleReplyReview(review.id)}
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Répondre
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center" 
                                onClick={() => handleResolveFlagged(review.id)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Résoudre
                              </Button>
                            </div>
                          </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="not-responded">
                    <div className="space-y-6">
                      {filteredReviews
                        .filter(review => !review.isResponded)
                        .map(review => (
                          <div key={review.id} className="border rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={review.student.avatar} />
                                  <AvatarFallback className="bg-schoolier-blue text-white">
                                    {review.student.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{review.student.name}</h3>
                                  <div className="flex items-center mt-1">
                                    {renderStars(review.rating)}
                                    <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {review.course}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="mb-4">{review.comment}</p>
                            
                            <div className="flex flex-wrap gap-2 justify-end">
                              {review.isFlagged && (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  Signalé
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center" 
                                onClick={() => handleReplyReview(review.id)}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Répondre
                              </Button>
                              {!review.isHelpful && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center" 
                                  onClick={() => handleMarkAsHelpful(review.id)}
                                >
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  Marquer comme utile
                                </Button>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="helpful">
                    <div className="space-y-6">
                      {filteredReviews
                        .filter(review => review.isHelpful)
                        .map(review => (
                          <div key={review.id} className="border rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={review.student.avatar} />
                                  <AvatarFallback className="bg-schoolier-blue text-white">
                                    {review.student.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{review.student.name}</h3>
                                  <div className="flex items-center mt-1">
                                    {renderStars(review.rating)}
                                    <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {review.course}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="mb-4">{review.comment}</p>
                            
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Utile
                              </Badge>
                              {review.isResponded && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  Répondu
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              {!review.isResponded && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center" 
                                  onClick={() => handleReplyReview(review.id)}
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Répondre
                                </Button>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorReviews;
