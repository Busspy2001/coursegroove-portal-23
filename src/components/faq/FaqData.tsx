
import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  [key: string]: FaqItem[];
}

// FAQ data moved to its own file for better organization
export const faqData: FaqData = {
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

// Helper function to filter FAQs based on search query
export const getFilteredFAQs = (searchQuery: string, faqData: FaqData) => {
  if (!searchQuery.trim()) return faqData;
  
  const filteredFAQs: FaqData = {};
  
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

export const hasSearchResults = (filteredFAQs: FaqData) => {
  return Object.keys(filteredFAQs).some(key => filteredFAQs[key].length > 0);
};
