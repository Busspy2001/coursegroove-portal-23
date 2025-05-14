
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { User } from "@/contexts/auth/types";
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
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  currentUser: User | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ currentUser }) => {
  const { toast } = useToast();
  
  // Valeurs par défaut pour le formulaire de profil
  const defaultProfileValues: Partial<ProfileFormValues> = {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    avatar: currentUser?.avatar || "",
  };

  // Formulaire de profil
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
  });

  // Soumission du formulaire de profil
  function onProfileSubmit(values: ProfileFormValues) {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
    });
    console.log(values);
  }

  const getInitials = (name: string = "Utilisateur") => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
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
  );
};
