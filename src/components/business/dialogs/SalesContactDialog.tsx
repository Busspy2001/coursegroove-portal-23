
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  company: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  employees: z.string(),
  requirements: z.string().min(10, { message: "Veuillez décrire vos besoins (minimum 10 caractères)" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SalesContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SalesContactDialog: React.FC<SalesContactDialogProps> = ({
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
      phone: "",
      company: "",
      employees: "501+",
      requirements: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Sales contact request submitted:", data);
      
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
      <DialogContent className="sm:max-w-[550px]">
        {!isSuccessful ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Contacter notre équipe commerciale</DialogTitle>
              <DialogDescription>
                Parlez à un expert Schoolier pour discuter d'une solution sur mesure pour votre organisation.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 6 12 34 56 78" {...field} />
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
                        <FormLabel>Entreprise</FormLabel>
                        <FormControl>
                          <Input placeholder="Entreprise SAS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="501+">Plus de 500</SelectItem>
                          <SelectItem value="1000+">Plus de 1000</SelectItem>
                          <SelectItem value="5000+">Plus de 5000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vos besoins spécifiques</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez vos besoins en formation, vos défis actuels, et ce que vous recherchez..."
                          className="min-h-[100px]"
                          {...field}
                        />
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
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
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
            <h3 className="text-2xl font-semibold mb-2">Demande envoyée !</h3>
            <p className="text-gray-600 mb-6">
              Merci de nous avoir contactés. Un représentant commercial vous contactera dans les 24 heures ouvrables pour discuter de vos besoins.
            </p>
            <Button onClick={resetAndClose}>
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SalesContactDialog;
