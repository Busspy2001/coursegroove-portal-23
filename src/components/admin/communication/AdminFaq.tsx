
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileQuestion, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Settings
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminFaq = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  const faqCategories = [
    { id: "general", name: "Général", count: 12 },
    { id: "account", name: "Compte", count: 8 },
    { id: "courses", name: "Cours", count: 15 },
    { id: "payments", name: "Paiements", count: 10 },
    { id: "certificates", name: "Certifications", count: 6 },
    { id: "instructors", name: "Instructeurs", count: 9 }
  ];
  
  const faqItems = [
    { 
      id: 1, 
      question: "Comment puis-je réinitialiser mon mot de passe ?", 
      category: "account", 
      views: 8450, 
      lastUpdated: "2025-05-10",
      priority: "high"
    },
    { 
      id: 2, 
      question: "Comment obtenir un certificat ?", 
      category: "certificates", 
      views: 7230, 
      lastUpdated: "2025-05-08",
      priority: "medium"
    },
    { 
      id: 3, 
      question: "Comment devenir instructeur ?", 
      category: "instructors", 
      views: 6540, 
      lastUpdated: "2025-05-05",
      priority: "high"
    },
    { 
      id: 4, 
      question: "Comment annuler mon abonnement ?", 
      category: "account", 
      views: 5890, 
      lastUpdated: "2025-05-01",
      priority: "medium"
    },
    { 
      id: 5, 
      question: "Comment puis-je suivre ma progression ?", 
      category: "courses", 
      views: 4780, 
      lastUpdated: "2025-04-28",
      priority: "low"
    },
    { 
      id: 6, 
      question: "Quels modes de paiement acceptez-vous ?", 
      category: "payments", 
      views: 6120, 
      lastUpdated: "2025-05-06",
      priority: "high"
    }
  ];

  const renderPriorityBadge = (priority: string) => {
    const badgeClasses = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    };
    
    const priorityLabel = {
      high: "Élevée",
      medium: "Moyenne",
      low: "Faible"
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${badgeClasses[priority as keyof typeof badgeClasses]}`}>
        {priorityLabel[priority as keyof typeof priorityLabel]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">FAQ & Base de connaissances</h2>
          <p className="text-muted-foreground">Gérez les questions fréquentes et articles d'aide</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un article
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileQuestion className="mr-2 h-5 w-5" />
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("all")}
                >
                  <span>Tous les articles</span>
                  <span className="ml-auto bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                    {faqItems.length}
                  </span>
                </Button>
                
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeTab === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(category.id)}
                  >
                    <span>{category.name}</span>
                    <span className="ml-auto bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des articles..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Filtrer</Button>
              <Button variant="outline">Trier</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Articles de FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead>Dernière mise à jour</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.question}</TableCell>
                      <TableCell>{renderPriorityBadge(item.priority)}</TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Priorité haute</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ArrowDown className="h-4 w-4" />
                            <span className="sr-only">Priorité basse</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ajouter un nouvel article</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="question" className="text-sm font-medium">Question</label>
                    <Input id="question" placeholder="Saisissez la question..." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                    <select id="category" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                      {faqCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="answer" className="text-sm font-medium">Réponse</label>
                  <Textarea id="answer" placeholder="Rédigez la réponse..." rows={6} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">Priorité</label>
                    <select id="priority" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                      <option value="high">Élevée</option>
                      <option value="medium">Moyenne</option>
                      <option value="low">Faible</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Annuler</Button>
                  <Button>Enregistrer</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminFaq;
