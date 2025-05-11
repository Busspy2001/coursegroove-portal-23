
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/business";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface PricingSectionProps {
  onRequestDemo: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onRequestDemo }) => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Plans & Tarifs
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Des solutions adaptées à toutes les tailles d'entreprise
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="annual">Annuel (économisez 20%)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard 
                  tier="Startup"
                  price="25€"
                  period="par utilisateur / mois"
                  description="Idéal pour les petites équipes"
                  features={[
                    "Jusqu'à 25 utilisateurs",
                    "Accès à 200+ cours",
                    "Rapports basiques",
                    "Support par email"
                  ]}
                  cta="Démarrer"
                  popular={false}
                  onRequestDemo={onRequestDemo}
                />
                <PricingCard 
                  tier="Business"
                  price="45€"
                  period="par utilisateur / mois"
                  description="Pour les entreprises en croissance"
                  features={[
                    "Utilisateurs illimités",
                    "Accès à tous les cours",
                    "Rapports avancés",
                    "Intégrations API",
                    "Support prioritaire"
                  ]}
                  cta="Demander une démo"
                  popular={true}
                  onRequestDemo={onRequestDemo}
                />
                <PricingCard 
                  tier="Enterprise"
                  price="Sur mesure"
                  period=""
                  description="Pour les grandes organisations"
                  features={[
                    "Déploiement dédié",
                    "Contenu personnalisé",
                    "SSO & sécurité avancée",
                    "Account manager dédié",
                    "SLA garanti"
                  ]}
                  cta="Contacter les ventes"
                  popular={false}
                  onRequestDemo={onRequestDemo}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="annual" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard 
                  tier="Startup"
                  price="20€"
                  period="par utilisateur / mois"
                  description="Idéal pour les petites équipes"
                  features={[
                    "Jusqu'à 25 utilisateurs",
                    "Accès à 200+ cours",
                    "Rapports basiques",
                    "Support par email"
                  ]}
                  cta="Démarrer"
                  popular={false}
                  onRequestDemo={onRequestDemo}
                />
                <PricingCard 
                  tier="Business"
                  price="36€"
                  period="par utilisateur / mois"
                  description="Pour les entreprises en croissance"
                  features={[
                    "Utilisateurs illimités",
                    "Accès à tous les cours",
                    "Rapports avancés",
                    "Intégrations API",
                    "Support prioritaire"
                  ]}
                  cta="Demander une démo"
                  popular={true}
                  onRequestDemo={onRequestDemo}
                />
                <PricingCard 
                  tier="Enterprise"
                  price="Sur mesure"
                  period=""
                  description="Pour les grandes organisations"
                  features={[
                    "Déploiement dédié",
                    "Contenu personnalisé",
                    "SSO & sécurité avancée",
                    "Account manager dédié",
                    "SLA garanti"
                  ]}
                  cta="Contacter les ventes"
                  popular={false}
                  onRequestDemo={onRequestDemo}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
