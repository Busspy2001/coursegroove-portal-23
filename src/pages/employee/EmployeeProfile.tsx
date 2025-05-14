
import React from "react";
import { useAuth } from "@/contexts/auth";
import EmployeeLayout from "@/components/employee-dashboard/EmployeeLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmployeeProfile = () => {
  const { currentUser } = useAuth();
  
  // Profile picture initials
  const getInitials = (name: string = "Employé") => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et préférences
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="personal">Infos personnelles</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
          </TabsList>
          
          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations de profil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={currentUser?.avatar_url} alt={currentUser?.name} />
                      <AvatarFallback className="text-lg">{getInitials(currentUser?.name)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" defaultValue={currentUser?.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={currentUser?.email} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" defaultValue="Développeur Frontend" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Input id="department" defaultValue="Technologie" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue={currentUser?.bio || ""}
                        placeholder="Parlez de vous en quelques mots..."
                        className="resize-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button>Enregistrer les modifications</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
                <CardDescription>
                  Gérez vos coordonnées de contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue={currentUser?.phone || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button>Enregistrer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Skills Tab - Placeholder */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
                <CardDescription>
                  Gérez vos compétences et expertises professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fonctionnalité en cours de développement. Vous pourrez bientôt ajouter et gérer vos compétences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Certifications Tab - Placeholder */}
          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Historique des certifications</CardTitle>
                <CardDescription>
                  Consultez et téléchargez vos certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fonctionnalité en cours de développement. Vous pourrez bientôt consulter votre historique de certifications.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Preferences Tab - Placeholder */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Préférences d'apprentissage</CardTitle>
                <CardDescription>
                  Personnalisez votre expérience d'apprentissage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fonctionnalité en cours de développement. Vous pourrez bientôt personnaliser vos préférences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeProfile;
