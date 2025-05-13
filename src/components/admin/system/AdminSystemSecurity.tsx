
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Users, Key, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const AdminSystemSecurity = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Système & Sécurité</h2>
          <p className="text-muted-foreground">Gérez les paramètres système et la sécurité de la plateforme</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Score de sécurité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">85/100</div>
            <Progress value={85} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sessions actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-schoolier-blue mr-2" />
              <div className="text-2xl font-bold">12,451</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dernière mise à jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13/05/2025</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Shield className="mr-2 h-5 w-5 text-schoolier-blue" />
            Paramètres de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Authentification</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-schoolier-teal" />
                  <h4 className="font-medium">Authentification à deux facteurs (2FA)</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Obligatoire pour les comptes admin</p>
              </div>
              <Button variant="outline" size="sm">
                Configurer
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center">
                  <Key className="h-4 w-4 mr-2 text-schoolier-teal" />
                  <h4 className="font-medium">Politique de mots de passe</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Complexité élevée</p>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Protection des données</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-schoolier-teal" />
                  <h4 className="font-medium">Chiffrement des données</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Activé pour toutes les données sensibles</p>
              </div>
              <Button variant="outline" size="sm">
                Gérer
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-schoolier-teal" />
                  <h4 className="font-medium">Sauvegardes automatiques</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6">Quotidiennes avec rétention de 30 jours</p>
              </div>
              <Button variant="outline" size="sm">
                Configurer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
