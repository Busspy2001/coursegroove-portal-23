
import React from "react";
import { motion } from "framer-motion";

export const ValuesHero = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-schoolier-blue/5 to-white dark:from-schoolier-blue/10 dark:to-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos valeurs fondamentales
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Chez Schoolier, notre mission est guidée par des valeurs fortes qui définissent qui nous sommes et comment nous travaillons pour démocratiser l'accès à l'éducation de qualité partout dans le monde.
          </motion.p>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-1 w-24 bg-schoolier-teal rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
