
import React from "react";
import EmployeeLayout from "@/components/employee-dashboard/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Calendar, ExternalLink } from "lucide-react";

const EmployeeCertifications = () => {
  // Mock data - To be replaced with actual data from Supabase
  const earnedCertificates = [
    {
      id: "1",
      title: "Excel pour professionnels",
      issueDate: "2025-04-15",
      expiryDate: "2028-04-15",
      provider: "Schoolier",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=excel"
    },
    {
      id: "2",
      title: "Fondamentaux du marketing digital",
      issueDate: "2025-05-01",
      expiryDate: null, // No expiry date
      provider: "Schoolier",
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=marketing"
    }
  ];

  const availableCertifications = [
    {
      id: "3",
      title: "Introduction à la cybersécurité",
      description: "Certification des compétences en cybersécurité fondamentale",
      provider: "Schoolier",
      requiredCourse: "Introduction à la cybersécurité",
      progress: 65,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=cybersecurity"
    },
    {
      id: "4",
      title: "Communication professionnelle",
      description: "Certification des aptitudes en communication d'entreprise",
      provider: "Schoolier",
      requiredCourse: "Communication efficace en entreprise",
      progress: 25,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=communication"
    },
    {
      id: "5",
      title: "Gestion de projet - Niveau fondamental",
      description: "Certification des compétences en gestion de projet",
      provider: "Schoolier",
      requiredCourse: "Gestion de projet avancée",
      progress: 0,
      thumbnail: "https://api.dicebear.com/6.x/shapes/svg?seed=projectmanagement"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">
            Gérez vos certifications et suivez votre parcours de formation
          </p>
        </div>

        <Tabs defaultValue="earned" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="earned">Certifications obtenues</TabsTrigger>
            <TabsTrigger value="available">Certifications disponibles</TabsTrigger>
          </TabsList>
          
          {/* Earned Certificates Tab */}
          <TabsContent value="earned" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedCertificates.map(certificate => (
                <Card key={certificate.id} className="flex flex-col h-full overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 flex flex-col items-center pt-6 pb-4 border-b">
                    <div className="h-24 w-24 mb-3 relative">
                      <img src={certificate.thumbnail} alt="" className="w-full h-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Award className="h-10 w-10 text-schoolier-teal" />
                      </div>
                    </div>
                    <CardTitle className="text-center">{certificate.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col space-y-4 pt-4 flex-grow">
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Emis par:</div>
                      <div className="font-medium">{certificate.provider}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Date d'émission:</div>
                      <div className="font-medium">{formatDate(certificate.issueDate)}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Validité:</div>
                      <div className="font-medium">
                        {certificate.expiryDate 
                          ? `Jusqu'au ${formatDate(certificate.expiryDate)}`
                          : "Sans expiration"}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-auto">
                      <Button className="flex-1 gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                      <Button variant="outline" className="flex-1 gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Partager
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {earnedCertificates.length === 0 && (
              <Card className="w-full">
                <CardContent className="p-6 text-center">
                  <div className="py-10">
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucune certification obtenue</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore obtenu de certification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Available Certifications Tab */}
          <TabsContent value="available" className="space-y-4">
            {availableCertifications.map(certification => (
              <Card key={certification.id} className="w-full">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-36 h-24 bg-gray-100 rounded-md overflow-hidden relative">
                        <img 
                          src={certification.thumbnail}
                          alt={certification.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Award className="h-10 w-10 text-schoolier-blue opacity-60" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-bold text-lg">{certification.title}</h3>
                          <p className="text-sm text-muted-foreground">Émis par: {certification.provider}</p>
                        </div>
                        {certification.progress > 0 ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
                        ) : (
                          <Badge variant="outline">Non commencé</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm">{certification.description}</p>
                      
                      <div className="pt-2">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Cours requis: {certification.requiredCourse}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          {certification.progress > 0 ? (
                            <Button className="sm:w-auto">Continuer le cours</Button>
                          ) : (
                            <Button className="sm:w-auto">Commencer le cours</Button>
                          )}
                          <Button variant="outline" className="sm:w-auto">
                            Détails de la certification
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {availableCertifications.length === 0 && (
              <Card className="w-full">
                <CardContent className="p-6 text-center">
                  <div className="py-10">
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucune certification disponible</h3>
                    <p className="text-muted-foreground">
                      Il n'y a actuellement aucune certification disponible pour vous.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeCertifications;
