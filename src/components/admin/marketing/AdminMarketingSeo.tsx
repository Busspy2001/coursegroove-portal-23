
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Save, ArrowRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminMarketingSeo = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">SEO & Visibilité</h2>
          <p className="text-muted-foreground">Optimisez le référencement et la visibilité de la plateforme</p>
        </div>
      </div>
      
      <Tabs defaultValue="seo" className="space-y-4">
        <TabsList>
          <TabsTrigger value="seo">SEO Général</TabsTrigger>
          <TabsTrigger value="keywords">Mots-clés</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schema">Schema.org</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-schoolier-blue" />
                Configuration générale du SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Titre du site</Label>
                  <Input id="site-title" defaultValue="Schoolier - Formez-vous en ligne avec des experts" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Input id="meta-description" defaultValue="Apprenez à votre rythme avec Schoolier, la plateforme d'apprentissage en ligne qui vous connecte avec des experts dans votre domaine. Développez vos compétences et boostez votre carrière." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canonical-url">URL Canonique</Label>
                  <Input id="canonical-url" defaultValue="https://www.schoolier.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Robots.txt</Label>
                  <div className="relative">
                    <textarea 
                      className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={`User-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: Twitterbot\nAllow: /\n\nUser-agent: facebookexternalhit\nAllow: /\n\nUser-agent: *\nAllow: /`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les changements
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statut SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Sitemap.xml</span>
                  </div>
                  <Button variant="link" size="sm" className="text-schoolier-blue">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Google Search Console</span>
                  </div>
                  <Button variant="link" size="sm" className="text-schoolier-blue">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Balises méta - 8 pages à optimiser</span>
                  </div>
                  <Button variant="link" size="sm" className="text-schoolier-blue">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Corriger
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Robots.txt</span>
                  </div>
                  <Button variant="link" size="sm" className="text-schoolier-blue">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des mots-clés</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Module d'analyse des mots-clés en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-schoolier-blue" />
                Trafic organique
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Graphique d'analytics en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Schema.org</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Outil de configuration schema.org en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMarketingSeo;
