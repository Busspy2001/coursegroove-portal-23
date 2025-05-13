
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Shield, 
  AlertTriangle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SecurityForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler une requête
    setTimeout(() => {
      toast({
        title: "Paramètres enregistrés",
        description: "Vos paramètres de sécurité ont été mis à jour.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentification</CardTitle>
          <CardDescription>
            Configurez les options d'authentification pour votre entreprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-start gap-4">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Single Sign-On (SSO)</h3>
                    <p className="text-sm text-muted-foreground">
                      Permettez à vos employés de se connecter avec leurs identifiants d'entreprise
                    </p>
                  </div>
                </div>
                <Button variant="secondary">Configurer le SSO</Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Restrictions d'accès</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Restriction par domaine email</Label>
                    <p className="text-sm text-muted-foreground">
                      Limiter l'accès aux emails de votre domaine
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input defaultValue="acme-inc.fr" className="max-w-xs" />
                  <Button variant="outline" size="sm">
                    +
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Restriction par adresse IP</Label>
                    <p className="text-sm text-muted-foreground">
                      Limiter l'accès à certaines adresses IP
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sécurité du compte</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger l'authentification à deux facteurs pour tous les administrateurs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Durée de session</Label>
                    <p className="text-sm text-muted-foreground">
                      Définir la durée après laquelle les utilisateurs sont déconnectés
                    </p>
                  </div>
                  <Select defaultValue="8h">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 heure</SelectItem>
                      <SelectItem value="4h">4 heures</SelectItem>
                      <SelectItem value="8h">8 heures</SelectItem>
                      <SelectItem value="24h">24 heures</SelectItem>
                      <SelectItem value="7d">7 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Politique de mot de passe</Label>
                    <p className="text-sm text-muted-foreground">
                      Définir les exigences minimales pour les mots de passe
                    </p>
                  </div>
                  <Select defaultValue="strong">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basique</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="strong">Fort</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer les paramètres"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Journal d'activité</CardTitle>
          <CardDescription>
            Consultez les dernières activités de sécurité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Configuration SSO mise à jour</p>
                  <p className="text-sm text-muted-foreground">par Sophie Martin • il y a 2 jours</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Détails</Button>
            </div>
          </div>
          
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Tentatives de connexion multiples</p>
                  <p className="text-sm text-muted-foreground">IP: 203.0.113.42 • il y a 5 jours</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Détails</Button>
            </div>
          </div>
          
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Politique de mot de passe mise à jour</p>
                  <p className="text-sm text-muted-foreground">par Thomas Dubois • il y a 2 semaines</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Détails</Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="link">
              Voir tout le journal d'activité
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
