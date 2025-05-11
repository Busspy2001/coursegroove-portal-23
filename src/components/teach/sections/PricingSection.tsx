
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface PricingSectionProps {
  onStartFree: () => void;
  onChoosePro: () => void;
  onContactSales: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  onStartFree,
  onChoosePro,
  onContactSales
}) => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Combien ça coûte ?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une tarification simple et transparente, sans surprise
          </p>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Free Plan */}
            <div className="p-8 bg-gray-50 dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-extrabold">GRATUIT</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Idéal pour commencer et tester la plateforme
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Création de cours illimitée</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Outils pédagogiques essentiels</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Commission Schoolier de 15%</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Support par email</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onStartFree}>
                Commencer gratuitement
              </Button>
            </div>
            
            {/* Premium Plan */}
            <div className="p-8 bg-schoolier-blue/5 dark:bg-schoolier-blue/10 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 relative">
              <div className="absolute top-0 right-0 bg-schoolier-blue text-white px-3 py-1 text-sm font-medium">
                Populaire
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-extrabold">29€</span>
                <span className="ml-1 text-gray-500">/mois</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Pour les instructeurs engagés qui veulent se démarquer
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Tout ce qui est inclus dans Standard</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span><strong>Commission réduite à 10%</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Page personnalisée</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Meilleur placement dans les recherches</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
              <Button className="w-full bg-schoolier-blue hover:bg-schoolier-dark-blue" onClick={onChoosePro}>
                Choisir Pro
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-extrabold">Sur mesure</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Pour les organisations avec des besoins spécifiques
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Tout ce qui est inclus dans Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span><strong>Commission négociable</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Intégrations API personnalisées</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Manager de compte dédié</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-schoolier-teal mr-2 flex-shrink-0" />
                  <span>Fonctionnalités sur mesure</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onContactSales}>
                Contacter les ventes
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Pas de frais cachés. Annulez à tout moment. <br />
            Les frais de transaction bancaire (environ 3%) s'appliquent à tous les plans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
