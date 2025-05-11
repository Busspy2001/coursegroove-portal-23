
import React from "react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Schéma de validation pour les paramètres de notification
const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  courseUpdates: z.boolean(),
  newMessages: z.boolean(),
  marketingEmails: z.boolean(),
  newCourses: z.boolean(),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

export const NotificationsForm: React.FC = () => {
  const { toast } = useToast();

  // Valeurs par défaut pour le formulaire de notifications
  const defaultNotificationValues: NotificationFormValues = {
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    newMessages: true,
    marketingEmails: false,
    newCourses: true,
  };

  // Formulaire de notifications
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: defaultNotificationValues,
  });

  // Soumission du formulaire de notifications
  function onNotificationSubmit(values: NotificationFormValues) {
    toast({
      title: "Paramètres de notification mis à jour",
      description: "Vos préférences de notification ont été enregistrées.",
    });
    console.log(values);
  }

  return (
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
  );
};
