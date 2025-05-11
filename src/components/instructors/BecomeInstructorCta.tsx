
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const BecomeInstructorCta = () => {
  return (
    <section className="py-16 bg-schoolier-blue text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Partagez votre expertise et devenez formateur sur Schoolier
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Rejoignez notre communauté de formateurs passionnés et touchez des milliers d'apprenants à travers le monde. Partagez votre savoir, développez votre notoriété et générez des revenus complémentaires.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-schoolier-teal flex items-center justify-center text-white mt-0.5">✓</div>
                <div>
                  <p className="font-medium">Outils de création intuitifs</p>
                  <p className="text-blue-100">Créez vos cours facilement avec notre plateforme dédiée</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-schoolier-teal flex items-center justify-center text-white mt-0.5">✓</div>
                <div>
                  <p className="font-medium">Support personnalisé</p>
                  <p className="text-blue-100">Bénéficiez d'un accompagnement à chaque étape</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-schoolier-teal flex items-center justify-center text-white mt-0.5">✓</div>
                <div>
                  <p className="font-medium">Revenus attractifs</p>
                  <p className="text-blue-100">Jusqu'à 70% de commission sur chaque vente</p>
                </div>
              </div>
            </div>
            
            <Button asChild size="lg" className="bg-white text-schoolier-blue hover:bg-gray-100">
              <Link to="/teach" className="flex items-center gap-2">
                Commencer à enseigner 
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Devenir formateur" 
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
