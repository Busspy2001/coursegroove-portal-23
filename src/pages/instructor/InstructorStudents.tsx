
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Mail, 
  Filter, 
  Loader2, 
  User, 
  BookOpen, 
  Clock, 
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstructorStudents = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [students, setStudents] = React.useState([
    {
      id: "1",
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      courses: ["JavaScript Moderne", "Fondamentaux du développement web"],
      progress: 78,
      lastActive: "Il y a 2 jours",
      status: "actif"
    },
    {
      id: "2",
      name: "Thomas Martin",
      email: "thomas.martin@example.com",
      courses: ["JavaScript Moderne"],
      progress: 45,
      lastActive: "Il y a 5 jours",
      status: "actif"
    },
    {
      id: "3",
      name: "Julie Bernard",
      email: "julie.bernard@example.com",
      courses: ["Fondamentaux du développement web"],
      progress: 92,
      lastActive: "Aujourd'hui",
      status: "actif"
    },
    {
      id: "4",
      name: "Philippe Leroy",
      email: "philippe.leroy@example.com",
      courses: ["Python pour la data science"],
      progress: 23,
      lastActive: "Il y a 3 semaines",
      status: "inactif"
    },
    {
      id: "5",
      name: "Sophie Petit",
      email: "sophie.petit@example.com",
      courses: ["JavaScript Moderne", "React pour les débutants"],
      progress: 67,
      lastActive: "Hier",
      status: "actif"
    }
  ]);

  // Rediriger si pas authentifié ou pas un instructeur
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

  const handleContactStudents = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé aux étudiants sélectionnés.",
    });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement des données étudiants...</p>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Étudiants</h1>
                <p className="text-muted-foreground">
                  Gérez et suivez les progrès de vos étudiants
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={handleContactStudents} className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Contacter les étudiants
                </Button>
              </div>
            </div>
            
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <CardTitle>Liste des étudiants</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Rechercher un étudiant..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">Tous les étudiants</TabsTrigger>
                    <TabsTrigger value="active">Actifs</TabsTrigger>
                    <TabsTrigger value="inactive">Inactifs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Étudiant</TableHead>
                            <TableHead>Cours suivis</TableHead>
                            <TableHead>Progrès</TableHead>
                            <TableHead>Dernière activité</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="bg-muted rounded-full p-2">
                                    <User className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-sm text-muted-foreground">{student.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <span>{student.courses.length}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {student.courses.join(", ")}
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                      className="bg-schoolier-green h-2 rounded-full"
                                      style={{ width: `${student.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-sm">{student.progress}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{student.lastActive}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {student.status === "actif" ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Actif
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    Inactif
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <User className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="active">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Étudiant</TableHead>
                            <TableHead>Cours suivis</TableHead>
                            <TableHead>Progrès</TableHead>
                            <TableHead>Dernière activité</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents
                            .filter(student => student.status === "actif")
                            .map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="bg-muted rounded-full p-2">
                                      <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{student.name}</p>
                                      <p className="text-sm text-muted-foreground">{student.email}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.courses.length}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {student.courses.join(", ")}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div
                                        className="bg-schoolier-green h-2 rounded-full"
                                        style={{ width: `${student.progress}%` }}
                                      />
                                    </div>
                                    <span className="text-sm">{student.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.lastActive}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Actif
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <User className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="inactive">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Étudiant</TableHead>
                            <TableHead>Cours suivis</TableHead>
                            <TableHead>Progrès</TableHead>
                            <TableHead>Dernière activité</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents
                            .filter(student => student.status === "inactif")
                            .map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="bg-muted rounded-full p-2">
                                      <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{student.name}</p>
                                      <p className="text-sm text-muted-foreground">{student.email}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.courses.length}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {student.courses.join(", ")}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div
                                        className="bg-schoolier-green h-2 rounded-full"
                                        style={{ width: `${student.progress}%` }}
                                      />
                                    </div>
                                    <span className="text-sm">{student.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{student.lastActive}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    Inactif
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <User className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vue d'ensemble</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Étudiants actifs</p>
                      <p className="text-2xl font-bold">{students.filter(s => s.status === "actif").length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="bg-green-100 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Moyenne d'inscriptions</p>
                      <p className="text-2xl font-bold">1.4 cours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taux de complétion</p>
                      <p className="text-2xl font-bold">61%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorStudents;
