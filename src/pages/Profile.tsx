import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Key, Bell, Shield, CreditCard, Upload, LogOut, Save } from "lucide-react";

const Profile = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Profile states
  const [name, setName] = useState(currentUser?.name || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [isUpdating, setIsUpdating] = useState(false);

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  
  const handleUpdateProfile = () => {
    setIsUpdating(true);
    
    // Simulate profile update
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      setIsUpdating(false);
    }, 1000);
  };

  if (!isAuthenticated || !currentUser) {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mon profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name.replace(" ", "+")}&background=0D9488&color=fff&size=200`}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-schoolier-blue text-white p-2 rounded-full cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <input id="avatar-upload" type="file" className="hidden" />
                  </label>
                </div>
                
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{currentUser.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                  {currentUser.role}
                </span>
              </div>
              
              <Separator className="my-6" />
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" disabled>
                  <User className="mr-3 h-5 w-5" /> Informations personnelles
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                  <Shield className="mr-3 h-5 w-5" /> Sécurité
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                  <Bell className="mr-3 h-5 w-5" /> Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                  <CreditCard className="mr-3 h-5 w-5" /> Paiements
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="mr-3 h-5 w-5" /> Déconnexion
                </Button>
              </nav>
            </CardContent>
          </Card>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Facturation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Mettez à jour vos informations de profil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            id="fullName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            id="email"
                            value={currentUser.email}
                            disabled
                            className="pl-10 bg-gray-50"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Contactez le support pour changer votre adresse email
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Parlez-nous un peu de vous..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Photo de profil</Label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name.replace(" ", "+")}&background=0D9488&color=fff`}
                          alt={currentUser.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" /> Changer la photo
                        </Button>
                        <Button variant="outline" size="sm">
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Save className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer les modifications
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                    <CardDescription>
                      Gérez la sécurité de votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Changer le mot de passe</Label>
                      <div className="space-y-2">
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Mot de passe actuel"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Nouveau mot de passe"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Confirmer le nouveau mot de passe"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Mettre à jour le mot de passe</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notifications</CardTitle>
                    <CardDescription>
                      Choisissez les types de notifications que vous souhaitez recevoir
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotif" className="font-medium">Notifications par email</Label>
                          <p className="text-sm text-muted-foreground">Recevez des notifications par email</p>
                        </div>
                        <Switch
                          id="emailNotif"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="courseUpdates" className="font-medium">Mises à jour des cours</Label>
                          <p className="text-sm text-muted-foreground">Soyez informé des nouveaux contenus dans vos cours</p>
                        </div>
                        <Switch
                          id="courseUpdates"
                          checked={courseUpdates}
                          onCheckedChange={setCourseUpdates}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="promoEmails" className="font-medium">Emails promotionnels</Label>
                          <p className="text-sm text-muted-foreground">Recevez des promotions et offres spéciales</p>
                        </div>
                        <Switch
                          id="promoEmails"
                          checked={promotionalEmails}
                          onCheckedChange={setPromotionalEmails}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Enregistrer les préférences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de facturation</CardTitle>
                    <CardDescription>
                      Gérez vos informations de paiement et votre historique d'achat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CreditCard className="h-16 w-16 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Aucune méthode de paiement</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Vous n'avez pas encore ajouté de méthode de paiement à votre compte.
                      </p>
                      <Button className="mt-6">
                        Ajouter une méthode de paiement
                      </Button>
                    </div>
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

export default Profile;
