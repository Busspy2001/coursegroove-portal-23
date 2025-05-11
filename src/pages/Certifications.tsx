import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Lock, Award, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface CertificationProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "in-progress" | "completed" | "locked";
  estimatedHours: number;
  requiredCourses: number;
  completedCourses: number;
  image?: string;
}

const certifications: CertificationProps[] = [
  {
    id: "cert-1",
    title: "Développement Web Frontend",
    description: "Maîtrisez les fondamentaux du développement web frontend avec HTML, CSS et JavaScript.",
    progress: 65,
    status: "in-progress",
    estimatedHours: 40,
    requiredCourses: 5,
    completedCourses: 3,
    image: "/placeholder.svg"
  },
  {
    id: "cert-2",
    title: "UX Design Fundamentals",
    description: "Apprenez à créer des interfaces utilisateur attrayantes et conviviales.",
    progress: 100,
    status: "completed",
    estimatedHours: 30,
    requiredCourses: 4,
    completedCourses: 4,
    image: "/placeholder.svg"
  },
  {
    id: "cert-3",
    title: "Advanced JavaScript",
    description: "Plongez dans les concepts avancés de JavaScript pour des applications web modernes.",
    progress: 0,
    status: "locked",
    estimatedHours: 50,
    requiredCourses: 6,
    completedCourses: 0,
    image: "/placeholder.svg"
  },
  {
    id: "cert-4",
    title: "React.js Mastery",
    description: "Devenez un expert en développement d'applications avec React.js.",
    progress: 25,
    status: "in-progress",
    estimatedHours: 45,
    requiredCourses: 5,
    completedCourses: 1,
    image: "/placeholder.svg"
  }
];

const CertificationCard = ({ certification }: { certification: CertificationProps }) => {
  const navigate = useNavigate();
  const isLocked = certification.status === "locked";
  
  const getStatusIcon = (status: CertificationProps["status"]) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-5 w-5 text-schoolier-yellow" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-schoolier-green" />;
      case "locked":
        return <Lock className="h-5 w-5 text-schoolier-gray" />;
    }
  };

  const getStatusText = (status: CertificationProps["status"]) => {
    switch (status) {
      case "in-progress": return "En cours";
      case "completed": return "Terminé";
      case "locked": return "À débloquer";
    }
  };
  
  const getStatusColor = (status: CertificationProps["status"]) => {
    switch (status) {
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "locked": return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${isLocked ? 'opacity-70' : 'hover:-translate-y-1'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">{certification.title}</CardTitle>
          <Badge className={getStatusColor(certification.status)}>
            {getStatusIcon(certification.status)}
            <span className="ml-1">{getStatusText(certification.status)}</span>
          </Badge>
        </div>
        <CardDescription>{certification.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Award className="mr-2 h-10 w-10 text-schoolier-blue opacity-80" />
          <div className="flex-1">
            {certification.status !== "locked" && (
              <>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm font-semibold">{certification.progress}%</span>
                </div>
                <Progress 
                  value={certification.progress} 
                  className="h-2 bg-schoolier-light-gray" 
                />
              </>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">Cours requis:</span>
                <span className="ml-1 text-sm font-medium">{certification.requiredCourses}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">Cours complétés:</span>
                <span className="ml-1 text-sm font-medium">{certification.completedCourses}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">Temps estimé:</span>
                <span className="ml-1 text-sm font-medium">{certification.estimatedHours}h</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={isLocked ? "outline" : "default"}
          onClick={() => navigate(`/certifications/${certification.id}`)}
          disabled={isLocked}
        >
          {isLocked ? "À débloquer" : "Voir les détails"}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Certifications = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Fix: Using ref instead of querySelector for tab switching
  const handleSwitchToAvailableCerts = () => {
    const availableTab = document.querySelector('[data-value="available"]') as HTMLElement;
    if (availableTab) {
      availableTab.click();
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Certifications</h1>
            </div>
            
            <div className="container px-6 py-8 flex-grow">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mes Certifications</h1>
                <p className="text-muted-foreground">
                  Suivez votre progression et obtenez des certifications pour valoriser vos compétences.
                </p>
              </div>
              
              <Tabs defaultValue="my-certifications" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="my-certifications">Mes certifications</TabsTrigger>
                  <TabsTrigger value="available">Disponibles</TabsTrigger>
                  <TabsTrigger value="completed">Terminées</TabsTrigger>
                </TabsList>
                
                <TabsContent value="my-certifications">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications
                      .filter(cert => cert.status !== "locked")
                      .map((certification) => (
                        <CertificationCard key={certification.id} certification={certification} />
                      ))}
                  </div>
                  
                  {certifications.filter(cert => cert.status !== "locked").length === 0 && (
                    <div className="text-center py-12">
                      <Award className="mx-auto h-16 w-16 text-muted-foreground opacity-40 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Aucune certification en cours</h3>
                      <p className="text-muted-foreground mb-6">
                        Découvrez nos parcours de certification pour développer vos compétences.
                      </p>
                      <Button onClick={handleSwitchToAvailableCerts}>
                        Explorer les certifications disponibles
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="available">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications
                      .filter(cert => cert.status === "locked")
                      .map((certification) => (
                        <CertificationCard key={certification.id} certification={certification} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications
                      .filter(cert => cert.status === "completed")
                      .map((certification) => (
                        <CertificationCard key={certification.id} certification={certification} />
                      ))}
                  </div>
                  
                  {certifications.filter(cert => cert.status === "completed").length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle className="mx-auto h-16 w-16 text-muted-foreground opacity-40 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Aucune certification terminée</h3>
                      <p className="text-muted-foreground">
                        Continuez vos cours pour obtenir votre première certification.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <Footer />
            {isMobile && <BottomNavigation />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Certifications;
