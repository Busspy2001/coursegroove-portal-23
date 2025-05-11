
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const InstructorsHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-schoolier-blue/10 to-transparent">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos formateurs experts
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez les meilleurs experts qui partagent leurs connaissances et compétences pour vous aider à atteindre vos objectifs professionnels.
          </motion.p>
          
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  type="search" 
                  placeholder="Rechercher un formateur par nom ou spécialité" 
                  className="pl-10 py-6 rounded-lg border-schoolier-gray/30" 
                />
              </div>
              <Button className="bg-schoolier-blue hover:bg-schoolier-dark-blue py-6 px-6">
                Rechercher
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>Recherches populaires:</span>
            <a href="#" className="hover:text-schoolier-blue transition-colors">Marketing Digital</a>
            <span>•</span>
            <a href="#" className="hover:text-schoolier-blue transition-colors">Développement Web</a>
            <span>•</span>
            <a href="#" className="hover:text-schoolier-blue transition-colors">Finance</a>
            <span>•</span>
            <a href="#" className="hover:text-schoolier-blue transition-colors">UX Design</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
