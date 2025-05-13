
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const NotificationsForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler une requête
    setTimeout(() => {
      toast({
        title: "Paramètres enregistrés",
        description: "Vos préférences de notifications ont été mises à jour.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notifications</CardTitle>
          <CardDescription>
            Configurez les notifications envoyées à vous et à vos employés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications administrateur</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activité des employés</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications pour les achèvements importants et l'inactivité
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Rapports hebdomadaires</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir un rapport récapitulatif hebdomadaire par email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Alertes de conformité</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications pour les formations obligatoires non complétées
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Facturation et abonnement</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications concernant votre abonnement et vos factures
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications pour les employés</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Rappels de formation</Label>
                  <p className="text-sm text-muted-foreground">
                    Envoyer des rappels pour les cours en cours
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Nouvelles formations disponibles</Label>
                  <p className="text-sm text-muted-foreground">
                    Alerter les employés quand de nouveaux cours sont disponibles
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Formations obligatoires</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifier les employés des formations obligatoires à suivre
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Félicitations d'achèvement</Label>
                  <p className="text-sm text-muted-foreground">
                    Envoyer un message de félicitation lorsqu'un cours est terminé
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Message de bienvenue personnalisé</h3>
            <p className="text-sm text-muted-foreground">
              Ce message sera affiché aux nouveaux employés rejoignant la plateforme
            </p>
            
            <Textarea 
              rows={4}
              defaultValue="Bienvenue sur la plateforme de formation d'Acme Inc. ! Nous sommes ravis de vous accompagner dans votre parcours de développement professionnel. N'hésitez pas à explorer les différentes formations disponibles et à contacter le service RH si vous avez des questions."
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les préférences"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
