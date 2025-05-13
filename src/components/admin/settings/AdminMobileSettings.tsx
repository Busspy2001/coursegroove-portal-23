
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MonitorSmartphone, 
  Smartphone, 
  Tablet, 
  Settings, 
  Bell, 
  CloudUpload,
  Sliders,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminMobileSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Adaptabilité mobile</h2>
          <p className="text-muted-foreground">Configurez les paramètres pour l'expérience mobile</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general" className="flex items-center">
            <Smartphone className="mr-2 h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications Push
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center">
            <Tablet className="mr-2 h-4 w-4" />
            Contenu Mobile
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <Sliders className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux mobile</CardTitle>
              <CardDescription>
                Configurez les options d'affichage et de comportement sur appareils mobiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-mobile">Activer l'application mobile</Label>
                      <p className="text-muted-foreground text-sm">
                        Rend la plate-forme accessible via l'application mobile
                      </p>
                    </div>
                    <Switch id="enable-mobile" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-redirect">Redirection automatique</Label>
                      <p className="text-muted-foreground text-sm">
                        Redirige les utilisateurs mobiles vers l'application
                      </p>
                    </div>
                    <Switch id="auto-redirect" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="offline-access">Accès hors ligne</Label>
                      <p className="text-muted-foreground text-sm">
                        Permet aux utilisateurs d'accéder au contenu hors ligne
                      </p>
                    </div>
                    <Switch id="offline-access" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-version">Version de l'application</Label>
                    <Input id="app-version" defaultValue="1.2.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="min-version">Version minimale requise</Label>
                    <Input id="min-version" defaultValue="1.0.0" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="force-update">Forcer la mise à jour</Label>
                      <p className="text-muted-foreground text-sm">
                        Force les utilisateurs à mettre à jour vers la dernière version
                      </p>
                    </div>
                    <Switch id="force-update" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liens de téléchargement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ios-link">Lien App Store (iOS)</Label>
                  <Input id="ios-link" placeholder="https://apps.apple.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="android-link">Lien Google Play (Android)</Label>
                  <Input id="android-link" placeholder="https://play.google.com/..." />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des notifications push</CardTitle>
              <CardDescription>
                Gérez les paramètres des notifications push pour les appareils mobiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-push">Activer les notifications push</Label>
                  <p className="text-muted-foreground text-sm">
                    Permet d'envoyer des notifications aux appareils mobiles
                  </p>
                </div>
                <Switch id="enable-push" defaultChecked />
              </div>
              
              <div className="pt-4 space-y-4">
                <h4 className="font-semibold">Types de notifications</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-courses">Nouveaux cours</Label>
                      <p className="text-muted-foreground text-sm">
                        Notifier les utilisateurs des nouveaux cours disponibles
                      </p>
                    </div>
                    <Switch id="notify-courses" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-messages">Messages</Label>
                      <p className="text-muted-foreground text-sm">
                        Notifier les utilisateurs des nouveaux messages
                      </p>
                    </div>
                    <Switch id="notify-messages" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-marketing">Marketing & promotions</Label>
                      <p className="text-muted-foreground text-sm">
                        Envoyer des notifications pour les offres spéciales
                      </p>
                    </div>
                    <Switch id="notify-marketing" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="frequency">Fréquence maximale (par jour)</Label>
                <Input 
                  id="frequency" 
                  type="number" 
                  defaultValue="5" 
                  min="0" 
                  max="20" 
                />
                <p className="text-xs text-muted-foreground">
                  Limite le nombre de notifications envoyées à un utilisateur par jour
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimisation du contenu mobile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="adaptive-content">Contenu adaptatif</Label>
                  <p className="text-muted-foreground text-sm">
                    Ajuster automatiquement le contenu en fonction de la taille de l'écran
                  </p>
                </div>
                <Switch id="adaptive-content" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mobile-images">Images optimisées</Label>
                  <p className="text-muted-foreground text-sm">
                    Redimensionner et compresser automatiquement les images pour mobile
                  </p>
                </div>
                <Switch id="mobile-images" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mobile-videos">Vidéos adaptatives</Label>
                  <p className="text-muted-foreground text-sm">
                    Ajuster la qualité des vidéos selon la connexion
                  </p>
                </div>
                <Switch id="mobile-videos" defaultChecked />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="max-image-size">Taille max des images (KB)</Label>
                <Input 
                  id="max-image-size" 
                  type="number" 
                  defaultValue="500" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile-homepage">Page d'accueil mobile personnalisée</Label>
                <select 
                  id="mobile-homepage"
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                >
                  <option value="standard">Identique au site web</option>
                  <option value="simplified">Version simplifiée</option>
                  <option value="dashboard">Tableau de bord utilisateur</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>État de compatibilité des fonctionnalités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Cours et vidéos</span>
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Entièrement compatible</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Paiements et abonnements</span>
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Entièrement compatible</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Éditeur de cours</span>
                  <div className="flex items-center text-yellow-500">
                    <Sliders className="h-4 w-4 mr-1" />
                    <span className="text-sm">Partiellement compatible</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Analytiques avancées</span>
                  <div className="flex items-center text-red-500">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Non compatible</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Certificats et badges</span>
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Entièrement compatible</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimisation de performance</CardTitle>
              <CardDescription>
                Configurez les paramètres de performance pour l'application mobile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-enabled">Mise en cache avancée</Label>
                  <p className="text-muted-foreground text-sm">
                    Améliore les performances en mettant en cache les ressources
                  </p>
                </div>
                <Switch id="cache-enabled" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cache-duration">Durée de mise en cache (heures)</Label>
                <Input 
                  id="cache-duration" 
                  type="number" 
                  defaultValue="24" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lazy-loading">Chargement différé</Label>
                  <p className="text-muted-foreground text-sm">
                    Charge les ressources uniquement lorsqu'elles sont nécessaires
                  </p>
                </div>
                <Switch id="lazy-loading" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="bandwidth-saving">Mode économie de données</Label>
                  <p className="text-muted-foreground text-sm">
                    Réduit la consommation de données sur les réseaux mobiles
                  </p>
                </div>
                <Switch id="bandwidth-saving" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video-quality">Qualité vidéo par défaut</Label>
                <select 
                  id="video-quality"
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                >
                  <option value="auto">Automatique (selon la connexion)</option>
                  <option value="low">Basse (économie de données)</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button variant="outline">
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Mettre à jour les paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rapports de performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Temps de chargement
                    </div>
                    <div className="text-2xl font-bold">1.8s</div>
                    <div className="text-xs text-green-500 mt-1">-12% vs. semaine dernière</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Taux d'erreur
                    </div>
                    <div className="text-2xl font-bold">0.4%</div>
                    <div className="text-xs text-green-500 mt-1">-0.2% vs. semaine dernière</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Utilisation mémoire
                    </div>
                    <div className="text-2xl font-bold">87MB</div>
                    <div className="text-xs text-yellow-500 mt-1">+5% vs. semaine dernière</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMobileSettings;
