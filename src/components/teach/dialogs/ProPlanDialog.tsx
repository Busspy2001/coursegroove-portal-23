
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  billingPeriod: z.enum(["monthly", "yearly"]),
  paymentMethod: z.enum(["card", "paypal"]),
});

interface ProPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProPlanDialog: React.FC<ProPlanDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      billingPeriod: "monthly",
      paymentMethod: "card",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'un appel API pour le traitement du paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Pro plan subscription submitted:", values);
      
      setSuccess(true);
      toast({
        title: "Abonnement Pro activé !",
        description: "Votre compte a été mis à niveau vers le plan Pro avec succès.",
      });
      
      // Reset form after successful submission
      form.reset();
      
      // Close dialog after a short delay
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du traitement du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Passer au plan Pro</DialogTitle>
          <DialogDescription>
            Débloquez tous les avantages premium pour les instructeurs et augmentez vos revenus.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <svg
                className="h-10 w-10 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Votre compte Pro est actif !</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Profitez de tous les avantages premium dès maintenant.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-schoolier-blue/5 dark:bg-schoolier-blue/10 p-6 rounded-lg">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Plan Pro</h3>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold">29€</span>
                  <span className="ml-1 text-gray-500">/mois</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Ou 276€/an (économisez 20%)
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Avantages inclus :</h4>
                <ul className="space-y-2">
                  {[
                    "Commission réduite à 10%",
                    "Page personnalisée",
                    "Meilleur placement dans les recherches",
                    "Support prioritaire",
                    "Outils marketing avancés"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-schoolier-teal mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-2">
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="billingPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Période de facturation</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="monthly" />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                Mensuel (29€/mois)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yearly" />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                Annuel (276€/an - 20% de réduction)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Méthode de paiement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une méthode de paiement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="card">Carte bancaire</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                      disabled={isSubmitting}
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="relative"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="opacity-0">S'abonner</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <DollarSign className="mr-2 h-4 w-4" />
                          S'abonner
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProPlanDialog;
