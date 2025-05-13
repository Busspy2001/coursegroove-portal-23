
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Save, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const AdminNotificationsPreferences = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Préférences de notifications</h2>
          <p className="text-muted-foreground">Configurez les paramètres globaux de notifications</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Bell className="mr-2 h-5 w-5 text-schoolier-blue" />
            Paramètres généraux
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications système</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Maintenance planifiée</h4>
                <p className="text-sm text-muted-foreground">Envoyer des notifications pour les maintenances prévues</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Mises à jour importantes</h4>
                <p className="text-sm text-muted-foreground">Envoyer des notifications pour les mises à jour majeures</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Alertes de sécurité</h4>
                <p className="text-sm text-muted-foreground">Envoyer des notifications pour les problèmes de sécurité</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications marketing</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Promotions et offres</h4>
                <p className="text-sm text-muted-foreground">Permettre aux utilisateurs de recevoir des offres promotionnelles</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Nouveaux cours</h4>
                <p className="text-sm text-muted-foreground">Notifier les utilisateurs des nouveaux cours pertinents</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Préférences de fréquence</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Regrouper les notifications</h4>
                <p className="text-sm text-muted-foreground">Envoyer un résumé quotidien au lieu de notifications individuelles</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Limitation des notifications</h4>
                <p className="text-sm text-muted-foreground">Maximum 3 notifications par jour par utilisateur</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
