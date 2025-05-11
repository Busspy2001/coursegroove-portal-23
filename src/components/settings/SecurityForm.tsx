
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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schéma de validation pour les paramètres de sécurité
const securityFormSchema = z.object({
  twoFactorAuth: z.boolean(),
  sessionTimeout: z.string(),
  loginNotifications: z.boolean(),
});

type SecurityFormValues = z.infer<typeof securityFormSchema>;

export const SecurityForm: React.FC = () => {
  const { toast } = useToast();

  // Valeurs par défaut pour le formulaire de sécurité
  const defaultSecurityValues: SecurityFormValues = {
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
  };

  // Formulaire de sécurité
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: defaultSecurityValues,
  });

  // Soumission du formulaire de sécurité
  function onSecuritySubmit(values: SecurityFormValues) {
    toast({
      title: "Paramètres de sécurité mis à jour",
      description: "Vos paramètres de sécurité ont été mis à jour avec succès.",
    });
    console.log(values);
  }

  return (
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
  );
};
