
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Network, 
  Key, 
  Lock, 
  RefreshCcw, 
  Plus, 
  Trash2, 
  Copy, 
  FileCode,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminApiSettings = () => {
  const [showSecret, setShowSecret] = React.useState(false);

  const apiKeys = [
    {
      id: 1,
      name: "Production API",
      key: "sk_prod_24f3c7e1bda94b",
      created: "2025-03-15",
      lastUsed: "2025-05-13",
      status: "active"
    },
    {
      id: 2,
      name: "Développement API",
      key: "sk_dev_a8d92f3b5c7e1d",
      created: "2025-04-10",
      lastUsed: "2025-05-12",
      status: "active"
    },
    {
      id: 3,
      name: "Application Mobile",
      key: "sk_mob_7e5d9f23a4c6b1",
      created: "2025-04-22",
      lastUsed: "2025-05-13",
      status: "active"
    },
    {
      id: 4,
      name: "API Test",
      key: "sk_test_b3c5d8e2f4a9c7",
      created: "2025-05-05",
      lastUsed: "2025-05-10",
      status: "active"
    },
    {
      id: 5,
      name: "Ancienne API",
      key: "sk_old_9f7e2d5c3b8a1",
      created: "2024-11-20",
      lastUsed: "2025-02-15",
      status: "inactive"
    }
  ];

  const webhooks = [
    {
      id: 1,
      url: "https://example.com/hooks/payment-success",
      event: "payment.success",
      created: "2025-04-10",
      lastTriggered: "2025-05-12",
      status: "active"
    },
    {
      id: 2,
      url: "https://example.com/hooks/user-signup",
      event: "user.created",
      created: "2025-04-15",
      lastTriggered: "2025-05-13",
      status: "active"
    },
    {
      id: 3,
      url: "https://backup-server.com/schoolier-webhook",
      event: "course.published",
      created: "2025-04-20",
      lastTriggered: "2025-05-08",
      status: "active"
    },
    {
      id: 4,
      url: "https://legacy-system.com/incoming",
      event: "certificate.issued",
      created: "2025-03-01",
      lastTriggered: "2025-05-01",
      status: "inactive"
    }
  ];

  const renderStatusBadge = (status: string) => {
    const badgeType = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      revoked: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    };
    
    return (
      <Badge className={`${badgeType[status as keyof typeof badgeType]}`}>
        {status === 'active' ? 'Actif' : status === 'inactive' ? 'Inactif' : 'Révoqué'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">API & Webhooks</h2>
          <p className="text-muted-foreground">Gérez l'accès via API et les intégrations</p>
        </div>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api-keys" className="flex items-center">
            <Key className="mr-2 h-4 w-4" />
            Clés API
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center">
            <Network className="mr-2 h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center">
            <FileCode className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Clés API
              </CardTitle>
              <CardDescription>
                Gérez les clés d'accès pour intégrer des applications externes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle clé API
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Clé</TableHead>
                      <TableHead>Créée le</TableHead>
                      <TableHead>Dernière utilisation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-mono text-sm truncate max-w-[180px]">
                              {showSecret ? apiKey.key : apiKey.key.substring(0, 8) + "••••••••••••"}
                            </span>
                            <Button variant="ghost" size="sm" className="ml-2 h-7 w-7 p-0" onClick={() => setShowSecret(!showSecret)}>
                              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{apiKey.created}</TableCell>
                        <TableCell>{apiKey.lastUsed}</TableCell>
                        <TableCell>{renderStatusBadge(apiKey.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <RefreshCcw className="h-4 w-4" />
                              <span className="sr-only">Régénérer</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Révoquer</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle clé API</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Nom de la clé</Label>
                  <Input id="key-name" placeholder="ex: API Production" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="key-scope">Portée</Label>
                  <select
                    id="key-scope"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="read">Lecture seule</option>
                    <option value="write">Lecture et écriture</option>
                    <option value="admin">Administration complète</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="key-expiration">Expiration</Label>
                  <select
                    id="key-expiration"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="never">Jamais</option>
                    <option value="30days">30 jours</option>
                    <option value="90days">90 jours</option>
                    <option value="1year">1 an</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="key-restricted">Restreindre par IP</Label>
                    <p className="text-muted-foreground text-sm">
                      Limiter l'usage de la clé à des adresses IP spécifiques
                    </p>
                  </div>
                  <Switch id="key-restricted" />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Annuler</Button>
                  <Button>Générer la clé</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Webhooks configurés
              </CardTitle>
              <CardDescription>
                Gérez vos webhooks pour automatiser les intégrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau webhook
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Créé le</TableHead>
                      <TableHead>Dernière exécution</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {webhook.url}
                        </TableCell>
                        <TableCell>{webhook.event}</TableCell>
                        <TableCell>{webhook.created}</TableCell>
                        <TableCell>{webhook.lastTriggered}</TableCell>
                        <TableCell>{renderStatusBadge(webhook.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" title="Tester">
                              <RefreshCcw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" title="Supprimer">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ajouter un nouveau webhook</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL du webhook</Label>
                  <Input id="webhook-url" placeholder="https://votre-service.com/webhook" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-event">Événement</Label>
                  <select
                    id="webhook-event"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="user.created">user.created</option>
                    <option value="user.updated">user.updated</option>
                    <option value="course.published">course.published</option>
                    <option value="payment.success">payment.success</option>
                    <option value="payment.failed">payment.failed</option>
                    <option value="certificate.issued">certificate.issued</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-description">Description (optionnelle)</Label>
                  <Textarea id="webhook-description" placeholder="Description de ce webhook..." />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="webhook-active">Activer le webhook</Label>
                    <p className="text-muted-foreground text-sm">
                      Le webhook sera immédiatement opérationnel
                    </p>
                  </div>
                  <Switch id="webhook-active" defaultChecked />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Annuler</Button>
                  <Button>Créer le webhook</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCode className="mr-2 h-5 w-5" />
                Documentation de l'API
              </CardTitle>
              <CardDescription>
                Ressources pour l'intégration avec l'API de Schoolier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">Documentation interactive</h3>
                  <p className="text-muted-foreground mb-4">
                    Explorez notre API avec notre documentation interactive OpenAPI Swagger.
                  </p>
                  <div className="flex space-x-2">
                    <Button>
                      Ouvrir la documentation
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger OpenAPI spec
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <FileCode className="h-12 w-12 mb-2 text-blue-500" />
                        <h3 className="font-medium mb-1">Guides de démarrage</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Commencez avec l'API Schoolier
                        </p>
                        <Button variant="outline" size="sm">Voir les guides</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Code className="h-12 w-12 mb-2 text-purple-500" />
                        <h3 className="font-medium mb-1">Exemples de code</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Exemples dans différents langages
                        </p>
                        <Button variant="outline" size="sm">Voir les exemples</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <MessageSquare className="h-12 w-12 mb-2 text-green-500" />
                        <h3 className="font-medium mb-1">Forum développeurs</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Assistance communautaire
                        </p>
                        <Button variant="outline" size="sm">Rejoindre le forum</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">SDKs officiels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-[#F7DF1E] flex items-center justify-center mr-3">
                          <span className="font-bold text-black">JS</span>
                        </div>
                        <div>
                          <p className="font-medium">JavaScript / TypeScript</p>
                          <p className="text-xs text-muted-foreground">v3.4.2 - Mise à jour il y a 2 jours</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        npm install
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mr-3">
                          <span className="font-bold text-white">P</span>
                        </div>
                        <div>
                          <p className="font-medium">Python</p>
                          <p className="text-xs text-muted-foreground">v2.1.0 - Mise à jour il y a 1 semaine</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        pip install
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center mr-3">
                          <span className="font-bold text-white">R</span>
                        </div>
                        <div>
                          <p className="font-medium">Ruby</p>
                          <p className="text-xs text-muted-foreground">v1.8.5 - Mise à jour il y a 3 semaines</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        gem install
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Paramètres de sécurité API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-enabled">API active</Label>
                  <p className="text-muted-foreground text-sm">
                    Activer/désactiver l'ensemble de l'API
                  </p>
                </div>
                <Switch id="api-enabled" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rate-limiting">Limitation de débit</Label>
                  <p className="text-muted-foreground text-sm">
                    Limiter le nombre de requêtes par minute
                  </p>
                </div>
                <Switch id="rate-limiting" defaultChecked />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Requêtes par minute</Label>
                  <Input id="rate-limit" type="number" defaultValue="60" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="burst-limit">Limite de pics</Label>
                  <Input id="burst-limit" type="number" defaultValue="100" />
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Journaux d'accès API</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="access-logs">Journalisation active</Label>
                    <p className="text-muted-foreground text-sm">
                      Enregistrer toutes les requêtes API
                    </p>
                  </div>
                  <Switch id="access-logs" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="log-retention">Conservation des journaux (jours)</Label>
                  <Input id="log-retention" type="number" defaultValue="90" />
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Alertes de sécurité</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="unusual-activity">Activité inhabituelle</Label>
                    <p className="text-muted-foreground text-sm">
                      Alertes en cas d'activité suspecte
                    </p>
                  </div>
                  <Switch id="unusual-activity" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="brute-force">Protection brute force</Label>
                    <p className="text-muted-foreground text-sm">
                      Bloquer les tentatives répétées d'authentification
                    </p>
                  </div>
                  <Switch id="brute-force" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer les paramètres</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-600 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Zone de danger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                    <div>
                      <h3 className="font-medium text-amber-800 dark:text-amber-300">Attention</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Les actions ci-dessous sont potentiellement dangereuses et peuvent affecter le fonctionnement de vos intégrations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Révoquer toutes les clés API
                  </Button>
                  
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Réinitialiser les webhooks
                  </Button>
                  
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Lock className="mr-2 h-4 w-4" />
                    Désactiver l'API (urgence)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminApiSettings;

function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" x2="12" y1="15" y2="3"></line>
    </svg>
  );
}
