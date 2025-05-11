
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Download, Mail } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }).optional(),
  newsletter: z.boolean().default(false),
});

interface GuideDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuideDownloadDialog: React.FC<GuideDownloadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newsletter: false,
    },
  });

  const handleDownload = async (values: z.infer<typeof formSchema>) => {
    setIsDownloading(true);
    
    try {
      // Simulation de téléchargement et d'enregistrement d'email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Download requested with data:", values);
      
      // Afficher le toast de succès
      toast({
        title: "Guide téléchargé !",
        description: values.newsletter 
          ? "Vous êtes maintenant inscrit(e) à notre newsletter." 
          : "Bon apprentissage avec votre guide.",
      });
      
      // Reset form after successful submission
      form.reset();
      
      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
      }, 1000);
      
      // Dans un environnement réel, nous déclencherions le téléchargement du fichier ici
      // window.open('/guides/instructor-success-guide.pdf', '_blank');
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du téléchargement. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleDownload(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Télécharger le guide de l'instructeur</DialogTitle>
          <DialogDescription>
            Obtenez notre guide complet sur la création de cours à succès sur Schoolier.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-schoolier-blue/5 dark:bg-schoolier-blue/10 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Ce que vous allez découvrir :</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Les 7 étapes pour créer un cours qui se vend</li>
                <li>Comment engager vos apprenants dès la première vidéo</li>
                <li>Les meilleures pratiques de tarification</li>
                <li>Stratégies marketing pour promouvoir votre cours</li>
                <li>Et bien plus encore !</li>
              </ul>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Renseignez votre email pour recevoir des mises à jour du guide.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      S'inscrire à la newsletter des instructeurs
                    </FormLabel>
                    <FormDescription>
                      Recevez des conseils et astuces pour améliorer vos cours et augmenter vos revenus.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isDownloading}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isDownloading} 
                className="relative"
              >
                {isDownloading ? (
                  <>
                    <span className="opacity-0">Télécharger</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le guide
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GuideDownloadDialog;
