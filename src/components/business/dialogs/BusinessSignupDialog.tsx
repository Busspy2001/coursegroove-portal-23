
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  company: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  industry: z.string().min(1, { message: "Le secteur d'activité est requis" }),
  employees: z.string(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
});

type FormValues = z.infer<typeof formSchema>;

interface BusinessSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BusinessSignupDialog: React.FC<BusinessSignupDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      industry: "",
      employees: "10-50",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Business signup submitted:", data);
      
      // Show success state
      setIsSuccessful(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    form.reset();
    setIsSuccessful(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={isSuccessful ? resetAndClose : onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!isSuccessful ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Créer un compte entreprise</DialogTitle>
              <DialogDescription>
                Commencez à former vos équipes avec Schoolier Business dès aujourd'hui.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email professionnel</FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@entreprise.fr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Entreprise SAS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secteur d'activité</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Technologie, Finance, Santé..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'employés</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-9">1-9</SelectItem>
                          <SelectItem value="10-50">10-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="501+">501+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création en cours..." : "Créer mon compte entreprise"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Compte créé avec succès !</h3>
            <p className="text-gray-600 mb-6">
              Un email de confirmation a été envoyé à votre adresse. Vous pouvez maintenant accéder à votre espace Schoolier Business.
            </p>
            <Button onClick={resetAndClose}>
              Accéder à mon espace
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BusinessSignupDialog;
