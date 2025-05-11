
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schéma pour les préférences
const preferencesFormSchema = z.object({
  language: z.string(),
  theme: z.string(),
  timezone: z.string(),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export const PreferencesForm: React.FC = () => {
  const { toast } = useToast();

  // Valeurs par défaut pour les préférences
  const defaultPreferencesValues: PreferencesFormValues = {
    language: "fr",
    theme: "system",
    timezone: "Europe/Paris",
  };

  // Formulaire de préférences
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: defaultPreferencesValues,
  });

  // Soumission du formulaire de préférences
  function onPreferencesSubmit(values: PreferencesFormValues) {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
    console.log(values);
  }

  return (
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
  );
};
