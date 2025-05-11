
import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "Est-ce que je dois avoir un diplôme pour enseigner ?",
      answer: "Non, aucun diplôme n'est requis. Ce qui compte, c'est votre expertise pratique et votre capacité à transmettre votre savoir de façon claire et engageante. Nos outils vous aideront à structurer votre contenu."
    },
    {
      question: "Puis-je vendre mes cours ailleurs en même temps ?",
      answer: "Absolument ! Vous gardez tous les droits sur votre contenu et pouvez le distribuer comme bon vous semble. Certains instructeurs utilisent Schoolier comme plateforme principale tout en partageant des extraits gratuits sur YouTube ou d'autres réseaux."
    },
    {
      question: "Combien puis-je gagner ?",
      answer: "Les revenus varient selon plusieurs facteurs : la niche, le prix, la qualité du cours et votre propre promotion. Nos instructeurs les plus actifs gagnent entre 1 000€ et 10 000€ par mois. Notre équipe peut vous conseiller sur la meilleure stratégie de prix."
    },
    {
      question: "Qui détient les droits de mes contenus ?",
      answer: "Vous restez à 100% propriétaire de votre contenu. Schoolier obtient seulement le droit de distribuer votre cours sur sa plateforme tant que vous choisissez de le maintenir en ligne. Vous pouvez retirer votre cours à tout moment."
    },
    {
      question: "Schoolier m'aide-t-il à créer mon cours ?",
      answer: "Oui ! Nous proposons des ressources gratuites, des templates et des guides pour vous aider. Les membres Pro ont également accès à des sessions de coaching et des retours personnalisés sur leurs cours avant publication."
    },
    {
      question: "Comment sont versés les paiements ?",
      answer: "Les paiements sont versés automatiquement le 15 de chaque mois pour toutes les ventes du mois précédent, par virement bancaire ou PayPal, sans montant minimum."
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-schoolier-blue/10 dark:bg-schoolier-blue/5 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-schoolier-blue" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tout ce que vous devez savoir pour démarrer sur Schoolier
          </p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 dark:text-gray-300 pt-2">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Vous avez d'autres questions ?</p>
          <a 
            href="/contact" 
            className="text-schoolier-blue hover:underline font-medium"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
