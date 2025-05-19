import React, { useEffect } from "react";
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
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [contactSubject, setContactSubject] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  // Redirect if not authenticated or not an instructor
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!hasRole("instructor")) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, hasRole, navigate]);

  if (!isAuthenticated || !hasRole("instructor")) {
    return null;
  }

  const handleContactSupport = async () => {
    if (!contactSubject.trim() || !contactMessage.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Reset form
      setContactSubject("");
      setContactMessage("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleDownload = (resourceName: string) => {
    // In a real app, this would download the file
    toast({
      title: `Téléchargement de "${resourceName}"`,
      description: "Le téléchargement va commencer dans quelques secondes.",
    });
  };

  const resources = [
    {
      title: "Guide de création de cours",
      description: "Un guide complet pour créer des cours de qualité sur Schoolier",
      type: "PDF",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      category: "guides",
      featured: true
    },
    {
      title: "Techniques d'engagement des étudiants",
      description: "Apprenez à maintenir vos étudiants engagés et motivés",
      type: "PDF",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      category: "guides"
    },
    {
      title: "Optimisation de vos miniatures",
      description: "Comment créer des miniatures qui attirent plus d'inscriptions",
      type: "Video",
      icon: <Video className="h-6 w-6 text-red-600" />,
      category: "tutoriels",
      featured: true
    },
    {
      title: "Modèles de plan de cours",
      description: "Des templates pour structurer votre contenu efficacement",
      type: "ZIP",
      icon: <Layers className="h-6 w-6 text-green-600" />,
      category: "templates",
      featured: true
    },
    {
      title: "Stratégies de prix pour maximiser les revenus",
      description: "Guide pour définir le prix optimal pour vos cours",
      type: "PDF",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      category: "guides"
    },
    {
      title: "Configuration audio et vidéo",
      description: "Comment créer des vidéos professionnelles avec un budget limité",
      type: "Video",
      icon: <Video className="h-6 w-6 text-red-600" />,
      category: "tutoriels"
    },
    {
      title: "Modèles PowerPoint pour cours",
      description: "Des présentations professionnelles pour vos leçons",
      type: "ZIP",
      icon: <Layers className="h-6 w-6 text-green-600" />,
      category: "templates"
    },
    {
      title: "Répondre aux avis négatifs",
      description: "Comment gérer les critiques de manière constructive",
      type: "PDF",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      category: "guides"
    }
  ];

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqItems = [
    {
      question: "Comment puis-je retirer mes revenus ?",
      answer: "Les revenus sont automatiquement transférés vers votre compte bancaire ou PayPal (selon vos préférences dans les paramètres) le 10 de chaque mois, à condition que votre solde dépasse 50€. Si vous avez des questions spécifiques concernant un paiement, veuillez contacter notre équipe de support financier."
    },
    {
      question: "Puis-je modifier un cours après sa publication ?",
      answer: "Oui, vous pouvez modifier votre cours à tout moment. Pour ce faire, accédez à votre tableau de bord, sélectionnez le cours que vous souhaitez modifier, puis cliquez sur le bouton 'Éditer'. Notez que les modifications majeures du contenu peuvent nécessiter une notification aux étudiants déjà inscrits."
    },
    {
      question: "Quelle est la commission prélevée par Schoolier ?",
      answer: "Schoolier prélève une commission de 20% sur les ventes de cours. Par exemple, si votre cours est vendu 100€, vous recevrez 80€. Cette commission couvre les frais de traitement des paiements, l'hébergement des vidéos, le marketing de la plateforme et le support client."
    },
    {
      question: "Comment puis-je promouvoir mon cours ?",
      answer: "Vous pouvez promouvoir votre cours de plusieurs façons : partager sur vos réseaux sociaux, créer un lien d'affiliation pour vos abonnés, utiliser notre outil de coupons de réduction, ou investir dans nos options de promotion premium qui mettent en avant votre cours dans les résultats de recherche et sur la page d'accueil."
    },
    {
      question: "Puis-je offrir des cours gratuits ?",
      answer: "Oui, vous pouvez proposer des cours entièrement gratuits ou créer des cours 'freemium' avec quelques leçons gratuites et le reste du contenu payant. Les cours gratuits peuvent être un excellent moyen d'attirer de nouveaux étudiants vers vos cours payants."
    },
    {
      question: "Comment répondre aux questions des étudiants ?",
      answer: "Vous recevrez des notifications par email lorsqu'un étudiant pose une question. Vous pouvez y répondre directement depuis la section 'Messages' de votre tableau de bord ou depuis la page du cours concerné. Nous recommandons de répondre dans un délai de 24 à 48 heures pour maintenir un bon niveau de satisfaction."
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement des ressources...</p>
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
                Accédez à des ressources utiles et obtenez de l'aide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Centre de ressources</CardTitle>
                    <div className="relative w-full md:w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Rechercher des ressources..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">Toutes</TabsTrigger>
                      <TabsTrigger value="guides">Guides</TabsTrigger>
                      <TabsTrigger value="tutoriels">Tutoriels</TabsTrigger>
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredResources.map((resource, index) => (
                          <div 
                            key={index} 
                            className={`
                              p-4 border rounded-lg hover:border-schoolier-blue 
                              hover:bg-blue-50 transition-colors cursor-pointer
                              ${resource.featured ? 'border-blue-200 bg-blue-50' : ''}
                            `}
                            onClick={() => handleDownload(resource.title)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-white p-3 rounded-lg border">
                                {resource.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{resource.title}</h3>
                                  {resource.featured && (
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                                      Populaire
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {resource.description}
                                </p>
                              </div>
                              <div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="guides">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredResources
                          .filter(resource => resource.category === "guides")
                          .map((resource, index) => (
                            <div 
                              key={index} 
                              className={`
                                p-4 border rounded-lg hover:border-schoolier-blue 
                                hover:bg-blue-50 transition-colors cursor-pointer
                                ${resource.featured ? 'border-blue-200 bg-blue-50' : ''}
                              `}
                              onClick={() => handleDownload(resource.title)}
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-white p-3 rounded-lg border">
                                  {resource.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{resource.title}</h3>
                                    {resource.featured && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                                        Populaire
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {resource.description}
                                  </p>
                                </div>
                                <div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tutoriels">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredResources
                          .filter(resource => resource.category === "tutoriels")
                          .map((resource, index) => (
                            <div 
                              key={index} 
                              className={`
                                p-4 border rounded-lg hover:border-schoolier-blue 
                                hover:bg-blue-50 transition-colors cursor-pointer
                                ${resource.featured ? 'border-blue-200 bg-blue-50' : ''}
                              `}
                              onClick={() => handleDownload(resource.title)}
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-white p-3 rounded-lg border">
                                  {resource.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{resource.title}</h3>
                                    {resource.featured && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                                        Populaire
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {resource.description}
                                  </p>
                                </div>
                                <div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="templates">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredResources
                          .filter(resource => resource.category === "templates")
                          .map((resource, index) => (
                            <div 
                              key={index} 
                              className={`
                                p-4 border rounded-lg hover:border-schoolier-blue 
                                hover:bg-blue-50 transition-colors cursor-pointer
                                ${resource.featured ? 'border-blue-200 bg-blue-50' : ''}
                              `}
                              onClick={() => handleDownload(resource.title)}
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-white p-3 rounded-lg border">
                                  {resource.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{resource.title}</h3>
                                    {resource.featured && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                                        Populaire
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {resource.description}
                                  </p>
                                </div>
                                <div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contactez le support</CardTitle>
                  <CardDescription>
                    Notre équipe est à votre disposition pour vous aider
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="contact-subject">Sujet</Label>
                      <Input 
                        id="contact-subject" 
                        placeholder="Ex: Question sur les paiements" 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea 
                        id="contact-message" 
                        rows={5} 
                        placeholder="Décrivez votre problème ou question..." 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Délai de réponse estimé: </span>
                        <span className="font-medium">24h</span>
                      </div>
                      <Button 
                        onClick={handleContactSupport} 
                        disabled={sending}
                        className="min-w-[120px]"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Envoi...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Envoyer
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3">Besoin d'aide rapide ?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                        <Settings className="h-5 w-5 mb-1" />
                        <span className="text-xs">Guide technique</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                        <Users className="h-5 w-5 mb-1" />
                        <span className="text-xs">Forum instructeurs</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                        <DollarSign className="h-5 w-5 mb-1" />
                        <span className="text-xs">Aide paiements</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                        <HelpCircle className="h-5 w-5 mb-1" />
                        <span className="text-xs">FAQ</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-10">
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
                <CardDescription>
                  Retrouvez les réponses aux questions les plus courantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-2">Formation pour instructeurs</h3>
                    <p className="text-muted-foreground mb-4">
                      Développez vos compétences pédagogiques et apprenez à créer des cours engageants qui se vendent bien.
                      Notre programme de formation pour instructeurs couvre toutes les étapes de la création à la promotion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-blue-700 hover:bg-blue-800">
                        S'inscrire au programme
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="border-blue-300 bg-blue-100 hover:bg-blue-200">
                            Voir la démo
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Formation pour instructeurs Schoolier
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md mb-4">
                                <Video className="h-16 w-16 text-gray-400" />
                              </div>
                              <p>
                                Notre formation vous guide à travers toutes les étapes pour créer des cours à succès 
                                sur Schoolier, de la conception à la promotion.
                              </p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Fermer</AlertDialogCancel>
                            <AlertDialogAction>S'inscrire maintenant</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorSupport;
