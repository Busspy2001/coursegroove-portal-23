
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, Book, Video, CreditCard, UserPlus, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // FAQ categories and questions
  const faqData = {
    general: [
      {
        question: "Qu'est-ce que Schoolier ?",
        answer: "Schoolier est une plateforme d'apprentissage en ligne qui connecte des apprenants à des formateurs experts dans divers domaines. Notre mission est de rendre l'éducation de qualité accessible à tous, partout dans le monde."
      },
      {
        question: "Quels types de cours sont proposés sur Schoolier ?",
        answer: "Schoolier propose une large gamme de cours dans des domaines variés comme le développement web, le marketing digital, le design, la finance, le développement personnel, et bien plus encore. Notre catalogue s'enrichit constamment de nouveaux contenus créés par nos formateurs experts."
      },
      {
        question: "Les cours sont-ils disponibles à vie ?",
        answer: "Oui, une fois que vous avez acheté un cours sur Schoolier, vous y avez accès à vie. Vous pouvez y revenir quand vous le souhaitez et bénéficier des mises à jour apportées par le formateur."
      },
      {
        question: "Y a-t-il des cours gratuits ?",
        answer: "Absolument ! Schoolier propose une sélection de cours gratuits pour vous permettre de découvrir notre plateforme et d'acquérir des connaissances sans engagement financier. C'est aussi un bon moyen de découvrir les formateurs avant d'investir dans leurs cours payants."
      }
    ],
    courses: [
      {
        question: "Comment accéder à mes cours achetés ?",
        answer: "Pour accéder à vos cours, connectez-vous à votre compte Schoolier et rendez-vous dans la section 'Mes cours' de votre tableau de bord. Vous y trouverez tous les cours auxquels vous êtes inscrit, qu'ils soient gratuits ou payants."
      },
      {
        question: "Puis-je télécharger les vidéos des cours ?",
        answer: "Pour protéger le travail de nos formateurs, les vidéos de cours ne sont généralement pas téléchargeables. Cependant, certains formateurs peuvent proposer des ressources téléchargeables comme des PDF, des exercices ou des templates dans le cadre de leur cours."
      },
      {
        question: "Comment suivre ma progression dans un cours ?",
        answer: "Chaque cours dispose d'un système de suivi de progression. Les leçons que vous avez terminées sont automatiquement marquées comme 'complétées', et vous pouvez voir votre pourcentage de progression global pour chaque cours dans votre tableau de bord."
      },
      {
        question: "Les cours sont-ils mis à jour régulièrement ?",
        answer: "Nos formateurs sont encouragés à maintenir leurs cours à jour, particulièrement dans des domaines qui évoluent rapidement comme la technologie. Lorsqu'un cours est mis à jour, vous en êtes informé et vous avez automatiquement accès au nouveau contenu sans frais supplémentaires."
      }
    ],
    payment: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Schoolier accepte les principales cartes de crédit (Visa, MasterCard, American Express), ainsi que PayPal. Dans certains pays, nous proposons également des options de paiement locales pour faciliter vos achats."
      },
      {
        question: "Y a-t-il une garantie de remboursement ?",
        answer: "Oui, nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait d'un cours, vous pouvez demander un remboursement complet dans les 30 jours suivant l'achat, à condition de ne pas avoir complété plus de 30% du contenu."
      },
      {
        question: "Puis-je acheter un cours comme cadeau ?",
        answer: "Oui, vous pouvez offrir n'importe quel cours de la plateforme. Lors du paiement, sélectionnez l'option 'Offrir ce cours' et entrez l'adresse e-mail du destinataire ainsi qu'un message personnalisé."
      },
      {
        question: "Proposez-vous des abonnements ?",
        answer: "Actuellement, Schoolier fonctionne principalement avec un modèle d'achat à l'unité pour les cours, mais nous proposons également des formules d'abonnement premium donnant accès à une sélection de cours et à des fonctionnalités exclusives."
      }
    ],
    instructors: [
      {
        question: "Comment devenir formateur sur Schoolier ?",
        answer: "Pour devenir formateur, rendez-vous sur la page 'Devenir formateur' et remplissez le formulaire de candidature. Notre équipe examinera votre profil et vos compétences, puis vous guidera dans le processus de création de votre premier cours."
      },
      {
        question: "Quelle est la commission prélevée par Schoolier ?",
        answer: "Les formateurs conservent jusqu'à 70% des revenus générés par leurs cours. Le pourcentage exact dépend de plusieurs facteurs, notamment la façon dont l'étudiant a découvert le cours (recherche sur la plateforme, lien direct du formateur, etc.)."
      },
      {
        question: "Quels outils sont disponibles pour créer mes cours ?",
        answer: "Schoolier propose une suite complète d'outils pour créer vos cours : un éditeur de contenu intuitif, un système d'upload de vidéos HD, des outils pour créer des quiz et des exercices, ainsi que des fonctionnalités pour interagir avec vos étudiants."
      },
      {
        question: "À quelle fréquence suis-je payé pour mes ventes de cours ?",
        answer: "Les paiements aux formateurs sont effectués mensuellement, avec un délai de 30 jours après la fin du mois pour tenir compte de la période de garantie de remboursement. Le seuil minimum de paiement est de 50€."
      }
    ],
    technical: [
      {
        question: "Quels sont les prérequis techniques pour suivre un cours ?",
        answer: "Pour une expérience optimale, nous recommandons d'utiliser un navigateur récent (Chrome, Firefox, Safari ou Edge), une connexion Internet stable, et des haut-parleurs ou un casque pour le contenu audio. Pour certains cours spécifiques, des prérequis supplémentaires peuvent être mentionnés dans la description du cours."
      },
      {
        question: "L'application mobile est-elle disponible ?",
        answer: "Oui, Schoolier dispose d'applications mobiles pour iOS et Android, vous permettant d'accéder à vos cours et de les suivre même hors ligne après les avoir téléchargés. Recherchez 'Schoolier' sur l'App Store ou Google Play pour les installer."
      },
      {
        question: "Comment résoudre les problèmes de lecture vidéo ?",
        answer: "Si vous rencontrez des problèmes de lecture vidéo, essayez les solutions suivantes : rafraîchissez la page, vérifiez votre connexion Internet, essayez un autre navigateur, ou réduisez la qualité vidéo. Si le problème persiste, contactez notre support technique."
      },
      {
        question: "Les cours sont-ils accessibles hors ligne ?",
        answer: "Sur nos applications mobiles, vous pouvez télécharger les leçons pour les visionner hors ligne. Cette fonctionnalité n'est pas disponible sur la version web, qui nécessite une connexion Internet."
      }
    ]
  };

  // Filter FAQ based on search query
  const getFilteredFAQs = () => {
    if (!searchQuery.trim()) return faqData;
    
    const filteredFAQs = {};
    
    Object.keys(faqData).forEach(category => {
      const filteredItems = faqData[category].filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredItems.length > 0) {
        filteredFAQs[category] = filteredItems;
      }
    });
    
    return filteredFAQs;
  };
  
  const filteredFAQs = getFilteredFAQs();
  const hasResults = Object.keys(filteredFAQs).some(key => filteredFAQs[key].length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-schoolier-blue mb-6">Centre d'aide</h1>
            <p className="subheading mb-8">
              Trouvez rapidement des réponses à vos questions pour tirer le meilleur parti de votre expérience Schoolier
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une question, un sujet..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 container px-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { icon: <HelpCircle className="h-6 w-6" />, label: "FAQ Générale" },
            { icon: <Book className="h-6 w-6" />, label: "Les cours" },
            { icon: <CreditCard className="h-6 w-6" />, label: "Paiements" },
            { icon: <UserPlus className="h-6 w-6" />, label: "Formateurs" },
            { icon: <Video className="h-6 w-6" />, label: "Technique" },
            { icon: <Mail className="h-6 w-6" />, label: "Contact" }
          ].map((item, index) => (
            <Card key={index} className="cursor-pointer card-hover">
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-2 text-schoolier-blue">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-10 container px-6 mx-auto mb-10">
        {hasResults ? (
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="courses">Les cours</TabsTrigger>
              <TabsTrigger value="payment">Paiements</TabsTrigger>
              <TabsTrigger value="instructors">Formateurs</TabsTrigger>
              <TabsTrigger value="technical">Technique</TabsTrigger>
            </TabsList>

            {Object.keys(filteredFAQs).map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs[category].map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Nous n'avons pas trouvé de réponse correspondant à "{searchQuery}". Essayez une autre recherche ou contactez-nous.
            </p>
            <Button onClick={() => setSearchQuery("")} variant="outline">Réinitialiser la recherche</Button>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-3 mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="subheading mb-8">
              Notre équipe de support est disponible pour répondre à toutes vos questions
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/contact")} 
              className="bg-schoolier-teal hover:bg-schoolier-teal/90"
            >
              Contacter le support
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Temps de réponse moyen : moins de 24 heures
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
