
import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import { useAuth } from "@/contexts/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  CreditCard,
  Upload
} from "lucide-react";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Schéma de validation pour le formulaire de profil
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  bio: z.string().max(500, {
    message: "La biographie ne doit pas dépasser 500 caractères.",
  }).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

// Schéma de validation pour les paramètres de notification
const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  courseUpdates: z.boolean(),
  newMessages: z.boolean(),
  marketingEmails: z.boolean(),
  newCourses: z.boolean(),
});

// Schéma de validation pour les paramètres de sécurité
const securityFormSchema = z.object({
  twoFactorAuth: z.boolean(),
  sessionTimeout: z.string(),
  loginNotifications: z.boolean(),
});

// Schéma pour les préférences
const preferencesFormSchema = z.object({
  language: z.string(),
  theme: z.string(),
  timezone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;
type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const Settings = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  // Valeurs par défaut pour le formulaire de profil
  const defaultProfileValues: Partial<ProfileFormValues> = {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    phone: currentUser?.phone || "",
    avatar: currentUser?.avatar || "",
  };

  // Valeurs par défaut pour le formulaire de notifications
  const defaultNotificationValues: NotificationFormValues = {
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    newMessages: true,
    marketingEmails: false,
    newCourses: true,
  };

  // Valeurs par défaut pour le formulaire de sécurité
  const defaultSecurityValues: SecurityFormValues = {
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
  };

  // Valeurs par défaut pour les préférences
  const defaultPreferencesValues: PreferencesFormValues = {
    language: "fr",
    theme: "system",
    timezone: "Europe/Paris",
  };

  // Formulaire de profil
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
  });

  // Formulaire de notifications
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: defaultNotificationValues,
  });

  // Formulaire de sécurité
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: defaultSecurityValues,
  });

  // Formulaire de préférences
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: defaultPreferencesValues,
  });

  // Soumission du formulaire de profil
  function onProfileSubmit(values: ProfileFormValues) {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
    });
    console.log(values);
  }

  // Soumission du formulaire de notifications
  function onNotificationSubmit(values: NotificationFormValues) {
    toast({
      title: "Paramètres de notification mis à jour",
      description: "Vos préférences de notification ont été enregistrées.",
    });
    console.log(values);
  }

  // Soumission du formulaire de sécurité
  function onSecuritySubmit(values: SecurityFormValues) {
    toast({
      title: "Paramètres de sécurité mis à jour",
      description: "Vos paramètres de sécurité ont été mis à jour avec succès.",
    });
    console.log(values);
  }

  // Soumission du formulaire de préférences
  function onPreferencesSubmit(values: PreferencesFormValues) {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
    console.log(values);
  }

  const getInitials = (name: string = "Utilisateur") => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <StudentSidebar />
        
        <SidebarInset className="p-0">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Paramètres</h1>
            </div>
            
            <div className="container px-6 py-8 flex-grow">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Paramètres du compte</h1>
                <p className="text-muted-foreground">
                  Gérez vos informations personnelles, préférences et paramètres de sécurité.
                </p>
              </div>
              
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Préférences
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Sécurité
                  </TabsTrigger>
                </TabsList>
                
                {/* Onglet Profil */}
                <TabsContent value="profile">
                  <div className="grid gap-8">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription>
                              Gérez vos informations de profil visibles par les autres utilisateurs.
                            </CardDescription>
                          </div>
                          <Avatar className="w-20 h-20 mt-4 md:mt-0">
                            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                            <AvatarFallback className="text-lg">{getInitials(currentUser?.name)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Form {...profileForm}>
                          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nom complet</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Votre nom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="votre-email@exemple.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={profileForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                      <Input placeholder="+33 6 00 00 00 00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={profileForm.control}
                                name="avatar"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Photo de profil</FormLabel>
                                    <div className="flex items-center gap-4">
                                      <Button variant="outline" type="button" className="w-full">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Changer la photo
                                      </Button>
                                    </div>
                                    <FormDescription>
                                      JPG, GIF ou PNG. 1 Mo maximum.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={profileForm.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Biographie</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Parlez de vous..."
                                      className="min-h-32 resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Cette information sera visible sur votre profil public.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end">
                              <Button variant="outline" type="button" className="mr-2">
                                Annuler
                              </Button>
                              <Button type="submit">
                                Enregistrer les modifications
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Onglet Notifications */}
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences de notification</CardTitle>
                      <CardDescription>
                        Contrôlez quand et comment vous souhaitez être notifié.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...notificationForm}>
                        <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Canaux de notification</h3>
                            <div className="grid gap-6">
                              <FormField
                                control={notificationForm.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Notifications par e-mail</FormLabel>
                                      <FormDescription>
                                        Recevoir des notifications par e-mail.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={notificationForm.control}
                                name="pushNotifications"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Notifications push</FormLabel>
                                      <FormDescription>
                                        Recevoir des notifications dans le navigateur.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Types de notifications</h3>
                            <div className="grid gap-6">
                              <FormField
                                control={notificationForm.control}
                                name="courseUpdates"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Mises à jour de cours</FormLabel>
                                      <FormDescription>
                                        Quand un cours est mis à jour ou qu'un nouveau contenu est disponible.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={notificationForm.control}
                                name="newMessages"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Nouveaux messages</FormLabel>
                                      <FormDescription>
                                        Quand vous recevez un message d'un instructeur ou d'un autre étudiant.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={notificationForm.control}
                                name="newCourses"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Nouveaux cours</FormLabel>
                                      <FormDescription>
                                        Quand de nouveaux cours sont ajoutés correspondant à vos centres d'intérêt.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={notificationForm.control}
                                name="marketingEmails"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">E-mails marketing</FormLabel>
                                      <FormDescription>
                                        Recevoir des offres promotionnelles et des informations sur les événements.
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button type="submit">
                              Enregistrer les préférences
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Onglet Préférences */}
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences de l'application</CardTitle>
                      <CardDescription>
                        Personnalisez votre expérience d'apprentissage sur la plateforme.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...preferencesForm}>
                        <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={preferencesForm.control}
                              name="language"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Langue</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez une langue" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="fr">Français</SelectItem>
                                      <SelectItem value="en">English</SelectItem>
                                      <SelectItem value="es">Español</SelectItem>
                                      <SelectItem value="de">Deutsch</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    La langue utilisée dans l'interface de l'application.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={preferencesForm.control}
                              name="theme"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Thème</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un thème" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="light">Clair</SelectItem>
                                      <SelectItem value="dark">Sombre</SelectItem>
                                      <SelectItem value="system">Système</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    <div className="flex items-center">
                                      <Moon className="h-4 w-4 mr-1" />
                                      <span>Choisissez l'apparence de l'application.</span>
                                    </div>
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={preferencesForm.control}
                              name="timezone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Fuseau horaire</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                                      <SelectItem value="America/New_York">America/New York (UTC-5)</SelectItem>
                                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                                      <SelectItem value="Australia/Sydney">Australia/Sydney (UTC+10)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Le fuseau horaire utilisé pour les dates et heures dans l'application.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button type="submit">
                              Enregistrer les préférences
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Onglet Sécurité */}
                <TabsContent value="security">
                  <div className="grid gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sécurité du compte</CardTitle>
                        <CardDescription>
                          Gérez les paramètres de sécurité de votre compte.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...securityForm}>
                          <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                            <FormField
                              control={securityForm.control}
                              name="twoFactorAuth"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Authentification à deux facteurs</FormLabel>
                                    <FormDescription>
                                      Ajouter une couche de sécurité supplémentaire à votre compte.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={securityForm.control}
                              name="sessionTimeout"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Délai d'expiration de session</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un délai" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="15">15 minutes</SelectItem>
                                      <SelectItem value="30">30 minutes</SelectItem>
                                      <SelectItem value="60">1 heure</SelectItem>
                                      <SelectItem value="120">2 heures</SelectItem>
                                      <SelectItem value="never">Jamais</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Délai après lequel vous devrez vous reconnecter.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={securityForm.control}
                              name="loginNotifications"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Notifications de connexion</FormLabel>
                                    <FormDescription>
                                      Recevoir une notification lorsque votre compte est utilisé sur un nouvel appareil.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end">
                              <Button type="submit">
                                Enregistrer les paramètres
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Mot de passe</CardTitle>
                        <CardDescription>
                          Mettez à jour votre mot de passe pour renforcer la sécurité de votre compte.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <FormLabel>Mot de passe actuel</FormLabel>
                              <Input type="password" />
                            </div>
                            <div></div>
                            <div className="space-y-2">
                              <FormLabel>Nouveau mot de passe</FormLabel>
                              <Input type="password" />
                            </div>
                            <div className="space-y-2">
                              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                              <Input type="password" />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button>
                              Changer le mot de passe
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Options de paiement</CardTitle>
                        <CardDescription>
                          Gérez vos méthodes de paiement pour les achats sur la plateforme.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                              <CreditCard className="h-8 w-8 text-schoolier-blue" />
                              <div>
                                <p className="font-medium">Carte Visa terminant par 4242</p>
                                <p className="text-sm text-muted-foreground">Expire le 12/25</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Modifier</Button>
                              <Button variant="outline" size="sm">Supprimer</Button>
                            </div>
                          </div>
                          <Button>
                            Ajouter une méthode de paiement
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
