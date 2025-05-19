
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Send, Ban, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const notificationSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
  type: z.enum(["system", "course", "certification", "event"]),
  target: z.enum(["all", "admin", "instructor", "student", "business", "employee"]),
  link: z.string().optional(),
});

export const AdminNotificationsManager = () => {
  const [isCreatingNotification, setIsCreatingNotification] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "system",
      target: "all",
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof notificationSchema>) => {
    try {
      // Dans un environnement réel, vous enverriez la notification à tous les utilisateurs ciblés
      // Ici, nous simulons juste une réussite
      console.log("Notification à envoyer:", values);
      
      // Exemple de code pour envoyer une notification à tous les utilisateurs
      /*
      const { data: users, error: usersError } = await supabase
        .from('profiles_unified')
        .select('id')
        .eq('role', values.target === 'all' ? '*' : values.target);
        
      if (usersError) throw usersError;
      
      const notifications = users.map(user => ({
        user_id: user.id,
        message: values.message,
        type: values.type,
        is_read: false,
        link: values.link || null,
      }));
      
      const { error } = await supabase
        .from('notifications')
        .insert(notifications);
        
      if (error) throw error;
      */
      
      toast({
        title: "Notification envoyée",
        description: `La notification a été envoyée aux utilisateurs ${values.target}.`,
        variant: "success",
      });
      
      setIsCreatingNotification(false);
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la notification. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <Ban className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestion des notifications</h2>
          <p className="text-muted-foreground">Gérez et consultez l'historique des notifications</p>
        </div>
        <Dialog open={isCreatingNotification} onOpenChange={setIsCreatingNotification}>
          <DialogTrigger asChild>
            <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
              <Send className="mr-2 h-4 w-4" />
              Nouvelle notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Envoyer une nouvelle notification</DialogTitle>
              <DialogDescription>
                Créez une notification qui sera envoyée aux utilisateurs ciblés.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre de la notification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Contenu de la notification" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type de notification" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="system">Système</SelectItem>
                            <SelectItem value="course">Formation</SelectItem>
                            <SelectItem value="certification">Certification</SelectItem>
                            <SelectItem value="event">Événement</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destinataires</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner les destinataires" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">Tous les utilisateurs</SelectItem>
                            <SelectItem value="admin">Administrateurs</SelectItem>
                            <SelectItem value="instructor">Formateurs</SelectItem>
                            <SelectItem value="student">Étudiants</SelectItem>
                            <SelectItem value="business">Entreprises</SelectItem>
                            <SelectItem value="employee">Employés</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="URL liée à la notification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreatingNotification(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Envoyer la notification</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Bell className="mr-2 h-5 w-5 text-schoolier-blue" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="system">Système</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="courses">Cours</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Mise à jour système</h3>
                    <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Système</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée à tous les utilisateurs • 13/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Nouveaux cours disponibles</h3>
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">Cours</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée aux étudiants tech • 10/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Offre spéciale week-end</h3>
                    <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Marketing</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Envoyée aux utilisateurs actifs • 08/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
                <p>Le filtrage par type de notification sera disponible prochainement.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
