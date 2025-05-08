
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreHorizontal, CheckCircle, XCircle, Eye, MessageSquare, Flag } from "lucide-react";

const AdminCourseModeration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  
  // Mock course data - in a real implementation, this would come from Supabase
  const coursesData = [
    { 
      id: 1, 
      title: "React pour débutants", 
      instructor: "Marie Curie",
      submitted: "02/05/2025",
      category: "Développement Web",
      status: "pending",
      price: "49.99€",
      lessons: 24,
      duration: "12h 30m",
    },
    { 
      id: 2, 
      title: "Marketing Digital Avancé", 
      instructor: "Jean Dupont",
      submitted: "28/04/2025",
      category: "Marketing",
      status: "approved",
      price: "79.99€",
      lessons: 32,
      duration: "18h 45m",
    },
    { 
      id: 3, 
      title: "Python pour l'analyse de données", 
      instructor: "Sophie Germain",
      submitted: "25/04/2025",
      category: "Data Science",
      status: "rejected",
      price: "59.99€",
      lessons: 28,
      duration: "15h 20m",
    },
    { 
      id: 4, 
      title: "Design UI/UX avec Figma", 
      instructor: "Paul Eluard",
      submitted: "05/05/2025",
      category: "Design",
      status: "pending",
      price: "69.99€",
      lessons: 18,
      duration: "9h 15m",
    },
  ];

  // Mock reviews data
  const reviewsData = [
    {
      id: 1,
      courseTitle: "React pour débutants",
      user: "Thomas Martin",
      rating: 2,
      content: "Ce cours manque de précision et d'explications claires sur certains concepts importants.",
      date: "04/05/2025",
      status: "flagged",
    },
    {
      id: 2,
      courseTitle: "Marketing Digital Avancé",
      user: "Julie Dubois",
      rating: 5,
      content: "Excellent cours, très instructif et bien structuré !",
      date: "03/05/2025",
      status: "approved",
    },
    {
      id: 3,
      courseTitle: "Python pour l'analyse de données",
      user: "Marc Petit",
      rating: 4,
      content: "Bon cours, mais certains exercices sont un peu trop complexes pour le niveau annoncé.",
      date: "02/05/2025",
      status: "pending",
    },
    {
      id: 4,
      courseTitle: "Design UI/UX avec Figma",
      user: "Emma Roux",
      rating: 1,
      content: "Contenu obsolète et mal présenté. Ne correspond pas du tout à la description !",
      date: "01/05/2025",
      status: "flagged",
    },
  ];

  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReviews = reviewsData.filter(review => 
    review.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Approuvé</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Rejeté</Badge>;
      case "flagged":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Signalé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRatingBadge = (rating: number) => {
    let bgColor;
    
    if (rating >= 4) bgColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    else if (rating >= 3) bgColor = "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    else bgColor = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    
    return <Badge className={bgColor}>{rating}/5</Badge>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Modération du contenu</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === "courses" ? "Rechercher un cours..." : "Rechercher un avis..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Filtrer</Button>
          </div>
        </div>

        <TabsContent value="courses" className="mt-0">
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Cours</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Soumis le</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-xs text-muted-foreground">Par {course.instructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>{course.submitted}</TableCell>
                    <TableCell>
                      {getStatusBadge(course.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir le détail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-green-600 dark:text-green-400">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredCourses.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Aucun cours trouvé pour cette recherche.
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Avis</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map(review => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-schoolier-blue flex items-center justify-center text-white font-medium">
                            {review.user.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium">{review.user}</span>
                        </div>
                        <p className="text-sm mt-1 line-clamp-2">{review.content}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRatingBadge(review.rating)}</TableCell>
                    <TableCell>{review.courseTitle}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      {getStatusBadge(review.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Voir l'avis complet
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-green-600 dark:text-green-400">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-amber-600 dark:text-amber-400">
                            <Flag className="h-4 w-4 mr-2" />
                            Marquer comme inapproprié
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                            <XCircle className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredReviews.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Aucun avis trouvé pour cette recherche.
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCourseModeration;
