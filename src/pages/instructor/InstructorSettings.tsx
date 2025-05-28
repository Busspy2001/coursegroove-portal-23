
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Bell, Shield, CreditCard } from "lucide-react";

const InstructorSettings = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-semibold mb-6">Paramètres</h1>
        
        {/* Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil instructeur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Votre prénom" />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Votre nom" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Biographie</Label>
              <Textarea id="bio" placeholder="Parlez-nous de vous et de votre expertise..." />
            </div>
            <div>
              <Label htmlFor="website">Site web</Label>
              <Input id="website" placeholder="https://votre-site.com" />
            </div>
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nouvelles inscriptions</p>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle inscription</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nouveaux avis</p>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvel avis</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Messages des étudiants</p>
                <p className="text-sm text-muted-foreground">Recevoir une notification pour les messages directs</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Paiements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Informations de paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="paypal">Email PayPal</Label>
              <Input id="paypal" placeholder="votre-email@paypal.com" />
            </div>
            <div>
              <Label htmlFor="bank">IBAN</Label>
              <Input id="bank" placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" />
            </div>
            <Button>Mettre à jour</Button>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorSettings;
