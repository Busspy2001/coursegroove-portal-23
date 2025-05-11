
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Download, 
  MessageCircle, 
  Video, 
  Layers, 
  Settings, 
  Users, 
  DollarSign, 
  Search, 
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstructorSupport = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [contactSubject, setContactSubject] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null;
  }

  const handleSendMessage = async () => {
    if (!contactSubject || !contactMessage) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // In a real app, you would send the data to an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé",
        description: "Notre équipe vous répondra dans les plus brefs délais.",
      });
      
      // Reset form
      setContactSubject("");
      setContactMessage("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Resources categories and data
  const resourcesCategories = [
    {
      id: "getting-started",
      title: "Premiers pas",
      resources: [
        {
          id: "creating-course",
          title: "Créer votre premier cours",
          type: "video",
          duration: "8 min",
          url: "#"
        },
        {
          id: "course-structure",
          title: "Structure d'un cours efficace",
          type: "article",
          duration: "5 min de lecture",
          url: "#"
        },
        {
          id: "publishing",
          title: "Processus de publication",
          type: "guide",
          duration: "3 min de lecture",
          url: "#"
        }
      ]
    },
    {
      id: "content-creation",
      title: "Création de contenu",
      resources: [
        {
          id: "video-recording",
          title: "Guide d'enregistrement vidéo",
          type: "guide",
          duration: "12 min de lecture",
          url: "#"
        },
        {
          id: "course-materials",
          title: "Préparer des supports de cours efficaces",
          type: "video",
          duration: "15 min",
          url: "#"
        },
        {
          id: "quiz-creation",
          title: "Créer des quiz et exercices",
          type: "tutorial",
          duration: "10 min",
          url: "#"
        }
      ]
    },
    {
      id: "marketing",
      title: "Marketing & promotions",
      resources: [
        {
          id: "course-description",
          title: "Rédiger une description de cours attrayante",
          type: "article",
          duration: "7 min de lecture",
          url: "#"
        },
        {
          id: "pricing-strategy",
          title: "Stratégie de prix efficace",
          type: "webinar",
          duration: "25 min",
          url: "#"
        },
        {
          id: "promote-course",
          title: "Promouvoir votre cours",
          type: "guide",
          duration: "15 min de lecture",
          url: "#"
        }
      ]
    },
    {
      id: "engagement",
      title: "Engagement des étudiants",
      resources: [
        {
          id: "student-feedback",
          title: "Gérer les avis et commentaires",
          type: "video",
          duration: "12 min",
          url: "#"
        },
        {
          id: "discussion-forums",
          title: "Animer les forums de discussion",
          type: "article",
          duration: "8 min de lecture",
          url: "#"
        },
        {
          id: "student-retention",
          title: "Améliorer la rétention des étudiants",
          type: "webinar",
          duration: "30 min",
          url: "#"
        }
      ]
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "Comment devenir instructeur sur Schoolier ?",
      answer: "Pour devenir instructeur, vous devez d'abord créer un compte, puis cliquer sur 'Devenir instructeur' dans votre tableau de bord. Vous serez guidé à travers le processus de validation qui inclut la vérification de votre identité et de vos compétences. Une fois approuvé, vous pourrez commencer à créer et publier des cours."
    },
    {
      question: "Quels sont les critères de qualité pour les cours ?",
      answer: "Schoolier attend de ses instructeurs qu'ils fournissent un contenu de haute qualité. Cela inclut une vidéo et un audio de bonne qualité, un contenu structuré et pédagogique, des exercices pratiques, et des informations à jour et précises. Tous les cours sont soumis à un processus de validation avant publication."
    },
    {
      question: "Comment sont répartis les revenus ?",
      answer: "Les instructeurs reçoivent 70% des revenus générés par leurs cours, après déduction des frais de transaction. Les paiements sont effectués mensuellement, le 10 de chaque mois, pour les revenus du mois précédent, dès que votre solde atteint 50€."
    },
    {
      question: "Puis-je publier le même cours sur d'autres plateformes ?",
      answer: "Oui, Schoolier ne demande pas d'exclusivité. Vous êtes libre de publier votre contenu sur d'autres plateformes, mais nous vous encourageons à créer une offre spécifique pour notre audience."
    },
    {
      question: "Comment puis-je améliorer la visibilité de mes cours ?",
      answer: "Pour améliorer la visibilité de vos cours, nous vous recommandons d'utiliser des mots-clés pertinents dans votre titre et description, de créer une miniature attrayante, d'encourager les avis positifs, de maintenir un taux élevé d'engagement avec vos étudiants, et d'utiliser les outils de promotion intégrés à la plateforme."
    },
    {
      question: "Quels formats de cours sont acceptés ?",
      answer: "Schoolier accepte principalement les cours en format vidéo, mais vous pouvez compléter avec des documents PDF, des présentations, des quiz, et d'autres ressources pédagogiques. La plateforme prend en charge les vidéos HD, les présentations PowerPoint, les documents PDF, et les quiz interactifs."
    },
    {
      question: "Comment gérer les droits d'auteur et les licences ?",
      answer: "En tant qu'instructeur, vous êtes responsable de vous assurer que tout le contenu que vous utilisez dans vos cours respecte les droits d'auteur. Cela inclut les images, vidéos, musiques, textes et code. Nous vous encourageons à utiliser du contenu sous licence libre ou à créer votre propre contenu."
    },
    {
      question: "Quelles sont les exigences techniques pour les vidéos ?",
      answer: "Les vidéos doivent être en format MP4, avec une résolution minimale de 720p (HD). Nous recommandons un bon éclairage, un son clair sans bruits de fond, et une durée de 2 à 15 minutes par vidéo. La taille maximale par fichier est de 2 GB."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement du centre d'aide...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Ressources & Support</h1>
              <p className="text-muted-foreground">
                Retrouvez tous les guides, documents et accédez à l'aide pour les instructeurs
              </p>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Rechercher dans la base de connaissances..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="resources" className="w-full mb-8">
              <TabsList className="w-full md:w-auto grid grid-cols-4 mb-6">
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 hidden sm:block" />
                  <span>Ressources</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 hidden sm:block" />
                  <span>FAQ</span>
                </TabsTrigger>
                <TabsTrigger value="downloads" className="flex items-center gap-2">
                  <Download className="h-4 w-4 hidden sm:block" />
                  <span>Téléchargements</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 hidden sm:block" />
                  <span>Contact</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="resources">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourcesCategories.map(category => (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>
                          Guides et tutoriels pour vous aider
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.resources.map(resource => (
                            <div key={resource.id} className="flex items-center gap-4">
                              <div className={`rounded-full p-2 flex-shrink-0 ${
                                resource.type === 'video' 
                                  ? 'bg-red-100 text-red-600' 
                                  : resource.type === 'article' 
                                    ? 'bg-blue-100 text-blue-600'
                                    : resource.type === 'guide'
                                      ? 'bg-green-100 text-green-600'
                                      : resource.type === 'webinar'
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'bg-amber-100 text-amber-600'
                              }`}>
                                {resource.type === 'video' ? (
                                  <Video className="h-4 w-4" />
                                ) : resource.type === 'article' ? (
                                  <FileText className="h-4 w-4" />
                                ) : resource.type === 'guide' ? (
                                  <BookOpen className="h-4 w-4" />
                                ) : resource.type === 'webinar' ? (
                                  <Video className="h-4 w-4" />
                                ) : (
                                  <Layers className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <a 
                                  href={resource.url} 
                                  className="font-medium text-sm hover:underline block"
                                >
                                  {resource.title}
                                </a>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {resource.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {resource.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Questions fréquemment posées</CardTitle>
                    <CardDescription>
                      Trouvez rapidement des réponses aux questions courantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqData.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="downloads">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents et ressources téléchargeables</CardTitle>
                    <CardDescription>
                      Téléchargez des modèles, guides et autres ressources utiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Guide de l'instructeur</h3>
                            <p className="text-sm text-muted-foreground">Guide complet pour créer des cours de qualité</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">PDF</Badge>
                              <span className="text-xs text-muted-foreground">5.2 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Modèle de plan de cours</h3>
                            <p className="text-sm text-muted-foreground">Structure recommandée pour vos cours</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">DOCX</Badge>
                              <span className="text-xs text-muted-foreground">1.8 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Checklist qualité vidéo</h3>
                            <p className="text-sm text-muted-foreground">Vérifiez la qualité de vos vidéos</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">PDF</Badge>
                              <span className="text-xs text-muted-foreground">0.8 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Guide de marketing</h3>
                            <p className="text-sm text-muted-foreground">Stratégies pour promouvoir vos cours</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">PDF</Badge>
                              <span className="text-xs text-muted-foreground">3.5 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-3 rounded-full text-red-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Modèle de quiz</h3>
                            <p className="text-sm text-muted-foreground">Template pour créer des quiz efficaces</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">XLSX</Badge>
                              <span className="text-xs text-muted-foreground">1.2 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Guide fiscal</h3>
                            <p className="text-sm text-muted-foreground">Informations fiscales pour instructeurs</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">PDF</Badge>
                              <span className="text-xs text-muted-foreground">2.4 MB</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contacter le support</CardTitle>
                    <CardDescription>
                      Notre équipe est disponible pour vous aider avec toute question ou problème
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="subject">Sujet</Label>
                          <Input
                            id="subject"
                            placeholder="Ex: Question sur la création de cours"
                            className="mt-1.5"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Décrivez votre question ou problème en détail..."
                            className="mt-1.5"
                            rows={6}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                          />
                        </div>
                        <Button 
                          onClick={handleSendMessage}
                          disabled={sending || !contactSubject || !contactMessage}
                          className="w-full"
                        >
                          {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Envoyer le message
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-blue-700 mb-4">Autres moyens de contact</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">instructors@schoolier.com</p>
                            </div>
                            <div>
                              <p className="font-medium">Téléphone</p>
                              <p className="text-sm text-muted-foreground">+33 (0)1 23 45 67 89</p>
                              <p className="text-xs text-muted-foreground">Lun-Ven, 9h-18h CET</p>
                            </div>
                            <div>
                              <p className="font-medium">Chat en direct</p>
                              <p className="text-sm text-muted-foreground">Disponible via le widget en bas à droite</p>
                              <p className="text-xs text-muted-foreground">Temps de réponse moyen: moins de 5 minutes</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Communauté d'instructeurs</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Rejoignez notre communauté d'instructeurs pour partager des conseils, bonnes pratiques et vous entraider.
                          </p>
                          <Button variant="outline">
                            Rejoindre la communauté
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-3 bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Video className="h-8 w-8 text-blue-700" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        Webinar: Comment créer un cours à succès
                      </h3>
                      <p className="text-blue-700 mb-4">
                        Jeudi 15 juin 2025, 14:00 CET — Découvrez les secrets pour créer un cours engageant et à fort impact.
                      </p>
                      <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                        S'inscrire au webinar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorSupport;
