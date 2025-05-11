
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ResponsiveTable } from "@/components/instructor/ResponsiveTable";
import { useIsMobile } from "@/hooks/use-mobile";

const InstructorStudents = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const isMobile = useIsMobile();
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

  const columns = [
    {
      header: "Étudiant",
      accessorKey: "name" as const,
      isMobileVisible: true,
      cell: (student) => (
        <div className="flex items-center gap-3">
          <div className="bg-muted rounded-full p-2">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Cours suivis",
      accessorKey: "courses" as const,
      isMobileVisible: true,
      cell: (student) => (
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{student.courses.length}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
            {student.courses.join(", ")}
          </p>
        </div>
      ),
    },
    {
      header: "Progrès",
      accessorKey: "progress" as const,
      isMobileVisible: true,
      cell: (student) => (
        <div className="flex items-center gap-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-schoolier-green h-2 rounded-full"
              style={{ width: `${student.progress}%` }}
            />
          </div>
          <span className="text-sm">{student.progress}%</span>
        </div>
      ),
    },
    {
      header: "Dernière activité",
      accessorKey: "lastActive" as const,
      isMobileVisible: false,
      cell: (student) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{student.lastActive}</span>
        </div>
      ),
    },
    {
      header: "Statut",
      accessorKey: "status" as const,
      isMobileVisible: true,
      cell: (student) => (
        student.status === "actif" ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Actif
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Inactif
          </Badge>
        )
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as const,
      isMobileVisible: false,
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <InstructorLayout loading={loading}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Étudiants</h1>
          <p className="text-muted-foreground">
            Gérez et suivez les progrès de vos étudiants
          </p>
        </div>
        <div className="mt-4 w-full md:w-auto md:mt-0">
          <Button onClick={handleContactStudents} className="flex items-center w-full md:w-auto">
            <Mail className="mr-2 h-5 w-5" />
            Contacter les étudiants
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <CardTitle>Liste des étudiants</CardTitle>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
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
            <TabsList className="w-full md:w-auto mb-6 md:mb-6">
              <TabsTrigger value="all" className="flex-1 md:flex-initial">Tous</TabsTrigger>
              <TabsTrigger value="active" className="flex-1 md:flex-initial">Actifs</TabsTrigger>
              <TabsTrigger value="inactive" className="flex-1 md:flex-initial">Inactifs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ResponsiveTable
                data={filteredStudents}
                columns={columns}
                keyExtractor={(student) => student.id}
                onRowClick={(student) => {
                  toast({
                    title: `Profil de ${student.name}`,
                    description: "Visualisation du profil étudiant en cours de développement."
                  });
                }}
                mobileRenderer={(student) => (
                  <Card key={student.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-muted rounded-full p-2 mt-1">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{student.name}</h4>
                            {student.status === "actif" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
                                Actif
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 ml-2">
                                Inactif
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.courses.join(", ")}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.lastActive}</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Progrès</span>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-schoolier-green h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              />
            </TabsContent>
            
            <TabsContent value="active">
              <ResponsiveTable
                data={filteredStudents.filter(student => student.status === "actif")}
                columns={columns}
                keyExtractor={(student) => student.id}
                mobileRenderer={(student) => (
                  <Card key={student.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-muted rounded-full p-2 mt-1">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{student.name}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
                              Actif
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.courses.join(", ")}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.lastActive}</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Progrès</span>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-schoolier-green h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              />
            </TabsContent>
            
            <TabsContent value="inactive">
              <ResponsiveTable
                data={filteredStudents.filter(student => student.status === "inactif")}
                columns={columns}
                keyExtractor={(student) => student.id}
                mobileRenderer={(student) => (
                  <Card key={student.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-muted rounded-full p-2 mt-1">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{student.name}</h4>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 ml-2">
                              Inactif
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.courses.join(", ")}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{student.lastActive}</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">Progrès</span>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-schoolier-green h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              />
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
    </InstructorLayout>
  );
};

export default InstructorStudents;
