
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  onRequestDemo: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  tier, 
  price, 
  period, 
  description, 
  features, 
  cta, 
  popular,
  onRequestDemo
}) => {
  return (
    <motion.div 
      className={`rounded-lg border ${popular ? 'border-schoolier-blue scale-105' : 'border-gray-200 dark:border-gray-700'} shadow-lg overflow-hidden relative`}
      variants={fadeIn}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-schoolier-blue text-white px-3 py-1 text-sm font-medium">
          Populaire
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold">{tier}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <ArrowRight className="h-4 w-4 text-schoolier-teal mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full mt-6 ${popular ? 'bg-schoolier-blue hover:bg-schoolier-dark-blue' : ''}`}
          variant={popular ? 'default' : 'outline'}
          onClick={onRequestDemo}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
