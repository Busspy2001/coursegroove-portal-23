
import React from "react";
import { motion } from "framer-motion";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Tout ce que vous devez savoir pour prendre votre décision
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                Puis-je intégrer mes propres contenus ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, Schoolier Business vous permet d'uploader vos propres contenus de formation
                (vidéos, PDF, présentations) et de les intégrer dans des parcours personnalisés.
                Vous pouvez également mixer vos contenus avec notre bibliothèque de cours existante.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                Quel est l'engagement minimal ?
              </AccordionTrigger>
              <AccordionContent>
                Pour les plans Startup et Business, nous proposons des engagements mensuels ou annuels.
                Les plans annuels bénéficient d'une réduction de 20%. Pour le plan Enterprise,
                les conditions sont personnalisées selon vos besoins.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Est-ce que mes données sont sécurisées ?
              </AccordionTrigger>
              <AccordionContent>
                Absolument. Nous sommes conformes RGPD et utilisons un chiffrement de bout en bout.
                Toutes les données sont hébergées sur des serveurs sécurisés en Europe,
                avec des sauvegardes régulières et un plan de continuité d'activité robuste.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                Avez-vous un programme pour les PME ?
              </AccordionTrigger>
              <AccordionContent>
                Notre plan Startup est spécifiquement conçu pour les PME et les petites équipes,
                avec des tarifs adaptés et toutes les fonctionnalités essentielles.
                Nous proposons également un accompagnement spécifique pour les PME.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                Comment fonctionne l'intégration avec nos outils existants ?
              </AccordionTrigger>
              <AccordionContent>
                Schoolier Business propose des API et des connecteurs prêts à l'emploi
                pour les principaux outils d'entreprise (Slack, MS Teams, Workday, SIRH).
                Notre équipe technique peut également développer des connecteurs sur mesure si nécessaire.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
