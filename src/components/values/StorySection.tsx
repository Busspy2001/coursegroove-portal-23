
import React from "react";
import { motion } from "framer-motion";

export const StorySection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre histoire</h2>
            <div className="h-1 w-16 bg-schoolier-teal mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p>
              Schoolier est né d'une vision simple mais puissante : créer un monde où l'accès à une éducation de qualité n'est pas limité par la géographie, le statut économique ou les circonstances personnelles.
            </p>
            
            <p>
              Notre fondateur, après avoir été frustré par les limitations des plateformes d'apprentissage en ligne existantes, a décidé de créer une solution qui répondrait véritablement aux besoins des apprenants modernes et des éducateurs passionnés.
            </p>
            
            <p>
              Nous avons commencé modestement, avec une petite équipe dédiée partageant une passion pour l'éducation et la technologie. Au fil des années, nous avons écouté attentivement notre communauté, itéré constamment et construit une plateforme qui facilite réellement l'apprentissage et l'enseignement.
            </p>
            
            <p>
              Aujourd'hui, Schoolier est une communauté mondiale dynamique d'apprenants et d'éducateurs qui partagent des connaissances, développent des compétences et créent des opportunités. Notre histoire continue de s'écrire chaque jour, avec chaque nouvel apprenant qui rejoint notre plateforme et chaque instructeur qui partage son expertise.
            </p>
            
            <p>
              Nous sommes fiers de notre croissance, mais nous restons fidèles à notre mission originelle : démocratiser l'accès à l'éducation et permettre à chacun d'atteindre son plein potentiel.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
