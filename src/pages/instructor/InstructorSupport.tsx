
import React from "react";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, FileText, Video, Mail } from "lucide-react";

const InstructorSupport = () => {
  return (
    <InstructorLayout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-semibold mb-6">Support</h1>
        
        {/* Ressources d'aide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Guide instructeur</h3>
              <p className="text-sm text-muted-foreground">Documentation complète pour les instructeurs</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Tutoriels vidéo</h3>
              <p className="text-sm text-muted-foreground">Apprenez à créer des cours de qualité</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold mb-2">Forum communauté</h3>
              <p className="text-sm text-muted-foreground">Échangez avec d'autres instructeurs</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <HelpCircle className="h-8 w-8 mx-auto mb-3 text-orange-600" />
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground">Réponses aux questions fréquentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Contacter le support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contacter le support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" placeholder="Décrivez brièvement votre problème" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Décrivez votre problème en détail..."
                className="min-h-[120px]"
              />
            </div>
            <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
              Envoyer le message
            </Button>
          </CardContent>
        </Card>

        {/* FAQ rapide */}
        <Card>
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Comment publier mon premier cours ?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Rendez-vous dans "Créer un cours", ajoutez votre contenu, définissez un prix et publiez.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Quand suis-je payé ?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Les paiements sont effectués mensuellement, le 15 de chaque mois.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Comment améliorer mes ventes ?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Créez du contenu de qualité, utilisez des titres accrocheurs et engagez avec vos étudiants.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorSupport;
